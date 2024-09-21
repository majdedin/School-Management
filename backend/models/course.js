// import mongoose module
const mongoose = require("mongoose");
//create Course schema
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  duration: Number,
  description: String,
  ageOfKids: String,
  totalSeats: Number,
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "teacher" },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});
//affect name to coursSchema
const course = mongoose.model("course", courseSchema);
//make model exportable
module.exports = course;
