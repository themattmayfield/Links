import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { FiTrash } from "react-icons/fi";
import { BsImage, BsCircleFill } from "react-icons/bs";
import { BiText } from "react-icons/bi"
import { SketchPicker } from 'react-color'

export default function SideTray(props) {
  const [opacity, setOpacity] = useState(30);
  const [card, setCard] = useState({});
  const [mode, setMode] = useState(null);
  const [backgroundColor, setColor] = useState('')

  useEffect(() => {
    // Update the document title using the browser API
    setCard(props.activeCard);
    setColor(props.activeCard.backgroundColor || '')
  }, [props.activeCard]);


  const opacityHandler = (event, newValue) => {
    setOpacity(newValue);
  };

  const setSize = (size) => {
    const newCard = { ...card };
    newCard.w = size;
    setCard(newCard);
  };

  const handleColorChange = (color) => {
    setColor(color.hex);

    const newCard = { ...card };
    newCard.backgroundColor = color.hex;
    setCard(newCard);
  };

  return (
    <>
      <SlidingPane
        className="some-custom-class"
        overlayClassName="some-custom-overlay-class"
        isOpen={props.sideTrayOpened}
        // title="Edit"
        // subtitle="Optional subtitle."
        width="80%"
        onRequestClose={() => {
          // triggered on "<" on left top click or on outside click
          setColor('')
          props.setSideTray(false);
        }}
      >
        <p>{JSON.stringify(card)}</p>
        <p>{backgroundColor}</p>
        <div
        style={{"backgroundColor": backgroundColor || "rgba(156, 163, 175)"}}
          className={`${
            card.w == 1 ? "w-7/12 " : "w-full"
          } h-32 mb-4 rounded-xl flex flex-col items-center justify-center`}
        ></div>

        <div className="flex items-center justify-between w-full space-x-2 mb-6">
          <button
            onClick={() => setSize(1)}
            className={`${
              card.w == 1
                ? "bg-indigo-200 text-gray-600 hover:bg-indigo-300"
                : "bg-transparent text-gray-600 hover:bg-gray-50"
            } w-1/2 py-1.5 rounded focus:outline-none border border-gray-400 transition duration-300 ease-in-out`}
          >
            Half
          </button>
          <button
            onClick={() => setSize(2)}
            className={`${
              card.w == 2
                ? "bg-indigo-200 text-gray-600 hover:bg-indigo-300"
                : "bg-transparent text-gray-600 hover:bg-gray-50"
            } w-1/2 py-1.5 rounded focus:outline-none border border-gray-400 transition duration-300 ease-in-out`}
          >
            Full
          </button>
        </div>

        <div className="flex items-center justify-around mb-10">
          
          <BsImage onClick={() => setMode('image')} className="w-10 h-10 flex items-center justify-center md:w-32 md:h-32 text-gray-700 cursor-pointer" />
          <BsCircleFill style={{"color": backgroundColor || "purple"}} onClick={() => setMode('color')} className="w-10 h-10 flex items-center justify-center md:w-32 md:h-32 cursor-pointer" />
          <BiText onClick={() => setMode('text')} className="w-10 h-10 flex items-center justify-center md:w-32 md:h-32 text-gray-900 cursor-pointer" />
        </div>
        <div>

        {/* {mode == 'image' && <SketchPicker />} */}
        {mode == 'color' && 
        <div className="absolute z-20">
        <div className="fixed top-0 right-0 left-0 bottom-0" onClick={() => setMode(false) }/>
        <SketchPicker color={backgroundColor} onChangeComplete={handleColorChange} />
        </div>
        }
        {/* {mode == 'text' && <SketchPicker />} */}


          <Typography id="continuous-slider" gutterBottom>
            {/* Volume */}
          </Typography>
          <Grid container spacing={2}>
            <Grid item>Opacity</Grid>
            <Grid item xs>
              <Slider
                value={opacity}
                onChange={opacityHandler}
                aria-labelledby="continuous-slider"
              />
            </Grid>
            <Grid item>{/* Opacity */}</Grid>
          </Grid>
        </div>        

        <div className="flex w-full justify-between items-center space-x-2 mb-2">
          <button className="w-1/2 py-1.5 rounded focus:outline-none bg-black bg-opacity-50 text-white">
            Duplicate
          </button>
          <button className="w-1/2 py-1.5 rounded focus:outline-none bg-red-600 text-white flex items-center justify-center">
            <FiTrash className="w-4 h-4 mr-1.5" /> Delete
          </button>
        </div>
        <button
          onClick={() => {
            props.setSideTray(false);
            props.cardSaveHandler(card);
          }}
          className="w-full py-1.5 rounded focus:outline-none bg-indigo-700 text-white"
        >
          Save
        </button>
      </SlidingPane>
    </>
  );
}
