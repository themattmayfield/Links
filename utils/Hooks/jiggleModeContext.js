import React, { useState, useContext, createContext, useRef } from "react";
import _ from "lodash";

const jiggleModeContext = createContext();

export function JiggleProvider({ children }) {
  const jiggle = useProvideJiggle();
  return (
    <jiggleModeContext.Provider value={jiggle}>
      {children}
    </jiggleModeContext.Provider>
  );
}

export const useJiggle = () => {
  return useContext(jiggleModeContext);
};

function useProvideJiggle() {
  const jiggleRef = useRef();

  const [jiggleMode, setjiggleMode] = useState(false);

  return {
    jiggleRef,
    jiggleMode,
    setjiggleMode,
  };
}
