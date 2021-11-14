import { useAuth } from "@/utils/auth";
import Loading from "@/components/Loading";
import Layout from "@/components/Layout";
import { PageContainer } from "@/components/pageUtils";
import Cards from "../components/Cards";
import _ from "lodash";
import { useOnClickOutside } from "@/utils/hooks";
import { useJiggle } from "@/utils/jiggleModeContext";
import { useCard } from "@/utils/cardContext";

export default function Home() {
  const { loading } = useAuth();
  const { jiggleRef, setjiggleMode } = useJiggle();
  const { cardMode } = useCard();

  useOnClickOutside(jiggleRef, () => {
    !cardMode && setjiggleMode(false);
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <PageContainer>
        <div ref={jiggleRef} className="mx-auto " style={{ maxWidth: "420px" }}>
          <Cards />
        </div>
      </PageContainer>
    </Layout>
  );
}
