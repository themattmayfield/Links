import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { FiTrash } from "react-icons/fi";

const useStyles = makeStyles({
    root: {
      width: 200,
    },
  });


export default function SideTray(props) {

    const classes = useStyles();
  const [height, setHeight] = useState(30);
  const [opacity, setOpacity] = useState(30);

  const heightHandler = (event, newValue) => {
    setHeight(newValue);
  };

  const opacityHandler = (event, newValue) => {
    setOpacity(newValue);
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
          props.setSideTray(false);
        }}
      >

          <div className="w-full h-32 mb-8 bg-gray-400 rounded-xl flex flex-col items-center justify-center">

          </div>
        <div className="flex items-center justify-between mb-10">
            <div className="w-16 h-16 md:w-32 md:h-32 border border-dashed border-gray-300 bg-gray-200"></div>
            <div className="w-16 h-16 md:w-32 md:h-32 border border-dashed border-gray-300 bg-gray-200"></div>
            <div className="w-16 h-16 md:w-32 md:h-32 border border-dashed border-gray-300 bg-gray-200"></div>
        </div>
        <div >
      <Typography id="continuous-slider" gutterBottom>
        {/* Volume */}
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
          Height
        </Grid>
        <Grid item xs>
          <Slider value={height} onChange={heightHandler} aria-labelledby="continuous-slider" />
        </Grid>
        <Grid item>
          {/* Opacity */}
        </Grid>
      </Grid>      
      <Grid container spacing={2}>
        <Grid item>
        Opacity
        </Grid>
        <Grid item xs>
          <Slider value={opacity} onChange={opacityHandler} aria-labelledby="continuous-slider" />
        </Grid>
        <Grid item>
          {/* Opacity */}
        </Grid>
      </Grid>    
    </div>

    <div className="flex w-full justify-between items-center space-x-2">
          <button
            className="w-1/2 py-1.5 rounded focus:outline-none bg-black bg-opacity-50 text-white"
            
          >
            Duplicate
          </button>
          <button
            className="w-1/2 py-1.5 rounded focus:outline-none bg-red-600 text-white flex items-center justify-center"
            
          >
            <FiTrash className="w-4 h-4 mr-1.5" /> Delete
          </button>
        </div>
      </SlidingPane>
      </>
    )
  }
