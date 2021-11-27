// import { useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import NewCard from "./NewCard";
import { BouncyDiv } from "./pageUtils";
import _ from "lodash";
import SideTray from "../components/SideTray";
import { useCard } from "@/utils/Theme/cardContext";
// import { useAuth } from "@/utils/auth";
import RemoveCardModal from "./RemoveCardModal";
import { useJiggle } from "@/utils/Hooks/jiggleModeContext";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Cards() {
  const { addCardHandler, onLayoutChange, layouts, getHeight, cardMode } =
    useCard();

  const { jiggleMode } = useJiggle();

  return (
    <>
      {cardMode === "remove" ? <RemoveCardModal /> : null}

      <SideTray />
      <div className="px-2">
        <button
          onClick={() => addCardHandler()}
          className="bg-trustBlue text-white w-full h-12 rounded focus:outline-none"
        >
          Add Card
        </button>
      </div>

      <ResponsiveGridLayout
        isDraggable={jiggleMode}
        isResizable={false}
        className="layout relative h-full"
        rowHeight={170}
        cols={{ lg: 2, xxs: 2 }}
        layouts={layouts}
        onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
        // style={{minHeight: `calc(170px * ${layouts.xxs.length})`}}
        style={{ minHeight: `calc(170px * ${getHeight})` }}
      >
        {layouts?.xxs?.map((card, i) => (
          <div key={card.i} data-grid={card}>
            <BouncyDiv isShaking={jiggleMode} className="w-full h-full">
              <NewCard card={card} />
            </BouncyDiv>
          </div>
        ))}
      </ResponsiveGridLayout>
    </>
  );
}
