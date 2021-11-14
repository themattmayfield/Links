import React, { useState, useEffect, useContext, createContext } from "react";
import _ from "lodash";
import { useAuth } from "./auth";
import { db } from "./firebase";
import { ref, onValue, set, remove } from "firebase/database";
import uuid from "react-uuid";

const cardContext = createContext();

export function CardProvider({ children }) {
  const card = useProvideCard();
  return <cardContext.Provider value={card}>{children}</cardContext.Provider>;
}

export const useCard = () => {
  return useContext(cardContext);
};

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

const myLayout = getFromLS("layouts") || {
  lg: [{ i: uuid(), x: 0, y: 0, w: 2, h: 1 }],
  xxs: [{ i: uuid(), x: 0, y: 0, w: 2, h: 1 }],
};

function useProvideCard() {
  const { authUser } = useAuth();

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeCard, setActiveCard] = useState(null);
  const [cardMode, setCardMode] = useState(null);

  const [layouts, setLayouts] = useState(myLayout);
  const [getHeight, setHeight] = useState(_.maxBy(layouts.xxs, "y").y);

  const editModeHandler = (item) => {
    if (item) {
      setActiveCard(item);
      setCardMode("edit");
    } else {
      setActiveCard(null);
      setCardMode(null);
    }
  };

  const removingModalHandler = (id) => {
    if (id) {
      setCardMode("remove");
      setActiveCard(id);
    } else {
      setCardMode(null);
      setActiveCard(null);
    }
  };

  const addCardHandler = () => {
    const lg = [...layouts.lg];
    const xxs = [...layouts.xxs];

    const newObject = { i: uuid(), x: 0, y: 0, w: 2, h: 1 };
    lg.unshift(newObject);
    xxs.unshift(newObject);

    setLayouts({
      lg: lg,
      xxs: xxs,
    });
    editModeHandler(newObject);
    console.log(layouts);
  };

  const removeCardHandler = () => {
    const lg = [...layouts.lg];
    const xxs = [...layouts.xxs];

    const indexLG = _.findIndex(lg, { i: activeCard });
    const indexXXS = _.findIndex(xxs, { i: activeCard });

    indexLG !== -1 ? lg.splice(indexLG, 1) : "";

    indexXXS !== -1 ? xxs.splice(indexXXS, 1) : "";

    setLayouts({
      lg: lg,
      xxs: xxs,
    });
    removingModalHandler(false);
  };

  const cardSaveHandler = (card) => {
    const lg = [...layouts.lg];
    const xxs = [...layouts.xxs];

    const lgIndex = _.findIndex(lg, { i: card.i });
    const xxsIndex = _.findIndex(xxs, { i: card.i });

    lg[lgIndex] = { ...card };
    xxs[xxsIndex] = { ...card };

    setLayouts({
      lg: lg,
      xxs: xxs,
    });
  };

  const onLayoutChange = (layout, layouts) => {
    console.log(layouts);
    const cardsForUI = { ...layouts };
    console.log(cardsForUI);
    saveToLS("layouts", layouts);
    setLayouts(layouts);
    setHeight(_.maxBy(layouts.xxs, "y").y);
  };

  // const saveCard = async (value) => {
  //   try {
  //     const cardsSpread = cards.length ? [...cards] : [];
  //     cardsSpread.push(value);
  //     handleNonAuthUserCardUpdates(cardsSpread);
  //     if (authUser) {
  //       set(ref(db, "users/" + authUser?.uid), cardsSpread);
  //     }
  //   } catch (e) {
  //     alert(e);
  //     // saving error
  //   }
  //   setScanned(false);
  //   setActiveCard(null);
  // };

  // const deleteCard = async (id) => {
  //   try {
  //     const cardsSpread = [...cards];
  //     const cardIndex = _.findIndex(cardsSpread, { id: id });
  //     cardsSpread.splice(cardIndex, 1);
  //     handleNonAuthUserCardUpdates(cardsSpread);
  //     setActiveCard(null);
  //     if (authUser) {
  //       set(ref(db, "users/" + authUser?.uid), cardsSpread);
  //     }
  //   } catch (e) {
  //     alert(e);
  //   }
  // };

  // const editCard = async (data) => {
  //   try {
  //     const cardsSpread = [...cards];
  //     const cardIndex = _.findIndex(cardsSpread, { id: data?.id });
  //     cardsSpread[cardIndex] = data;
  //     handleNonAuthUserCardUpdates(cardsSpread);
  //     setActiveCard(data);
  //     if (authUser) {
  //       set(ref(db, "users/" + authUser?.uid), cardsSpread);
  //     }
  //   } catch (e) {
  //     alert(e);
  //   }
  // };

  // useEffect(() => {
  //   if (authUser) {
  //     onValue(ref(db, "/users/" + authUser?.uid), (snapshot) => {
  //       const data = snapshot.val();
  //       console.log(data);
  //       // console.log(snapshot);
  //       setCards(data || []);
  //     });
  //   }

  //   //   const unsubscribe = onIdTokenChanged(auth, handleUser);

  //   //   return () => {

  //   //     unsubscribe();
  //   //   };
  // }, [authUser]);

  return {
    cards,
    loading,
    setLoading,

    activeCard,
    setActiveCard,
    editModeHandler,
    setCardMode,
    removingModalHandler,
    cardMode,
    addCardHandler,
    removeCardHandler,
    onLayoutChange,
    cardSaveHandler,
    layouts,
    getHeight,
    // saveCard,
    // deleteCard,
    // editCard,
    // deleteUserCards,
  };
}
