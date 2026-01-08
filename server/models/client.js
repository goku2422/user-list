const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isLoggedIn: {
    type: Boolean,
    default: false
  }
});

const ClientModel = mongoose.model("clients", clientSchema);
module.exports = ClientModel;
