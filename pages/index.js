// import { useState, useEffect } from "react";
import { useAuth } from "@/utils/auth";
import LinksLoading from "@/components/LinksLoading";
import Layout from "@/components/Layout";
import { PageContainer } from "@/components/pageUtils";
// import _ from "lodash";
import { useOnClickOutside } from "@/utils/hooks";
import { useJiggle } from "@/utils/jiggleModeContext";
import { useCard } from "@/utils/cardContext";
import { useTheme } from "@/utils/themeContext";

export default function Home() {
  const { jiggleRef, setjiggleMode } = useJiggle();
  const { cardMode, layouts } = useCard();
  const { activeTheme, ThemeRender } = useTheme();

  const ThemeToRender = ThemeRender[activeTheme?.name || "Theme1"];

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
