import dotnev from "dotenv";
import { app } from "./app.js";

import connectDB from "../db/connectDB.js";

dotnev.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server running on PORT : ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("Something went wrong while running server : ", error);
  });
