import { stripe } from "@/utils/stripe";
import { createOrRetrieveCustomer } from "@/utils/db";
import { baseURL } from "@/utils/helper";

const createPortalLink = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { user } = req.body;

      const customer = await createOrRetrieveCustomer(user);
      console.log(customer);
      const { url } = await stripe.billingPortal.sessions.create({
        customer,
        return_url: `${baseURL}/account`,
      });

      return res.status(200).send({ url: url });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: { statusCode: 500, message: err.message } });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default createPortalLink;
