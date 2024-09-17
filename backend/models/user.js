// import mongoose module
const mongoose = require("mongoose");
//create cours schema
const usersSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    age: Number,
    address: String,
    email: String,
    pwd: String,
    confirmPassword: String,
    role: String,
    path: String,
  },
  { discriminatorKey: "role", timestamps: true }
);
//affect name to coursSchema
const users = mongoose.model("users", usersSchema);
//make model exportable
module.exports = users;
