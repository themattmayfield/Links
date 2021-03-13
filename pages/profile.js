import Link from "next/link";
import { Card, Typography, Space } from "@supabase/ui";
import { supabase } from "../utils/initSupabase";
import AddCard from "../components/AddCard";
import CardOption from "../components/CardOption";
import Cards from "../components/Cards";
import { useState } from "react";
import uuid from "react-uuid";

export default function Profile({ user }) {
  const [adding, setAdding] = useState(false);
  const [layout, setLayout] = useState([{ i: "a", x: 0, y: 0, w: 2, h: 1 }]);

  const addCardHandler = (size) => {
    const myLayout = [...layout]    
    myLayout.push({ i: uuid(), x: 0, y: 0, w: size, h: 1})
    setLayout(myLayout)
    addingHandler()
  };

  const addingHandler = () => {
    setAdding(!adding)
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
      <Cards layout={layout} />
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
