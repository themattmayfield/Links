import { db } from "./firebase";
import { stripe } from "./stripe";
import getStripe from "./stripe-client";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

import axios from "axios";

export const createUser = async (user) => {
  console.log(user);
  const docRef = doc(db, "users", user?.uid);
  await setDoc(docRef, { user: user });
};

export const getUser = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  }
};

export async function createCheckoutSession(user) {
  const result = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: user }),
  });

  const { session } = await result.json();
  const stripe = await getStripe();
  stripe.redirectToCheckout({ sessionId: session.id });

  // Router.push(session.url);

  // return { session };
}

export const createOrRetrieveCustomer = async (user) => {
  if (!user?.stripeID) {
    // No customer record found, let's create one.
    const customerData = {
      email: user.email,
      metadata: {
        firebaseID: user.uid,
      },
    };
    const customer = await stripe.customers.create(customerData);
    // Now insert the customer ID into our Supabase mapping table.
    try {
      const docRef = doc(db, "users", user?.uid);
      await updateDoc(docRef, { "user.stripeID": customer.id });

      return customer.id;
    } catch (error) {
      console.log(error);
    }
  } else {
    return user.stripeID;
  }
};

export const getStripeRole = async (uid) => {
  try {
    const { data } = await axios.get(
      // `/api/getStripeAccount?id=cus_Kc5Ij79LwWhPBo`
      `/api/getStripeAccount?id=${uid}`
    );
    // console.log(data);
    // console.log(data?.subscriptions.data.length);
    return data?.subscriptions.data.length ? "Pro" : "Free";
  } catch (error) {
    console.error(error);
  }
};

export async function goToBillingPortal(user) {
  try {
    const result = await fetch("/api/create-portal-link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: user }),
    });
    const { url } = await result.json();

    window.location.assign(url);
  } catch (error) {
    if (error) return alert(error.message);
  }
}
