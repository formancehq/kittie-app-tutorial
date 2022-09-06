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

const app = express();

app.use(express.json());

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
  ],
}));

app.use('/api/auth', auth);

(async () => {
  await db.initialize();

  app.listen(3022, () => {
    console.log(`app listening on 3022`);
  });
})();
