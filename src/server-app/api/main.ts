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
import { app as helloworld } from './helloworld';


const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', helloworld);

(async () => {
  await db.initialize();

  app.listen(3022, () => {
    console.log(`app listening on 3022`);
  });
})();
