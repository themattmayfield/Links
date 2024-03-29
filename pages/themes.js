// import { useState, useEffect } from "react";
import { useAuth } from "@/utils/auth";
import { useTheme } from "@/utils/Theme/themeContext";
import Loading from "@/components/Loading";
import Layout from "@/components/Layout";
import { PageContainer, Toast } from "@/components/pageUtils";
import _ from "lodash";
import { themes } from "@/utils/Theme/themes";
export default function Home() {
  const { loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <PageContainer>
        <div className="flex flex-wrap w-full gap-2">
          {[...themes].map((theme, themeIndex) => (
            // <button
            //   key={themeIndex}
            //   onClick={() => {
            //     changeTheme(theme.id);
            //     Toast(
            //       "success",
            //       <p>
            //         Theme switched to{" "}
            //         <span className="font-bold">{theme.displayName}</span>
            //       </p>
            //     );
            //   }}
            //   className={`${
            //     activeTheme == theme.id ? "bg-trustBlue" : "bg-gray-300"
            //   }  rounded-lg w-64 xxs:w-36 sm:w-40 h-96 xxs:h-52 mx-auto focus:ring-2 focus:ring-blue-600 cursor-pointer`}
            // />
            <Theme
              key={themeIndex}
              theme={theme}
              // activeTheme={activeTheme}
              // changeTheme={changeTheme}
            />
          ))}
        </div>
      </PageContainer>
    </Layout>
  );
}

const Theme = ({ theme }) => {
  const { activeTheme, changeTheme } = useTheme();
  return (
    <button
      onClick={() => {
        changeTheme(theme);
        Toast(
          "success",
          <p>
            Theme switched to{" "}
            <span className="font-bold">{theme.displayName}</span>
          </p>
        );
      }}
      className={`${
        activeTheme?.id === theme.id ? "bg-trustBlue" : "bg-gray-300"
      }  rounded-lg w-64 xxs:w-36 sm:w-40 h-96 xxs:h-52 mx-auto focus:ring-2 focus:ring-blue-600 cursor-pointer`}
    />
  );
};
