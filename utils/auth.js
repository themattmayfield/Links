import React, { useState, useEffect, useContext, createContext } from "react";
import Router from "next/router";
import { auth } from "./firebase";
import {
  onAuthStateChanged,
  signInWithCredential,
  signOut,
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  onIdTokenChanged,
  sendPasswordResetEmail,
  reauthenticateWithCredential,
  deleteUser,
  updatePassword,
} from "firebase/auth";
import { toast } from "react-toastify";
import { errorCodes } from "./errorCodes";

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
  const [loading, setLoading] = useState(false);

  const authUser = auth.currentUser;

  const handleError = (error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    setLoading(false);
    Toast.show(errorCodes[errorCode] || errorMessage, {
      duration: Toast.durations.LONG,
    });
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

  const signup = async (email, password) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      Router.push("/login");
    } catch (error) {
      handleError(error);
    }
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
    try {
      sendPasswordResetEmail(auth, email).then(() => {
        Toast.show("Check your mail for password recovery instructions", {
          duration: Toast.durations.LONG,
        });
      });

      return true;
    } catch (error) {
      handleError(error);
    }
  };

  const reauthenticateUser = async (credential) => {
    try {
      const response = await reauthenticateWithCredential(
        auth.currentUser,
        credential
      );
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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
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
  return {
    uid: user?.uid,
    email: user?.email,
    // name: user?.displayName,
    provider: user?.providerData[0]?.providerId,
    // photoUrl: user?.photoURL,
    token,
    emailVerified: user?.emailVerified,
  };
};
