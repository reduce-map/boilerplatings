import formidableMiddleware from "express-formidable";
import { sendMessage } from "../services/bot";
import { safeClient } from "../services/bd-service";
export default function (app) {
  app.post("/form", formidableMiddleware(), async (req, res) => {
    try {
      await safeClient(req.fields, req.get("host"));
    } catch (error) {
      console.log("form - safe-client", error);
    }
    try {
      sendMessage(
        `
            New User
            ${JSON.stringify(req.fields, null, 4)}
          `,
        req.files.file
      );
      res.status(200).json({
        successful: true,
      });
    } catch (error) {
      console.log("send-message", error);
    }
  });
}
