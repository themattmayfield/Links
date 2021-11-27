import React, { useState, useEffect, useContext, createContext } from "react";
import _ from "lodash";
import { useAuth } from "@/utils/auth";
import { db } from "@/utils/firebase";
import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";

const basicThemeContext = createContext();

export function BasicThemeProvider({ children }) {
  const card = useProvideBasicTheme();
  return (
    <basicThemeContext.Provider value={card}>
      {children}
    </basicThemeContext.Provider>
  );
}

export const useBasicTheme = () => {
  return useContext(basicThemeContext);
};

function useProvideBasicTheme() {
  const { authUser } = useAuth();

  const [themeThings, setThemeThings] = useState(null);

  useEffect(() => {
    // if (authUser) {
    //   const docRef = doc(db, "users", authUser?.uid);
    //   getDoc(docRef).then((docSnap) => {
    //     if (docSnap.exists()) {
    //       const data = docSnap.data();
    //       setActiveTheme(data.activeTheme || _.find(themes, { id: "0" }));
    //     }
    //   });
    // }
  }, [authUser]);

  return {
    themeThings,
    setThemeThings,
  };
}
