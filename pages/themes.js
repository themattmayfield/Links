// import { useState, useEffect } from "react";
import { useAuth } from "@/utils/auth";
import Loading from "@/components/Loading";
import Layout from "@/components/Layout";
import { PageContainer } from "@/components/pageUtils";
import _ from "lodash";

export default function Home() {
  const { loading, user, authUser } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <PageContainer>
        <div className="flex flex-wrap w-full gap-2">
          {/* <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-6"> */}
          {[...Array(20).keys()].map((theme, themeIndex) => (
            <Theme key={themeIndex} />
          ))}
        </div>
      </PageContainer>
    </Layout>
  );
}

const Theme = () => (
  <div className="bg-gray-300 rounded-lg w-64 xxs:w-36 sm:w-40 h-96 xxs:h-52 mx-auto" />
);
