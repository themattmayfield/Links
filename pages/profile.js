import Link from "next/link";
import { Card, Typography, Space } from "@supabase/ui";
import { supabase } from "../utils/initSupabase";
import AddCard from "../components/AddCard";
import CardOption from "../components/CardOption";
import Cards from "../components/Cards";
import ModalOverlay from "../components/ui/Modal";
import { useState, useEffect } from "react";
import uuid from "react-uuid";
import _ from "lodash";
import { FiTrash } from "react-icons/fi";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

export default function Profile({ user }) {
  const [adding, setAdding] = useState(false);
  const [layout, setLayout] = useState([{ i: uuid(), x: 0, y: 0, w: 2, h: 1 }]);
  const [jiggleMode, setjiggleMode] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  const jiggleModeHandler = () => {
    setjiggleMode(!jiggleMode);
  };

  const addCardHandler = (size) => {
    const myLayout = [...layout];
    myLayout.push({ i: uuid(), x: 0, y: 0, w: size, h: 1 });
    setLayout(myLayout);
    addingHandler();    
    console.log(layout);
  };

  const removingModalHandler = (id) => {
    setRemoving(!removing);
    setActiveCard(id);
  };

  const removeCardHandler = () => {
    const myLayout = [...layout];
    const index = _.findIndex(myLayout, { i: activeCard });

    if (index !== -1) {
      myLayout.splice(index, 1);
      setLayout(myLayout);
    }
    setRemoving(false);
  };

  const addingHandler = () => {
    setAdding(!adding);
  };

  const handleClickAway = () => {
    jiggleModeHandler()
  };

  const DoNothing = (e) => {
    e.preventDefault()
    console.log('onclick..')
  }

  return (
    <div style={{ maxWidth: "420px", margin: "96px auto" }}>
      <div className="hidden">
        <Card>
          <Space direction="vertical" size={6}>
            <Typography.Text>You're signed in</Typography.Text>
            <Typography.Text strong>Email: {user.email}</Typography.Text>
            <Typography.Text type="success">
              User data retrieved server-side (from Cookie in
              getServerSideProps):
            </Typography.Text>

            <Typography.Text>
              <pre>{JSON.stringify(user, null, 2)}</pre>
            </Typography.Text>

            <Typography.Text>
              <Link href="/">
                <a>Static example with useSWR</a>
              </Link>
            </Typography.Text>
          </Space>
        </Card>
      </div>

      <ModalOverlay
        visible={removing}
        title="You are about to delete a card"
        description="If you delete this card, you will not be able to resore it. Are you sure you want to delete?"
      >
        <div class="flex w-full justify-between items-center space-x-2">
          <button
            className="w-1/2 py-1.5 rounded focus:outline-none bg-black bg-opacity-50 text-white"
            onClick={() => setRemoving(false)}
          >
            Cancel
          </button>
          <button
            className="w-1/2 py-1.5 rounded focus:outline-none bg-red-600 text-white flex items-center justify-center"
            onClick={removeCardHandler}
          >
            <FiTrash className="w-4 h-4 mr-1.5" /> Delete
          </button>
        </div>
      </ModalOverlay>

      <ClickAwayListener onClickAway={jiggleMode ? handleClickAway : DoNothing}>
         <div>
         <Cards
        jiggleMode={jiggleMode}
        jiggleModeHandler={jiggleModeHandler}
        removingModalHandler={removingModalHandler}
        layout={layout}
      />

      <div className="px-2">
        {adding ? (
          <CardOption addingHandler={addingHandler} click={addCardHandler} />
        ) : (
          <div onClick={() => setAdding(true)}>
            <AddCard />
          </div>
        )}
      </div>
         </div>
    </ClickAwayListener>
    
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: "/", permanent: false } };
  }

  // If there is a user, return it.
  return { props: { user } };
}
