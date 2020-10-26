const { model, Schema } = require("mongoose");

// will handle required flags in gql
// no need to do in schema
const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
});

module.exports = model("User", userSchema);
