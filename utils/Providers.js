import React from "react";
import { useTheme } from "@/utils/themeContext";
import { CardProvider } from "@/utils/cardContext";
import { JiggleProvider } from "@/utils/jiggleModeContext";

export default function Providers({ children }) {
  const { activeTheme } = useTheme();
  console.log(activeTheme);
  if (activeTheme?.id === "1")
    return (
      <JiggleProvider>
        <CardProvider>{children}</CardProvider>
      </JiggleProvider>
    );
  return (
    <JiggleProvider>
      <CardProvider>{children}</CardProvider>
    </JiggleProvider>
  );
}
