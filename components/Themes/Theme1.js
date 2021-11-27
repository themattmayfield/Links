// import { useState, useEffect } from "react";
import { useCard } from "@/utils/Theme/cardContext";
import { useJiggle } from "@/utils/Hooks/jiggleModeContext";
import useOnClickOutside from "@/utils/Hooks/useOnClickOutside";
import Cards from "@/components/Cards";
import LinksLoading from "@/components/LinksLoading";
import Device from "@/components/Device";
function Theme1() {
  const { jiggleRef, setjiggleMode } = useJiggle();
  const { cardMode, layouts } = useCard();

  useOnClickOutside(jiggleRef, () => {
    !cardMode && setjiggleMode(false);
  });

  if (!layouts) {
    return <LinksLoading />;
  }

  return (
    <>
      <div className="flex items-cener justify-between">
        <div
          ref={jiggleRef}
          className="mx-auto flex-1"
          style={{ maxWidth: "420px" }}
        >
          <Cards />
        </div>
        {/* <Device /> */}
      </div>
      {/* <div ref={jiggleRef} className="mx-auto " style={{ maxWidth: "420px" }}>
    <Cards />
   </div> */}
    </>
  );
}

export default Theme1;
