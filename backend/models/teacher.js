// import mongoose module
const User = require("./user");
const mongoose = require("mongoose");
//create match schema
const teacherSchema = mongoose.Schema({
  speciality: String,
  experience: Number,
});
//affect name to matchSchema
const teacher = User.discriminator("teacher", teacherSchema);
//make model exportable
module.exports = teacher;
