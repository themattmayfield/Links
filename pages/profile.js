import Link from "next/link";
import { Card, Typography, Space } from "@supabase/ui";
import { supabase } from "../utils/initSupabase";
import Cards from "../components/Cards";
import { useState } from "react";
import _ from "lodash";



import ClickAwayListener from '@material-ui/core/ClickAwayListener';

export default function Profile({ user }) {
  const [adding, setAdding] = useState(false);
  const [jiggleMode, setjiggleMode] = useState(false);
  
  

  
  


  

  
  return (
    <>    
    
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

      <ClickAwayListener onClickAway={jiggleMode ? () => setjiggleMode(false) : () => {}}>
         <div>
         <Cards
         addingHandler={setAdding}        
         adding={adding}
        jiggleMode={jiggleMode}
        jiggleModeHandler={setjiggleMode}
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
