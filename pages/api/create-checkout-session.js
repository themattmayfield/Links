import { baseURL } from "@/utils/helper";
import Stripe from "stripe";
import { createOrRetrieveCustomer } from "@/utils/db";

const secret = process.env.NEXT_PUBLIC_STRIPE_SECRET;
const stripe = new Stripe(secret);

export default async (req, res) => {
  if (req.method === "POST") {
    const { user } = req.body;
    // console.log(user);
    const priceId = process.env.NEXT_PUBLIC_PRICE_ID;

    const customer = await createOrRetrieveCustomer(user);

    console.log(customer);
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
      // success_url: `${baseURL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      success_url: `${baseURL}`,
      cancel_url: `${baseURL}`,
    });
    return res.status(200).send({
      session: session,
    });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
