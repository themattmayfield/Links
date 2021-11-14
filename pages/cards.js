import { useState, useRef } from "react";
import { useAuth } from "@/utils/auth";
import Loading from "@/components/Loading";
import Layout from "@/components/Layout";
import { PageContainer } from "@/components/pageUtils";
import Cards from "../components/Cards";
import _ from "lodash";
import { useOnClickOutside } from "@/utils/hooks";

export default function Cardss() {
  const { user, loading, authUser, signout } = useAuth();
  const ref = useRef();

  const [adding, setAdding] = useState(false);
  const [jiggleMode, setjiggleMode] = useState(false);

  useOnClickOutside(ref, () => {
    // console.log("works");
    setjiggleMode(false);
    // jiggleMode ? () => setjiggleMode(false) : null;
  });
  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <PageContainer>
        {user?.email}
        {authUser?.email}
        <button onClick={() => signout()}>signout</button>
        <div ref={ref} style={{ maxWidth: "420px", margin: "96px auto" }}>
          <Cards
            addingHandler={setAdding}
            adding={adding}
            jiggleMode={jiggleMode}
            jiggleModeHandler={setjiggleMode}
          />
        </div>
      </PageContainer>
    </Layout>
  );
}
