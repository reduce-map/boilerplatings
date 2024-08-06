import mongoose from "mongoose";
import { IS_PRODUCTION } from "../../config/constants";
const clientSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  country: {
    type: String,
  },
  company: {
    type: String,
  },
  message: {
    type: String,
  },
  sendDNA: {
    type: Boolean,
  },
  personalData: {
    type: Boolean,
  },
});

class Client {
  Client = mongoose.model("Client", clientSchema);
  ClientDev = mongoose.model("ClientDev", clientSchema);

  get clientInstance() {
    return IS_PRODUCTION ? this.Client : this.ClientDev;
  }

  find(...args) {
    return this.clientInstance.find(...args);
  }

  create(...args) {
    return this.clientInstance.create(...args);
  }

  save(...args) {
    return this.clientInstance.save(...args);
  }
}

export default new Client();
