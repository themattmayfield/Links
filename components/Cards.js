import { Responsive, WidthProvider } from "react-grid-layout";
import NewCard from "./NewCard";
import styled, { keyframes, css } from "styled-components";
import { useState, useEffect } from "react";
import CardOption from "../components/CardOption";
import AddCard from "../components/AddCard";
import uuid from "react-uuid";
import ModalOverlay from "../components/ui/Modal";
import { FiTrash } from "react-icons/fi";
import _ from "lodash";
import SideTray from '../components/SideTray'

const rotate = keyframes`
0% {
  transform: rotate(-1deg);
  animation-timing-function: ease-in;
}

50% {
  transform: rotate(1.5deg);
  animation-timing-function: ease-out;
}
`;

const BouncyDiv = styled.div`
  animation: ${(props) =>
    props.isShaking
      ? css`
          ${rotate} 2s linear infinite
        `
      : ""};
  //   animation: ${rotate} 2s linear infinite;
  animation-iteration-count: infinite;
  transform-origin: 50% 10%;

  animation-delay: -0.5s;
  animation-duration: 0.3s;
`;

const ResponsiveGridLayout = WidthProvider(Responsive);

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value,
      })
    );
  }
}

export default function Cards(props) {
  const addCardHandler = (size) => {
    const lg = [...layouts.lg];
    const xxs = [...layouts.xxs];

    lg.push({ i: uuid(), x: 0, y: lg.length, w: size, h: 1 });
    xxs.push({ i: uuid(), x: 0, y: xxs.length, w: size, h: 1 });

    setLayouts({
      lg,
      xxs,
    });
    props.addingHandler(false);
    console.log(layouts);
  };

  const removingModalHandler = (id) => {
    setRemoving(!removing);
    setActiveCard(id);
  };

  const cardSaveHandler = (card) => {

    const lg = [...layouts.lg];
    const xxs = [...layouts.xxs];

    const lgIndex = _.findIndex(lg, {'i': card.i})
    const xxsIndex = _.findIndex(xxs, {'i': card.i})

    lg[lgIndex] = card
    xxs[xxsIndex] = card

    setLayouts({
      lg,
      xxs,
    });
    
    
  }
  
  const editModeHandler = (item) => {
    setActiveCardEdit(item)    
    setSideTray(true)    
    setEditing(!editing)
  };

  const removeCardHandler = () => {
    const lg = [...layouts.lg];
    const xxs = [...layouts.xxs];

    const indexLG = _.findIndex(lg, { i: activeCard });
    const indexXXS = _.findIndex(xxs, { i: activeCard });

    indexLG !== -1 ? lg.splice(indexLG, 1) : "";

    indexXXS !== -1 ? xxs.splice(indexXXS, 1) : "";

    setLayouts({
      lg,
      xxs,
    });
    setRemoving(false);
  };

  const myLayout = getFromLS("layouts") || {
    lg: [{ i: uuid(), x: 0, y: 0, w: 2, h: 1 }],
    xxs: [{ i: uuid(), x: 0, y: 0, w: 2, h: 1 }],
  };

  const [layouts, setLayouts] = useState(myLayout);
  const [activeCard, setActiveCard] = useState(null);
  const [removing, setRemoving] = useState(false);
  const [sideTrayOpened, setSideTray] = useState(false);
  const [activeCardEdit, setActiveCardEdit]= useState({});
  const [editing, setEditing] = useState(false);
  
  
  const [getHeight, setHeight] = useState(_.maxBy(layouts.xxs, 'y').y)
  

  const onLayoutChange = (layout, layouts) => {
    saveToLS("layouts", layouts);
    setLayouts(layouts);
    setHeight(_.maxBy(layouts.xxs, 'y').y)
  };


  return (
    <>
      <ModalOverlay
        visible={removing}
        title="You are about to delete a card"
        description="If you delete this card, you will not be able to resore it. Are you sure you want to delete?"
      >
        <div className="flex w-full justify-between items-center space-x-2">
          <button
            className="w-1/2 py-1.5 rounded focus:outline-none bg-black bg-opacity-50 text-white"
            onClick={() => setRemoving(false)}
          >
            Cancel
          </button>
          <button
            className="w-1/2 py-1.5 rounded focus:outline-none bg-red-600 text-white flex items-center justify-center"
            onClick={removeCardHandler}
          >
            <FiTrash className="w-4 h-4 mr-1.5" /> Delete
          </button>
        </div>
      </ModalOverlay>
      <SideTray cardSaveHandler={cardSaveHandler} activeCard={activeCardEdit} setSideTray={setSideTray} sideTrayOpened={sideTrayOpened} />
      <ResponsiveGridLayout
        isDraggable={props.jiggleMode}
        isResizable={false}
        className="layout relative h-full"
        rowHeight={170}
        cols={{ lg: 2, xxs: 2 }}
        layouts={layouts}
        onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
        // style={{minHeight: `calc(170px * ${layouts.xxs.length})`}}
        style={{minHeight: `calc(170px * ${getHeight})`}}
      >
        {layouts.xxs.map((item, i) => (
          <div key={item.i} data-grid={item}>
            <BouncyDiv isShaking={props.jiggleMode} className="w-full h-full">
              <NewCard
              backgroundColor={item.backgroundColor || 'rgba(156, 163, 175)'}
                jiggleMode={props.jiggleMode}
                removingModalHandler={removingModalHandler}
                itemID={item.i}
                item={item}
                isShaking={props.jiggleMode}
                jiggleModeHandler={props.jiggleModeHandler}
                editModeHandler={editModeHandler}
              />
            </BouncyDiv>
          </div>
        ))}
      </ResponsiveGridLayout>

      <div className="px-2">
        {props.adding ? (
          <CardOption
            addingHandler={props.addingHandler}
            click={addCardHandler}
          />
        ) : (
          <div onClick={() => props.addingHandler(true)}>
            <AddCard />
          </div>
        )}
      </div>
    </>
  );
}
