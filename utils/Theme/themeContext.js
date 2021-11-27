import React, { useState, useEffect, useContext, createContext } from "react";
import _ from "lodash";
import { useAuth } from "../auth";
import { db } from "../firebase";
import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";

import { themes } from "@/utils/Theme/themes";

const themeContext = createContext();

export function ThemeProvider({ children }) {
  const card = useProvideTheme();
  return <themeContext.Provider value={card}>{children}</themeContext.Provider>;
}

export const useTheme = () => {
  return useContext(themeContext);
};

function useProvideTheme() {
  const { authUser, user } = useAuth();

  const [activeTheme, setActiveTheme] = useState(null);

  const changeTheme = async (theme) => {
    try {
      setActiveTheme(theme);
      const docRef = doc(db, "users", authUser?.uid);
      await setDoc(docRef, { activeTheme: theme }, { merge: true });
    } catch (error) {
      console.log(error);
    }
  };

  let ThemeRender = {};

  themes.map((theme) => {
    ThemeRender[theme.name] =
      require(`../../components/Themes/${theme.name}`).default;
  });

  useEffect(() => {
    if (authUser) {
      const docRef = doc(db, "users", authUser?.uid);

      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setActiveTheme(data.activeTheme || _.find(themes, { id: "0" }));
        }
      });
    }
  }, [authUser]);

  return {
    activeTheme,
    changeTheme,
    ThemeRender,
  };
}
