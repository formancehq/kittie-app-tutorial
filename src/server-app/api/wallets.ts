import { Router } from "express";
import { getMyBalance } from "../service/wallets";
import { createDepositLink } from "../service/processing";

export const app = Router();

app.get('/balance', async (req: any, res) => {
  const balance = await getMyBalance({
    id: req.auth['userId'],
  });

  res.json({
    ...balance,
  });
});

app.post('/deposit/link', async (req: any, res) => {
  const url : string = await createDepositLink({
    amount: req.body.amount,
    userId: req.auth['userId'],
    redirect: req.body.redirect,
  });

  res.json({
    url,
  });
});
