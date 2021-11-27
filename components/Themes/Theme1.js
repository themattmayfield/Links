// import { useState, useEffect } from "react";
import { useCard } from "@/utils/Theme/cardContext";
import { useJiggle } from "@/utils/Hooks/jiggleModeContext";
import useOnClickOutside from "@/utils/Hooks/useOnClickOutside";
import Cards from "@/components/Cards";
import LinksLoading from "@/components/LinksLoading";

function Theme0() {
  const { jiggleRef, setjiggleMode } = useJiggle();
  const { cardMode, layouts } = useCard();

  useOnClickOutside(jiggleRef, () => {
    !cardMode && setjiggleMode(false);
  });

  if (!layouts) {
    return <LinksLoading />;
  }

  return (
    <div ref={jiggleRef} className="mx-auto " style={{ maxWidth: "420px" }}>
      <Cards />
    </div>
  );
}

export default Theme0;
