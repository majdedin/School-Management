// models/Parent.js
const mongoose = require("mongoose");
const User = require("./user");

const parentSchema = new mongoose.Schema({
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

module.exports = User.discriminator("parent", parentSchema);
