// models/Student.js
const mongoose = require("mongoose");
const User = require("./user");

const studentSchema = new mongoose.Schema({
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "course" }],
  grades: [
    {
      course: { type: mongoose.Schema.Types.ObjectId, ref: "course" },
      grade: Number,
    },
  ],
});

module.exports = User.discriminator("student", studentSchema);
