import { app } from "./app";

const PORT = 4000;

app
  .listen({ port: PORT })
  .then(() => console.log(`HTTP Server Running on Port ${PORT}`));
