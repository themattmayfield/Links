import React, { useState, useEffect, useContext, createContext } from "react";
import Router from "next/router";
import { auth } from "./firebase";
import {
  onAuthStateChanged,
  signInWithCredential,
  signOut,
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  reauthenticateWithCredential,
  deleteUser,
  updatePassword,
} from "firebase/auth";
import { errorCodes } from "./errorCodes";
import { Toast } from "@/components/pageUtils";
import { getUser, getStripeRole, createUser } from "@/utils/db";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authUser = auth.currentUser;

  const handleError = (error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    setLoading(false);
    Toast("error", errorCodes[errorCode] || errorMessage);
  };

  const signout = () => {
    signOut(auth)
      .then(() => {
        setUser(false);
        Router.push("/login");
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const emailAuthProv = (email, password) => {
    const credential = EmailAuthProvider.credential(email, password);
    return credential;
  };

  const signup = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        const formattedUser = await formatUser(user);
        createUser(formattedUser);
        Router.push("/login");
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const signin = (credential) => {
    signInWithCredential(auth, credential)
      .then((userCredential) => {
        setUser(userCredential.user);
        Router.push("/");
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const forgotPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Router.push("/login");
        Toast("success", "Check your mail for password recovery instructions");
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const reauthenticateUser = async (credential) => {
    try {
      await reauthenticateWithCredential(auth.currentUser, credential);
      return { status: true };
    } catch (error) {
      handleError(error);
      return { status: false };
    }
  };

  const passwordReset = async (credential, newPassword) => {
    const { status } = await reauthenticateUser(credential);
    if (status && newPassword) {
      passwordUpdate(newPassword);
    }
  };

  const passwordUpdate = (newPassword) => {
    updatePassword(auth.currentUser, newPassword)
      .then(() => {
        // console.log("passwordUpdated");
      })
      .catch((error) => {
        handleError(error);
      });
  };
  const deleteAccount = async (credential) => {
    const { status } = await reauthenticateUser(credential);
    if (status) {
      const deleteThisUser = await deleteUser(auth.currentUser);
      console.log("hey matt", deleteThisUser);
      // handleUser(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        formatUser(user).then((formattedUser) => {
          console.log(formattedUser);
          setUser(formattedUser);
        });
      } else {
        setUser(false);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    reauthenticateUser,
    authUser,
    signout,
    forgotPassword,
    signin,
    emailAuthProv,
    signup,
    passwordReset,
    deleteAccount,
  };
}

const formatUser = async (user) => {
  const token = await user?.getIdToken();
  const dbUser = await getUser(user?.uid);
  console.log(dbUser);
  return {
    ...dbUser?.user,
    uid: user?.uid,
    email: user?.email,
    provider: user?.providerData[0]?.providerId,
    token,
    emailVerified: user?.emailVerified,
    stripeRole:
      dbUser?.user?.stripeID || user?.stripeID
        ? await getStripeRole(dbUser?.user?.stripeID)
        : "Free",
  };
};
