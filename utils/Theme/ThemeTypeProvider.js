import React from "react";
import { useTheme } from "@/utils/Theme/themeContext";
import { CardProvider } from "@/utils/Theme/cardContext";
import { BasicThemeProvider } from "@/utils/Theme/basicContext";
import { JiggleProvider } from "@/utils/Hooks/jiggleModeContext";

export default function ThemeTypeProvider({ children }) {
  const { activeTheme } = useTheme();

  if (activeTheme?.id === "0")
    return <BasicThemeProvider>{children}</BasicThemeProvider>;
  return (
    <JiggleProvider>
      <CardProvider>{children}</CardProvider>
    </JiggleProvider>
  );
}
