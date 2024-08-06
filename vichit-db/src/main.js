import { PORT } from "../config/constants";
import app from "../config/server-config";
import { Client, db } from "../db";
import routes from "../controllers/client";

async function init() {
  await db;
  app.use("/client", routes({ Client }));
}

init();
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
