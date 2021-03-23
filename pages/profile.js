import Link from "next/link";
import { Card, Typography, Space } from "@supabase/ui";
import { supabase } from "../utils/initSupabase";
import Cards from "../components/Cards";
import { useState } from "react";
import uuid from "react-uuid";
import _ from "lodash";
import SideTray from '../components/SideTray'


import ClickAwayListener from '@material-ui/core/ClickAwayListener';

export default function Profile({ user }) {
  const [adding, setAdding] = useState(false);
  const [jiggleMode, setjiggleMode] = useState(false);
  const [editing, setEditing] = useState(false);
  const [sideTrayOpened, setSideTray] = useState(false);

  const jiggleModeHandler = () => {
    setjiggleMode(!jiggleMode);
  }; 

  const editModeHandler = (id) => {
    setSideTray(true)
    // alert(id)
    setEditing(!editing)
  };

  const addingHandler = (value) => {
    setAdding(value);
  };

  const handleClickAway = () => {
    jiggleModeHandler()
  };

  const DoNothing = (e) => {
    e.preventDefault()
    console.log('onclick..')
  }

  return (
    <>    
    <SideTray setSideTray={setSideTray} sideTrayOpened={sideTrayOpened} />
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

      <ClickAwayListener onClickAway={jiggleMode ? handleClickAway : DoNothing}>
         <div>
         <Cards
         addingHandler={addingHandler}        
         adding={adding}
        jiggleMode={jiggleMode}
        jiggleModeHandler={jiggleModeHandler}
        editModeHandler={editModeHandler}
      />
      
         </div>
    </ClickAwayListener>
    
    </div>
    </>
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
