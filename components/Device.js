import React from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { CardsPreview } from "@/components/Cards";
const Device = () => {
  // return (
  //   <LiveProvider code="<strong>Hello World!</strong>">
  //     <LiveEditor />
  //     <LiveError />
  //     <LivePreview />
  //   </LiveProvider>
  // );
  return (
    <div className="hidden lg:block">
      <div className="marvel-device iphone-x">
        <div className="notch">
          <div className="camera"></div>
          <div className="speaker"></div>
        </div>
        <div className="top-bar"></div>
        <div className="sleep"></div>
        <div className="bottom-bar"></div>
        <div className="volume"></div>
        <div className="overflow">
          <div className="shadow shadow--tr"></div>
          <div className="shadow shadow--tl"></div>
          <div className="shadow shadow--br"></div>
          <div className="shadow shadow--bl"></div>
        </div>
        <div className="inner-shadow"></div>
        <div className="screen">
          {/* <p>hello</p> */}
          <CardsPreview />
        </div>
      </div>
    </div>
  );
};

export default Device;
