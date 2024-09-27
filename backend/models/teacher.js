// import mongoose module
const User = require("./user");
const mongoose = require("mongoose");
//create match schema
const teacherSchema = mongoose.Schema({
  speciality: String,
  experience: Number,
  status: { type: String, default: "not validate" }, // Add status field with default value
});
//affect name to matchSchema
const teacher = User.discriminator("teacher", teacherSchema);
//make model exportable
module.exports = teacher;
