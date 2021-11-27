// import { useState, useEffect } from "react";
import { useCard } from "@/utils/cardContext";
import { useJiggle } from "@/utils/jiggleModeContext";
import { useOnClickOutside } from "@/utils/hooks";
import Cards from "@/components/Cards";
function Theme0() {
  const { jiggleRef, setjiggleMode } = useJiggle();
  const { cardMode } = useCard();

  useOnClickOutside(jiggleRef, () => {
    !cardMode && setjiggleMode(false);
  });

  return (
    <div ref={jiggleRef} className="mx-auto " style={{ maxWidth: "420px" }}>
      <Cards />
    </div>
  );
}

export default Theme0;
