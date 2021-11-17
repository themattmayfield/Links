import Stripe from "stripe";

export const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2020-08-27",
  // Register this as an official Stripe plugin.
  // https://stripe.com/docs/building-plugins#setappinfo
  appInfo: {
    name: "Trustvp",
    version: "0.1.0",
  },
});
