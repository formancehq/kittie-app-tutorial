import path from 'path';
import dotenv from "dotenv";
dotenv.config({
  path: path.join(__dirname, '../../../.env'),
});

console.log(path.join(__dirname, '../../../.env'));

import express from 'express';
import { expressjwt as jwt } from 'express-jwt';
import { secret } from '../service/jwt';
import { db } from '../db/db';
import cors from 'cors';


// Routes
import { app as auth } from './auth';
import { app as wallets } from './wallets';
import { app as hooks } from './hooks';

const app = express();

// Use JSON parser for all non-webhook routes
app.use(
  (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void => {
    if (req.originalUrl === '/api/hooks/stripe') {
      next();
    } else {
      express.json()(req, res, next);
    }
  }
);

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200,
  }));

app.use('/api', jwt({
  secret: secret,
  algorithms: ["HS256"],
}).unless({
  path: [
    /^\/api\/auth/,
    /^\/api\/hooks/,
  ],
}));

app.use('/api/auth', auth);
app.use('/api/wallets', wallets);
app.use('/api/hooks', hooks);

(async () => {
  await db.initialize();

  app.listen(3022, () => {
    console.log(`app listening on 3022`);
  });
})();
