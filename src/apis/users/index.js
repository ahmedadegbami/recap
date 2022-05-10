import express from "express";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import uniqid from "uniqid";

const userRouter = express.Router();

// const currentFileURL = import.meta.url;

// const currentFilePath = fileURLToPath(currentFileURL);

// const parentPath = dirname(currentFilePath);
// console.log(parentPath);

// const userJSONPath = join(parentPath, "users.json");
// console.log(userJSONPath);

const userJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "users.json"
);

userRouter.post("/", (req, res) => {
  console.log("REQ BODY:", req.body);
  const newUser = { ...req.body, createdAt: new Date(), id: uniqid() };
  console.log(newUser);
  const users = JSON.parse(fs.readFileSync(userJSONPath));
  users.push(newUser);
  fs.writeFileSync(userJSONPath, JSON.stringify(users));
  res.status(201).send({ id: newUser.id });
});

userRouter.get("/", (req, res) => {
  const fileContent = fs.readFileSync(userJSONPath);
  console.log(fileContent);
  const userArray = JSON.parse(fileContent);
  res.send(userArray);
});

userRouter.get("/:userId", (req, res) => {
  const userID = req.params.userId;
  console.log("userid:", userID);
  const users = JSON.parse(fs.readFileSync(userJSONPath));

  const user = users.find((user) => user.id === userID);

  res.send(user);
});
userRouter.put("/:userId", (req, res) => {
  const users = JSON.parse(fs.readFileSync(userJSONPath));
  const index = users.findIndex((user) => user.id === req.params.userId);
  const oldUser = users[index];

  const updatedUser = { ...oldUser, ...req.body, updatedAt: new Date() };

  users[index] = updatedUser;

  fs.writeFileSync(userJSONPath, JSON.stringify(users));

  res.send(updatedUser);
});
userRouter.delete("/:userId", (req, res) => {
  const users = JSON.parse(fs.readFileSync(userJSONPath));
  const rem = users.filter((user) => user.id !== req.params.userId);
  fs.writeFileSync(userJSONPath, JSON.stringify(rem));

  res.send();
});

export default userRouter;
