import { raw, Router } from "express";
import { processDeposit } from "../service/processing";
import { stripe } from "../service/stripe";

export const app = Router();

app.post('/stripe', raw({type: 'application/json'}), async (req: any, res) => {
  let event;

  try {
    event = stripe().webhooks.constructEvent(
      req.body,
      req.headers['stripe-signature'],
      process.env['STRIPE_WEBHOOK_SECRET']
    );
  } catch (err) {
    return res.sendStatus(400);
  }

  if (event.type !== 'checkout.session.completed') {
    return res.sendStatus(200);
  }

  await processDeposit({
    payment: event.data.object,
  });

  res.json({});
});