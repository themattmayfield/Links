// import { useState, useEffect } from "react";
import { useAuth } from "@/utils/auth";
import Loading from "@/components/Loading";
import LinksLoading from "@/components/LinksLoading";
import Layout from "@/components/Layout";
import { PageContainer } from "@/components/pageUtils";
import Cards from "../components/Cards";
import _ from "lodash";
import { useOnClickOutside } from "@/utils/hooks";
import { useJiggle } from "@/utils/jiggleModeContext";
import { useCard } from "@/utils/cardContext";
import { db } from "@/utils/firebase";
import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  deleteField,
  collection,
  addDoc,
} from "firebase/firestore";
export default function Home() {
  const { jiggleRef, setjiggleMode } = useJiggle();
  const { cardMode, layouts } = useCard();
  const { authUser } = useAuth();

  useOnClickOutside(jiggleRef, () => {
    !cardMode && setjiggleMode(false);
  });

  const runTest = async () => {
    const docRef = doc(db, "users", authUser?.uid);
    await setDoc(docRef, { theme1: { hi: "hi" } }, { merge: true });
  };

  if (!layouts) {
    return (
      <Layout>
        <PageContainer>
          <LinksLoading />
        </PageContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageContainer>
        <button onClick={() => runTest()}>Test adding collection</button>
        <div ref={jiggleRef} className="mx-auto " style={{ maxWidth: "420px" }}>
          <Cards />
        </div>
      </PageContainer>
    </Layout>
  );
}
