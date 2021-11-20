import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { FiTrash } from "react-icons/fi";
import { BsImage, BsCircleFill } from "react-icons/bs";
import { BiText } from "react-icons/bi";
import { SketchPicker } from "react-color";
import { useCard } from "@/utils/cardContext";
import { useAuth } from "@/utils/auth";
import RemoveCardModal from "./RemoveCardModal";
import { storage } from "@/utils/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Compressor from "compressorjs";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function SideTray() {
  const {
    activeCard,
    setActiveCard,
    cardMode,
    setCardMode,
    editModeHandler,
    cardSaveHandler,
    removeCardHandler,
    removingModalHandler,
    cardMedia,
    updateMedia,
  } = useCard();
  const { authUser } = useAuth();

  const inputEl = useRef(null);

  const [opacity, setOpacity] = useState(30);
  const [mode, setMode] = useState(null);

  const [mediaState, setMediaState] = useState({});
  const [file, setFile] = useState(null);
  const opacityHandler = (event, newValue) => {
    setOpacity(newValue);
  };

  const setSize = (size) => {
    const newCard = { ...activeCard };
    newCard.w = size;
    setActiveCard(newCard);
  };

  const handleColorChange = (color) => {
    setMediaState((prevState) => ({
      ...prevState,
      backgroundColor: color.hex,
    }));
  };

  const handleChange = (e) => {
    const image = e.currentTarget.files[0];

    new Compressor(image, {
      quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
      success: (compressedImage) => {
        setFile(compressedImage);
        const obj = URL.createObjectURL(compressedImage);
        setMediaState((prevState) => ({
          ...prevState,
          image: obj,
        }));
      },
    });
  };

  const handleSave = () => {
    cardSaveHandler();

    if (file) {
      handleUpload();
    } else {
      !_.isEmpty(mediaState) && updateMedia(mediaState);
      setMediaState({});
      setCardMode(null);
    }
  };

  const handleUpload = async (e) => {
    e?.preventDefault();

    const storageRef = ref(storage, `/${authUser?.uid}/${activeCard?.i}`);
    // const storageRef = ref(storage, `/${authUser?.uid}/${authUser?.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log("File available at", url);
          setFile(null);
          const mediaStateSpread = {
            ...mediaState,
            image: url,
          };

          updateMedia(mediaStateSpread);
          setMediaState({});
          setCardMode(null);
        });
      }
    );
  };

  return (
    <>
      <RemoveCardModal removeCardHandler={removeCardHandler} />
      <SlidingPane
        // hideHeader
        className="some-custom-class max-w-lg "
        overlayClassName="some-custom-overlay-class"
        isOpen={cardMode === "edit"}
        width="80%"
        onRequestClose={() => {
          setMediaState({});
          editModeHandler();
        }}
      >
        <div className="flex items-center justify-around pb-4 mb-4 border-b border-gray-300">
          <label>
            <input
              className="hidden"
              type="file"
              onChange={(e) => {
                handleChange(e);
                setMode("image");
              }}
            />
            <BsImage
              // onClick={() => setMode("image")}
              className="w-10 h-10 flex items-center justify-center text-gray-700 cursor-pointer"
            />
          </label>

          <BsCircleFill
            style={{ color: activeCard?.backgroundColor || "purple" }}
            onClick={() => setMode("color")}
            className="w-10 h-10 flex items-center justify-center cursor-pointer"
          />
          <BiText
            onClick={() => setMode("text")}
            className="w-10 h-10 flex items-center justify-center text-gray-900 cursor-pointer"
          />
        </div>

        <TransformWrapper
          doubleClick={{ disabled: true }}
          wheel={{ step: "0.97" }}
          minScale={0.1}
          centerZoomedOut={true}
          ref={inputEl}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <div className="pb-4 space-x-2">
                <button
                  className="bg-gray-400 h-8 px-2  rounded text-gray-900"
                  onClick={() => {
                    zoomIn();
                    console.log(inputEl);
                  }}
                >
                  <p>Zoom In +</p>
                </button>
                <button
                  className="bg-gray-400 h-8 px-2  rounded text-gray-900"
                  onClick={() => {
                    zoomOut();
                    console.log(inputEl);
                  }}
                >
                  <p>Zoom Out -</p>
                </button>
                <button
                  className="bg-gray-400 h-8 px-2  rounded text-gray-900"
                  onClick={() => {
                    resetTransform();
                    console.log(inputEl);
                  }}
                >
                  <p>Reset x</p>
                </button>
              </div>
              <div
                style={{
                  backgroundColor:
                    mediaState?.backgroundColor ||
                    cardMedia[activeCard?.i]?.backgroundColor ||
                    "rgba(156, 163, 175)",
                }}
                className={`${
                  activeCard?.w == 1 ? "w-[195px] " : "w-full sm:w-[400px]"
                } rounded-xl`}
              >
                <TransformComponent
                  wrapperStyle={{
                    width: "100%",
                    height: "170px",
                  }}
                >
                  <div
                    style={{
                      backgroundImage: `url(${
                        mediaState?.image ||
                        cardMedia[activeCard?.i]?.image ||
                        null
                      })`,
                    }}
                    className={`
                    ${activeCard?.w == 1 ? "w-[195px] " : "w-full sm:w-[400px]"}
                  h-[170px] rounded-xl bg-contain bg-center bg-no-repeat relative`}
                  ></div>
                </TransformComponent>
              </div>
            </>
          )}
        </TransformWrapper>

        <button
          onClick={() => (activeCard?.w == 1 ? setSize(2) : setSize(1))}
          className={`${
            activeCard?.w == 1
              ? "bg-indigo-200 text-gray-600 hover:bg-indigo-300"
              : "bg-transparent text-gray-600 hover:bg-gray-50"
          } w-full py-1.5 rounded focus:outline-none border border-gray-400 transition duration-300 ease-in-out mb-6`}
        >
          Switch to {activeCard?.w == 1 ? "full card" : "half card"}
        </button>

        <div>
          {/* {mode == 'image' && <SketchPicker />} */}
          {mode == "color" && (
            <div className="absolute z-20">
              <div
                className="fixed top-0 right-0 left-0 bottom-0"
                onClick={() => setMode(false)}
              />
              <SketchPicker
                color={mediaState?.backgroundColor}
                onChangeComplete={handleColorChange}
              />
            </div>
          )}
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
          <button
            onClick={() => removingModalHandler(activeCard)}
            className="w-1/2 py-1.5 rounded focus:outline-none bg-red-600 text-white flex items-center justify-center"
          >
            <FiTrash className="w-4 h-4 mr-1.5" /> Delete
          </button>
        </div>
        <button
          onClick={handleSave}
          className="w-full py-1.5 rounded focus:outline-none bg-indigo-700 text-white "
        >
          Save
        </button>
      </SlidingPane>
    </>
  );
}
