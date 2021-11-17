import { db } from "./firebase";
import { stripe } from "./stripe";
import { doc, setDoc, getDoc } from "firebase/firestore";
import Router from "next/router";
import axios from "axios";

export const getUser = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
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
  Router.push(session.url);

  return { session };
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
      await setDoc(
        docRef,
        { user: { ...user, stripeID: customer.id } },
        { merge: true }
      );
      return customer.id;
    } catch (error) {
      console.log(error);
    }
  } else {
    return user.stripeID;
  }
};

export const getStripeAccount = async (uid) => {
  try {
    const { data } = await axios.get(
      `/api/getStripeAccount?id=cus_KbpIq5oTKQ13CZ`
    );
    console.log(data);
    // return data
  } catch (error) {
    console.error(error);
  }
};

// export async function goToBillingPortal() {
//   const functionRef = app
//     .functions("us-central1")
//     .httpsCallable("ext-firestore-stripe-subscriptions-createPortalLink");

//   const { data } = await functionRef({
//     returnUrl: `${window.location.origin}/account`,
//   });

//   window.location.assign(data.url);
// }
