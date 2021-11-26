/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useRef, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useCard } from "@/utils/cardContext";
import { TiChevronLeft } from "react-icons/ti";
import {
  BsImage,
  BsCircleFill,
  BsFillGrid1X2Fill,
  BsCheck,
} from "react-icons/bs";
import { BiText } from "react-icons/bi";
import { VscColorMode } from "react-icons/vsc";
import { FaTrash } from "react-icons/fa";
import { FcAddImage, FcRemoveImage } from "react-icons/fc";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";
import { SketchPicker } from "react-color";
import { useAuth } from "@/utils/auth";
import { storage } from "@/utils/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Compressor from "compressorjs";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";

export default function Example() {
  const {
    activeCard,
    setActiveCard,
    cardMode,
    setCardMode,
    editModeHandler,
    cardSaveHandler,
    removingModalHandler,
    cardMedia,
    updateMedia,
    deleteImageHandler,
  } = useCard();
  const { authUser } = useAuth();

  const zoomPanPinchRef = useRef(null);

  // const [opacity, setOpacity] = useState(30);
  // const [mode, setMode] = useState(null);

  const [mediaState, setMediaState] = useState({});
  const [file, setFile] = useState(null);

  useEffect(() => {
    let isActive = true;
    setMediaState((prevState) => ({
      ...prevState,
      image: cardMedia[activeCard?.i]?.image || null,
      backgroundColor:
        cardMedia[activeCard?.i]?.backgroundColor || "rgba(156, 163, 175)",
      size: activeCard?.w,
      pinchPanZoom: cardMedia[activeCard?.i]?.pinchPanZoom || null,
    }));

    return () => {
      isActive = false;
    };
  }, [cardMedia, activeCard]);

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
    cardSaveHandler(mediaState);

    if (file) {
      handleUpload();
      return true;
    }

    // delete image but not card
    if (!mediaState?.image && cardMedia[activeCard?.i]?.image) {
      deleteImageHandler(mediaState);
      // return true;
    }

    updateMedia(mediaState);
    // !_.isEmpty(mediaState) && updateMedia(mediaState);
    setMediaState({});
    setCardMode(null);
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

  const handleImageRemove = () => {
    setMediaState((prevState) => ({
      ...prevState,
      image: null,
    }));
  };

  const handlePinchPanZoom = (data) => {
    // console.log(data.current.state);
    const dataState = data.current.state;
    console.log(dataState);
    setMediaState((prevState) => ({
      ...prevState,
      pinchPanZoom: dataState,
    }));
  };

  return (
    <Transition.Root show={cardMode === "edit"} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={() => {
          setMediaState({});
          editModeHandler();
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="relative w-screen max-w-3xl">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll ">
                  <div className="relative flex flex-col h-full justify-between">
                    {/* Replace with your content */}

                    <div>
                      <div className="flex items-center justify-between pt-4 pb-2 mb-4 border-b border-gray-300 px-4 sm:px-6">
                        <div
                          onClick={() => {
                            setMediaState({});
                            editModeHandler();
                          }}
                          className="bg-gray-400 w-8 rounded-lg h-7 flex flex-col items-center justify-center cursor-pointer"
                        >
                          <span className="sr-only">Close panel</span>
                          <TiChevronLeft className="w-4 h-4 text-white" />
                        </div>

                        <div>
                          <BsCheck
                            onClick={handleSave}
                            className="w-8 h-8 flex items-center justify-center text-gray-900 cursor-pointer"
                          />
                        </div>
                      </div>
                      <div className="px-4 sm:px-6">
                        <TransformWrapper
                          doubleClick={{ disabled: true }}
                          wheel={{ step: "0.97" }}
                          minScale={0.1}
                          centerZoomedOut={true}
                          ref={zoomPanPinchRef}
                          onZoomStop={() => handlePinchPanZoom(zoomPanPinchRef)}
                          onWheelStop={() =>
                            handlePinchPanZoom(zoomPanPinchRef)
                          }
                          onPinchingStop={() =>
                            handlePinchPanZoom(zoomPanPinchRef)
                          }
                          onPanningStop={() =>
                            handlePinchPanZoom(zoomPanPinchRef)
                          }
                          initialScale={mediaState?.pinchPanZoom?.scale || 1}
                          initialPositionX={
                            mediaState?.pinchPanZoom?.positionX || 0
                          }
                          initialPositionY={
                            mediaState?.pinchPanZoom?.positionY || 0
                          }
                        >
                          {({ zoomIn, zoomOut, resetTransform }) => (
                            <>
                              <div className="flex items-center justify-center pb-4 space-x-6">
                                {mediaState?.image ? (
                                  <FcRemoveImage
                                    onClick={() => handleImageRemove()}
                                    className="w-8 h-8"
                                  />
                                ) : (
                                  <label>
                                    <input
                                      className="hidden"
                                      type="file"
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                    />
                                    <FcAddImage className="w-8 h-8" />
                                  </label>
                                )}

                                <div
                                  onClick={() =>
                                    mediaState?.size == 1
                                      ? setMediaState((prevState) => ({
                                          ...prevState,
                                          size: 2,
                                        }))
                                      : setMediaState((prevState) => ({
                                          ...prevState,
                                          size: 1,
                                        }))
                                  }
                                  className="w-12 h-6 border border-dashed border-gray-400 rounded cursor-pointer"
                                >
                                  <div
                                    className={`${
                                      mediaState?.size == 1 ? "w-6 " : "w-full "
                                    } h-full bg-gray-400 rounded`}
                                  ></div>
                                </div>

                                {mediaState?.image ? (
                                  <>
                                    <AiOutlinePlus
                                      onClick={() => {
                                        zoomIn(0.1);
                                        handlePinchPanZoom(zoomPanPinchRef);
                                      }}
                                      className="w-6 h-6 cursor-pointer"
                                    />

                                    <AiOutlineMinus
                                      onClick={() => {
                                        zoomOut(0.1);
                                        handlePinchPanZoom(zoomPanPinchRef);
                                      }}
                                      className="w-6 h-6 cursor-pointer"
                                    />

                                    <GrPowerReset
                                      onClick={() => {
                                        resetTransform();
                                        handlePinchPanZoom(zoomPanPinchRef);
                                      }}
                                      className="w-6 h-6 cursor-pointer"
                                    />

                                    {/* <VscColorMode
                                      style={{
                                        color: mediaState?.backgroundColor,
                                      }}
                                      onClick={() => setMode("color")}
                                      className="w-7 h-7 flex items-center justify-center cursor-pointer"
                                    /> */}
                                  </>
                                ) : null}
                              </div>
                              <div
                                style={{
                                  backgroundColor: mediaState?.backgroundColor,
                                }}
                                className={`${
                                  mediaState?.size == 1
                                    ? "w-[195px] "
                                    : "w-full sm:w-[400px]"
                                } rounded-xl mx-auto`}
                              >
                                <TransformComponent wrapperClass="rounded-xl">
                                  <div
                                    style={{
                                      backgroundImage: `url(${mediaState?.image})`,
                                    }}
                                    className={`
                    ${
                      mediaState?.size == 1
                        ? "w-[195px] "
                        : "w-full sm:w-[400px]"
                    }
                  h-[170px] rounded-xl bg-contain bg-center bg-no-repeat relative`}
                                  ></div>
                                </TransformComponent>
                              </div>
                            </>
                          )}
                        </TransformWrapper>

                        <div className="pt-6 flex items-center justify-center">
                          <SketchPicker
                            color={mediaState?.backgroundColor}
                            onChangeComplete={handleColorChange}
                          />

                          {/* <p>Opacity</p>
                          <Slider /> */}
                        </div>
                      </div>
                    </div>

                    {/* CONTROLS */}
                    <div className="flex items-center justify-end py-4 border-t border-gray-300 px-4 sm:px-6">
                      {/*  <label>
                        <input
                          className="hidden"
                          type="file"
                          onChange={(e) => {
                            handleChange(e);
                          }}
                        />
                        <BsFillGrid1X2Fill
                          // onClick={() => setMode("image")}
                          className="w-10 h-10 flex items-center justify-center text-gray-700 cursor-pointer"
                        />
                      </label>

                     
                      <BiText
                        onClick={() => setMode("text")}
                        className="w-10 h-10 flex items-center justify-center text-gray-900 cursor-pointer"
                      /> */}
                      <FaTrash
                        onClick={() => removingModalHandler(activeCard)}
                        className="w-6 h-6 flex items-center justify-center text-red-600 cursor-pointer"
                      />
                    </div>
                    {/* /End replace */}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
