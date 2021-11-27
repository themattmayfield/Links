// import { useState, useEffect } from "react";
import { useAuth } from "@/utils/auth";
import LinksLoading from "@/components/LinksLoading";
import Layout from "@/components/Layout";
import { PageContainer } from "@/components/pageUtils";
// import _ from "lodash";
import { useOnClickOutside } from "@/utils/hooks";
import { useJiggle } from "@/utils/jiggleModeContext";
import { useCard } from "@/utils/cardContext";
import ThemeRender from "@/components/Themes/ThemeRender";

export default function Home() {
  const { jiggleRef, setjiggleMode } = useJiggle();
  const { cardMode, layouts, activeTheme } = useCard();

  const ThemeToRender = ThemeRender[activeTheme?.name] || "Theme1";
  console.log(activeTheme);
  useOnClickOutside(jiggleRef, () => {
    !cardMode && setjiggleMode(false);
  });

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
        <ThemeToRender />
      </PageContainer>
    </Layout>
  );
}
