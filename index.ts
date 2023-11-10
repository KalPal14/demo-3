import express, { Request, Response, NextFunction } from "express";

import { userRouter } from "./users/users.js";

const port = 8000;
const app = express();

app.get("/hello", (req, res) => {
  throw new Error("Big Error!!!");
});

app.use("/users", userRouter);

// Обработчик ошибок должен
// находится под обработчиками роутов
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  res.status(401).send(err.message);
});

app.listen(port, () => {
  console.log(`Сервер запущен http://localhost:${port}`);
});
