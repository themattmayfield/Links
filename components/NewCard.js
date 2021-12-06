import React, { useState, useEffect } from "react";
import useLongPress from "../utils/Hooks/useLongPress";
import { useCard } from "@/utils/Theme/cardContext";
import { useJiggle } from "@/utils/Hooks/jiggleModeContext";
import Image from "next/image";

import _ from "lodash";
export default function NewCard({ card, preview }) {
  const { editModeHandler, cardMedia } = useCard();
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
  if (!preview)
    return (
      <>
        <div
          onClick={() => {
            !jiggleMode && editModeHandler(card);
          }}
          className="relative w-full h-full rounded-xl cursor-pointer"
        >
          {!_.isEmpty(thisCard?.image) && !loading ? (
            <button
              {...longPressEvent}
              style={{
                backgroundColor:
                  thisCard?.backgroundColor || "rgba(156, 163, 175)",
                // backgroundImage: `url(${thisCard?.image})`,
              }}
              className={`
                w-full cursor-pointer h-full rounded-xl flex flex-col items-center justify-center overflow-hidden`}
            >
              {thisCard?.image && (
                <div
                  style={{
                    width: thisCard.size == 1 ? "195px" : "400px",
                    height: "170px",
                  }}
                  className="relative m-0 p-0 rounded-xl"
                >
                  <div
                    className="rounded-xl"
                    style={{
                      width: `${
                        (thisCard.size == 1 ? 195 : 400) *
                        (thisCard?.pinchPanZoom?.scale || 1)
                      }px`,
                      height: `${170 * (thisCard?.pinchPanZoom?.scale || 1)}px`,
                      display: "flex",
                      justifyContent: "center",

                      transform: `translate3d(${
                        thisCard?.pinchPanZoom?.positionX
                          ? `${thisCard?.pinchPanZoom?.positionX}px`
                          : "0px"
                      }, ${
                        thisCard?.pinchPanZoom?.positionY
                          ? `${thisCard?.pinchPanZoom?.positionY}px`
                          : "0px"
                      }, 0px)                     
                    `,

                      margin: 0,
                      padding: 0,
                      transformOrigin: "0% 0%",
                    }}
                  >
                    <Image
                      onLoad={() => console.log("loaded", card.i)}
                      className="object-center "
                      alt="Mountains"
                      src={thisCard?.image}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </div>
              )}
            </button>
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

  // FOR PREVIEW
  return (
    <>
      <div style={{ cursor: "pointer" }} className="relative w-full h-full">
        {!_.isEmpty(thisCard?.image) && !loading ? (
          <button
            style={{
              backgroundColor:
                thisCard?.backgroundColor || "rgba(156, 163, 175)",
            }}
            className={`
                w-full cursor-pointer h-full rounded-xl flex flex-col items-center justify-center overflow-hidden`}
          >
            {thisCard?.image && (
              <div
                style={{
                  position: "relative",
                  width: thisCard.size == 1 ? "195px" : "400px",
                  height: "170px",

                  margin: 0,
                  padding: 0,
                }}
              >
                <div
                  style={{
                    width: `${
                      (thisCard.size == 1 ? 195 : 400) *
                      (thisCard?.pinchPanZoom?.scale || 1)
                    }px`,
                    height: `${170 * (thisCard?.pinchPanZoom?.scale || 1)}px`,
                    display: "flex",
                    justifyContent: "center",

                    transform: `translate3d(${
                      thisCard?.pinchPanZoom?.positionX
                        ? `${thisCard?.pinchPanZoom?.positionX}px`
                        : "0px"
                    }, ${
                      thisCard?.pinchPanZoom?.positionY
                        ? `${thisCard?.pinchPanZoom?.positionY}px`
                        : "0px"
                    }, 0px)                     
                    `,

                    margin: 0,
                    padding: 0,
                    transformOrigin: "0% 0%",
                  }}
                >
                  <Image
                    onLoad={() => console.log("loaded", card.i)}
                    className="object-center"
                    alt="Mountains"
                    src={thisCard?.image}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
            )}
          </button>
        ) : (
          <button
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
