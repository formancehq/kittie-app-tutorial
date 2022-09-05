import { Router } from "express";

export const app = Router();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('Hello, world!')
})