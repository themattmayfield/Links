// import { useState, useEffect } from "react";
// import { useAuth } from "@/utils/auth";
// import _ from "lodash";
import Layout from "@/components/Layout";
import { PageContainer } from "@/components/pageUtils";

import { useTheme } from "@/utils/Theme/themeContext";

export default function Home() {
  const { activeTheme, ThemeRender } = useTheme();

  const ThemeToRender = ThemeRender[activeTheme?.name || "Theme1"];

  return (
    <Layout>
      <PageContainer>
        <ThemeToRender />
      </PageContainer>
    </Layout>
  );
}
