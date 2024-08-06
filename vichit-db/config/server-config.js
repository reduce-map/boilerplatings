import express from "express";
import bodyParser from "body-parser";
import { IS_PRODUCTION, WHITE_LIST } from "./constants";
import { routeProtect } from "../middleware/routeProtect";

const app = express();
const cors = require("cors");

var corsOptions = {
  origin: function (origin, callback) {
    if (!IS_PRODUCTION || WHITE_LIST.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

export default app
  .use(cors(corsOptions))
  .use(express.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(routeProtect);
