import React, { useState, useEffect } from "react";
import useLongPress from "../utils/Hooks/useLongPress";
import { MdRemoveCircle } from "react-icons/md";
import { useCard } from "@/utils/Theme/cardContext";
import { useJiggle } from "@/utils/Hooks/jiggleModeContext";
import Image from "next/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import _ from "lodash";
export default function NewCard({ card }) {
  const { removingModalHandler, editModeHandler, cardMedia } = useCard();
  const { jiggleMode, setjiggleMode } = useJiggle();

  const [longPressCount, setlongPressCount] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [thisCard, setThisCard] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const test = async () => {
      setLoading(true);
      setThisCard(cardMedia[card?.i]);
    };
    test().then(() => {
      setLoading(false);
    });
  }, [cardMedia]);

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
        {!_.isEmpty(thisCard?.image) && !loading ? (
          <TransformWrapper
            minScale={0.1}
            centerZoomedOut={true}
            initialScale={thisCard?.pinchPanZoom?.scale}
            initialPositionX={thisCard?.pinchPanZoom?.positionX}
            initialPositionY={thisCard?.pinchPanZoom?.positionY}
            disabled
          >
            <>
              <button
                {...longPressEvent}
                style={{
                  backgroundColor:
                    thisCard?.backgroundColor || "rgba(156, 163, 175)",
                }}
                className={`rounded-xl mx-auto w-full h-full`}
              >
                <TransformComponent wrapperClass="rounded-xl">
                  <div
                    style={{
                      backgroundImage: `url(${thisCard?.image})`,
                    }}
                    className={`
                      rounded-xl bg-contain bg-center bg-no-repeat relative`}
                  ></div>
                </TransformComponent>
              </button>
            </>
          </TransformWrapper>
        ) : (
          <button
            {...longPressEvent}
            style={{
              backgroundColor:
                thisCard?.backgroundColor || "rgba(156, 163, 175)",
            }}
            className={
              "w-full cursor-pointer h-full rounded-xl flex flex-col items-center justify-center bg-cover bg-center"
            }
          ></button>
        )}
      </div>
    </>
  );
}

// import React, { useState, useEffect } from "react";
// import useLongPress from "../utils/Hooks/useLongPress";
// import { MdRemoveCircle } from "react-icons/md";
// import { useCard } from "@/utils/Theme/cardContext";
// import { useJiggle } from "@/utils/Hooks/jiggleModeContext";
// import Image from "next/image";
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// import _ from "lodash";
// export default function NewCard({ card }) {
//   const { removingModalHandler, editModeHandler, cardMedia } = useCard();
//   const { jiggleMode, setjiggleMode } = useJiggle();

//   const [longPressCount, setlongPressCount] = useState(0);
//   const [clickCount, setClickCount] = useState(0);
//   const [thisCard, setThisCard] = useState({});
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const test = async () => {
//       setLoading(true);
//       setThisCard(cardMedia[card?.i]);
//     };
//     test().then(() => {
//       setLoading(false);
//     });
//   }, [cardMedia]);

//   const onLongPress = () => {
//     if (!jiggleMode) {
//       // console.log("longpress is triggered");
//       setlongPressCount(longPressCount + 1);
//       setjiggleMode(true);
//     }
//   };

//   const onClick = () => {
//     // setClickCount(clickCount + 1);
//   };

//   const defaultOptions = {
//     shouldPreventDefault: false,
//     delay: 500,
//   };

//   const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

//   return (
//     <>
//       <div
//         onClick={() => {
//           !jiggleMode && editModeHandler(card);
//         }}
//         style={{ cursor: "pointer" }}
//         className="relative w-full h-full"
//       >
//         {jiggleMode && (
//           <>
//             <div className="absolute w-4 h-4 bg-black rounded-full -left-1 -top-1"></div>
//             <MdRemoveCircle
//               onClick={() => removingModalHandler(card)}
//               className="absolute w-7 h-7 text-gray-500 -left-2 -top-3 cursor-pointer"
//             />
//           </>
//         )}
//         {!_.isEmpty(thisCard?.image) && !loading ? (
//           <button
//             {...longPressEvent}
//             style={{
//               backgroundColor:
//                 thisCard?.backgroundColor || "rgba(156, 163, 175)",
//               // backgroundImage: `url(${thisCard?.image})`,
//             }}
//             className={`${
//               thisCard.size == 1 ? "w-[195px] " : "w-full sm:w-[400px]"
//             }
//                 w-full cursor-pointer h-full rounded-xl flex flex-col items-center justify-center `}
//           >
//             {thisCard?.image && (
//               <TransformWrapper
//                 minScale={0.1}
//                 centerZoomedOut={true}
//                 initialScale={thisCard?.pinchPanZoom?.scale}
//                 initialPositionX={thisCard?.pinchPanZoom?.positionX}
//                 initialPositionY={thisCard?.pinchPanZoom?.positionY}
//                 disabled
//               >
//                 <>
//                   <button
//                     {...longPressEvent}
//                     style={{
//                       backgroundColor:
//                         thisCard?.backgroundColor || "rgba(156, 163, 175)",
//                     }}
//                     className={`${
//                       thisCard.size == 1 ? "w-[195px] " : "w-full sm:w-[400px]"
//                     } rounded-xl mx-auto`}
//                   >
//                     <TransformComponent wrapperClass="rounded-xl">
//                       {thisCard?.image && (
//                         <div
//                           style={{
//                             backgroundImage: `url(${thisCard?.image})`,
//                           }}
//                           className={`
//                       ${
//                         thisCard?.size == 1
//                           ? "w-[195px] "
//                           : "w-full sm:w-[400px]"
//                       }
//                     h-[170px] rounded-xl bg-contain bg-center bg-no-repeat relative`}
//                         ></div>
//                       )}
//                     </TransformComponent>
//                   </button>
//                 </>
//               </TransformWrapper>
//               // <img
//               //   style={
//               //     {
//               //       // transform: `translate3d(thisCard?.pinchPanZoom?.positionX, thisCard?.pinchPanZoom?.positionY, 0px) scale(thisCard?.pinchPanZoom?.scale)`,
//               //       // transformOrigin: "0% 0%",
//               //       // "--tw-scale-x": thisCard?.pinchPanZoom?.scale
//               //       //   ? thisCard?.pinchPanZoom?.scale
//               //       //   : 1,
//               //       // "--tw-scale-y": thisCard?.pinchPanZoom?.scale,
//               //       // transform: var(--tw-transform)
//               //       // transform: `scale(${thisCard?.pinchPanZoom?.scale},${thisCard?.pinchPanZoom?.scale})`,
//               //     }
//               //   }
//               //   onLoad={() => console.log("loaded", card.i)}
//               //   className=" w-full h-full object-cover object-center transform scale-y-[0.8]s"
//               //   src={thisCard?.image}
//               // />
//               // <Image
//               //   style={{
//               //     transform: `translate3d(thisCard?.pinchPanZoom?.positionX, thisCard?.pinchPanZoom?.positionY, 0px) scale(thisCard?.pinchPanZoom?.scale || 1)`,
//               //   }}
//               //   onLoad={() => console.log("loaded", card.i)}
//               //   className="rounded-xl scale-50ss object-contain object-center transform"
//               //   alt="Mountains"
//               //   src={thisCard?.image}
//               //   layout="fill"
//               //   objectFit="cover"
//               // />
//             )}
//           </button>
//         ) : (
//           <button
//             {...longPressEvent}
//             style={{
//               backgroundColor:
//                 thisCard?.backgroundColor || "rgba(156, 163, 175)",
//             }}
//             className={
//               "w-full cursor-pointer h-full rounded-xl flex flex-col items-center justify-center bg-cover bg-center"
//             }
//           ></button>
//         )}
//       </div>
//     </>
//   );
// }
