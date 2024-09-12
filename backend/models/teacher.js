// import mongoose module
const mongoose=require("mongoose");
//create match schema 
const teacherSchema=mongoose.Schema({
    name:String,
    speciality:String,
    experience:Number,  
});
//affect name to matchSchema
const teacher=mongoose.model("teacher",teacherSchema);
//make model exportable
module.exports=teacher;