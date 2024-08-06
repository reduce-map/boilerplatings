import mongoose from "mongoose";
import { uri } from "../config/db-config";

export { default as Client } from "./schemas/client";

export const db = mongoose
  .connect(uri)
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));
