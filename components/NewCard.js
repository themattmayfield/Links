import React, { useState } from "react";
import useLongPress from "../utils/scripts/useLongPress";
import { MdRemoveCircle } from "react-icons/md";
import { useCard } from "@/utils/cardContext";
import { useJiggle } from "@/utils/jiggleModeContext";

export default function NewCard({ card }) {
  const { removingModalHandler, editModeHandler, cardMedia } = useCard();
  const { jiggleMode, setjiggleMode } = useJiggle();

  const [longPressCount, setlongPressCount] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  const onLongPress = () => {
    if (!jiggleMode) {
      // console.log("longpress is triggered");
      setlongPressCount(longPressCount + 1);
      setjiggleMode(true);
    }
  };

  const onClick = () => {
    // setClickCount(clickCount + 1);
  };

  const defaultOptions = {
    shouldPreventDefault: false,
    delay: 500,
  };

  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

  return (
    <>
      <div
        onClick={() => {
          !jiggleMode && editModeHandler(card);
        }}
        style={{ cursor: "pointer" }}
        className="relative w-full h-full"
      >
        {jiggleMode && (
          <>
            <div className="absolute w-4 h-4 bg-black rounded-full -left-1 -top-1"></div>
            <MdRemoveCircle
              onClick={() => removingModalHandler(card)}
              className="absolute w-7 h-7 text-gray-500 -left-2 -top-3 cursor-pointer"
            />
          </>
        )}
        <button
          {...longPressEvent}
          style={{
            backgroundColor:
              cardMedia[card?.i]?.backgroundColor || "rgba(156, 163, 175)",
            backgroundImage: `url(${cardMedia[card?.i]?.image})`,
          }}
          className={
            "w-full cursor-pointer h-full rounded-xl flex flex-col items-center justify-center bg-cover bg-center"
          }
        ></button>
      </div>
    </>
  );
}
