// import mongoose module
const mongoose = require("mongoose");
const defimg = "http://localhost:3000/uploads/profil1.png";

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
    path: {
      type: String,
      default: defimg,
    },
    phone: { type: String },
  },
  { discriminatorKey: "role", timestamps: true }
);
//affect name to coursSchema
const users = mongoose.model("users", usersSchema);
//make model exportable
module.exports = users;
