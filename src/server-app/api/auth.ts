import { Router } from "express";
import { authenticate, loginOrCreate } from "../service/stytch";

export const app = Router();

app.post('/request-code', async (req, res) => {
  const number = req.body['phone_number'];
  const rid = await loginOrCreate(number);

  res.json({
    rid,
  });
});

app.post('/login', async (req, res) => {
  const rid = req.body['rid'];
  const code = req.body['code'];

  const jwt = await authenticate(rid, code);

  res.json({
    jwt,
  });
});