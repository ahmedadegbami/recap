import express from "express";
import listEndpoints from "express-list-endpoints";
import userRouter from "./apis/users/index.js";

const server = express();

server.use(express.json());
server.use("/users", userRouter);

const port = 3001;

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log(`Server is listening on port ${port}`);
});
