import React, { useState } from "react";
import useLongPress from "../utils/scripts/useLongPress";
import { MdRemoveCircle } from "react-icons/md";

export default function NewCard(props) {
  const [longPressCount, setlongPressCount] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  const onLongPress = () => {
    if (!props.jiggleMode) {
      // console.log("longpress is triggered");
      setlongPressCount(longPressCount + 1);
      props.jiggleModeHandler(true);
    }
  };

  const onClick = () => {
    // console.log("click is triggered");
    // setClickCount(clickCount + 1);
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

  return (
    <>
      <div 
      onClick={!props.isShaking ? () => props.editModeHandler(props.item) : () => {}}
      className="relative w-full h-full">
        {props.isShaking && (
          <>
            <div className="absolute w-4 h-4 bg-black rounded-full -left-1 -top-1"></div>
            <MdRemoveCircle
              onClick={() => props.removingModalHandler(props.itemID)}
              className="absolute w-7 h-7 text-gray-500 -left-2 -top-3 cursor-pointer"
            />
          </>
        )}
        <div
          {...longPressEvent}
          style={{"backgroundColor": props.backgroundColor}}
          className={
            "w-full h-full rounded-xl flex flex-col items-center justify-center "
          }
        ></div>
      </div>
    </>
  );
}
