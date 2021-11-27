// import { useState, useEffect } from "react";
import { useCard } from "@/utils/Theme/cardContext";
import { useJiggle } from "@/utils/Hooks/jiggleModeContext";
import useOnClickOutside from "@/utils/Hooks/useOnClickOutside";
import Cards from "@/components/Cards";
import LinksLoading from "@/components/LinksLoading";
import Device from "@/components/Device";
import Image from "next/image";
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
        <Device view={<DevicePreview />} />
      </div>
    </>
  );
}

export default Theme1;

const DevicePreview = () => {
  return (
    <div className="pt-12 flex flex-col items-center">
      <div className="w-24 h-24 rounded-full bg-red-600 relative">
        <Image
          src="/me.png"
          alt="Picture of the author"
          layout="fill"
          objectFit="contain"
          quality={100}
        />
      </div>
      <p className="font-medium pt-2">Nothing Less Than Savage</p>
      <Cards preview />;
    </div>
  );
};
