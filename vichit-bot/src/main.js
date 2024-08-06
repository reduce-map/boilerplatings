import app from "../config/server-config";
import { PORT } from "../config/constants";
import client from "./controllers/client";

client(app);
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
