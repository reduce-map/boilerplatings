import { URL_DB, DB_JWT_KEY } from "../../config/constants";
import axios from "axios";
import jwt from "jsonwebtoken";
const bdService = axios.create({
  baseURL: URL_DB,
});

export const safeClient = (data, url) => {
  return bdService.post("/client", data, {
    headers: {
      Origin: url,
      Authorization: jwt.sign({}, DB_JWT_KEY),
    },
  });
};
