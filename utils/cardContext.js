import React, { useState, useEffect, useContext, createContext } from "react";
import _ from "lodash";
import { useAuth } from "./auth";
import { db } from "./firebase";
import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import uuid from "react-uuid";
import { deleteFile } from "./storage";

const cardContext = createContext();

export function CardProvider({ children }) {
  const card = useProvideCard();
  return <cardContext.Provider value={card}>{children}</cardContext.Provider>;
}

export const useCard = () => {
  return useContext(cardContext);
};

// const myLayout = getFromLS("layouts") || {
//   lg: [{ i: uuid(), x: 0, y: 0, w: 2, h: 1 }],
//   xxs: [{ i: uuid(), x: 0, y: 0, w: 2, h: 1 }],
// };

function useProvideCard() {
  const { authUser, user } = useAuth();

  const [activeCard, setActiveCard] = useState(null);
  const [cardMode, setCardMode] = useState(null);

  const [cardMedia, setCardMedia] = useState({});
  const [layouts, setLayouts] = useState(null);
  const [getHeight, setHeight] = useState(_.maxBy(layouts?.xxs, "y")?.y);

  const editModeHandler = (item) => {
    if (item) {
      setActiveCard(item);
      setCardMode("edit");
    } else {
      setActiveCard(null);
      setCardMode(null);
    }
  };

  const removingModalHandler = (card) => {
    if (card) {
      setCardMode("remove");
      setActiveCard(card);
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
  };

  const deleteCardUI = () => {
    const lg = [...layouts.lg];
    const xxs = [...layouts.xxs];

    const indexLG = _.findIndex(lg, { i: activeCard?.i });
    const indexXXS = _.findIndex(xxs, { i: activeCard?.i });

    indexLG !== -1 ? lg.splice(indexLG, 1) : "";

    indexXXS !== -1 ? xxs.splice(indexXXS, 1) : "";

    setLayouts({
      lg: lg,
      xxs: xxs,
    });
    removingModalHandler(false);
  };

  const removeCardHandler = async () => {
    if (cardMedia[activeCard?.i]?.image) {
      deleteFile(`/${authUser?.uid}/${activeCard?.i}`)
        .then(async () => {
          const docRef = doc(db, "users", authUser?.uid);

          const createdKey = `Theme1.cardMedia.${activeCard?.i}`;
          console.log(createdKey);
          await updateDoc(docRef, {
            [createdKey]: deleteField(),
          });
          // deleteCardUI();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      deleteCardUI();
    }
  };

  const deleteImageHandler = async () => {
    if (cardMedia[activeCard?.i]?.image) {
      console.log("here in delete");
      deleteFile(`/${authUser?.uid}/${activeCard?.i}`)
        .then(async () => {
          const docRef = doc(db, "users", authUser?.uid);

          const createdKey = `Theme1.cardMedia.${activeCard?.i}.image`;

          await updateDoc(docRef, {
            [createdKey]: deleteField(),
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      deleteCardUI();
    }
  };

  const cardSaveHandler = (mediaState) => {
    const lg = [...layouts.lg];
    const xxs = [...layouts.xxs];

    const lgIndex = _.findIndex(lg, { i: activeCard.i });
    const xxsIndex = _.findIndex(xxs, { i: activeCard.i });

    lg[lgIndex] = { ...activeCard, w: mediaState?.size };
    xxs[xxsIndex] = { ...activeCard, w: mediaState?.size };

    setLayouts({
      lg: lg,
      xxs: xxs,
    });
    // console.log(xxs);
  };

  const onLayoutChange = async (layout, layouts) => {
    const cleanLayout = {
      lg: [],
      xxs: [],
    };
    _.forEach(layout, (value) => {
      cleanLayout.lg.push(_.omitBy(value, _.isNil));
      cleanLayout.xxs.push(_.omitBy(value, _.isNil));
    });

    try {
      const docRef = doc(db, "users", authUser?.uid);
      await setDoc(
        docRef,
        { Theme1: { layout: cleanLayout } },
        { merge: true }
      );

      // console.log("Document written with ID: ", docRef);
    } catch (error) {
      console.log(error);
    }
    setLayouts(layouts);
    setHeight(_.maxBy(layouts?.xxs, "y")?.y);
  };

  const updateMedia = async (mediaState) => {
    console.log(mediaState);
    try {
      const docRef = doc(db, "users", authUser?.uid);
      await setDoc(
        docRef,
        {
          Theme1: {
            cardMedia: {
              [activeCard?.i]: {
                ...mediaState,
              },
            },
          },
        },
        { merge: true }
      );
      console.log("Document written with ID: ", docRef);
    } catch (error) {
      console.log(error);
    }
    setCardMedia((prevState) => ({
      ...prevState,
      [activeCard.i]: mediaState,
    }));
  };

  useEffect(() => {
    if (authUser) {
      const docRef = doc(db, "users", authUser?.uid);

      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log(data);
          setLayouts(data.Theme1?.layout || {});
          setCardMedia(data.Theme1?.cardMedia || {});
        } else {
          setLayouts({});
        }
      });
    }
  }, [authUser]);

  return {
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
    cardMedia,
    setCardMedia,
    updateMedia,
    deleteImageHandler,
  };
}
