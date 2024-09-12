//********************module importation**************************/
//import express module
const express = require("express");

//import body parser module
const bodyParser = require("body-parser");
//*********************Importation:mongoose***********************/
const mongoose = require("mongoose");
//EducationDB=>data base name
mongoose.connect("mongodb://127.0.0.1:27017/educationDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017/educationDB';
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
//*********************express application************************/
//creates express application
const app = express();
//import b crypt (module de cryptage)
const bcrypt = require("bcrypt");



//*********************app configuaration*************************/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//*********************Module d'Importation jsonwebtoken************************/
const jwt = require('jsonwebtoken');
//*********************Module d'Importation express-session************************/
const session = require('express-session');
//***********************importation multer******************************
const path = require('path');
const multer = require('multer');

// Security configuration

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.setHeader(
        "Access-Control-Allow-Headers",

        "Origin, Accept, Content-Type, X-Requested-with, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});
//img configuration
app.use('/shortCut', express.static(path.join('backend/photos')))
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}

const storageConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        if (isValid) {
            cb(null, 'backend/photos')
        }
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
            extension;
        cb(null, imgName);
    }
});
//************secret key configuration
const secretKey = 'your-secret-key';
app.use(session({ secret: secretKey, }));
// //*********************Models Importation*************************/
const Course = require("./models/course");
const Teacher = require("./models/teacher");
const Users = require("./models/user");

// Fake datebase
//courses
// let coursesTab = [{
//         id: 1,
//         title: "mondialisation",
//         description: "lorem eli lorem",
//         price: "300$",
//         duration: "50 hour",
//         ageOfKids: "13-15",
//         totalSeats: 10,
//         img: "assets/img/class-3.jpg",
//         img1: "assets/img/blog-2.jpg",
//     },
//     {
//         id: 2,
//         title: "electricité",
//         description: "lorem eli lorem",
//         price: "3000$",
//         duration: "250 hour",
//         ageOfKids: "15-18",
//         totalSeats: 15,
//         img: "assets/img/class-1.jpg",
//         img1: "assets/img/blog-1.jpg",
//     },
//     {
//         id: 3,
//         title: "html",
//         description: "lorem eli lorem",
//         price: "1500$",
//         duration: "150 hour",
//         ageOfKids: "14-17",
//         totalSeats: 12,
//         img: "assets/img/class-2.jpg",
//         img1: "assets/img/blog-3.jpg",
//     },
// ];
// //teachers
// let teachersTab = [{
//         id: 1,
//         name: "samia",
//         speciality: "math",
//         experience: "10ans",
//         img: "assets/img/team-1.jpg",
//     },
//     {
//         id: 2,
//         name: "alia",
//         speciality: "phys",
//         experience: "5ans",
//         img: "assets/img/testimonial-3.jpg",
//     },
//     {
//         id: 3,
//         name: "saliha",
//         speciality: "francais",
//         experience: "7ans",
//         img: "assets/img/testimonial-1.jpg",
//     },
//     {
//         id: 4,
//         name: "lamia",
//         speciality: "info",
//         experience: "2ans",
//         img: "assets/img/testimonial-2.jpg",
//     },
// ];

// function generateId(T) {
//     let max;
//     if (T.length == 0) {
//         max = 0;
//     } else {
//         max = T[0].id;
//         for (let i = 0; i < T.length; i++) {
//             if (T[i].id > max) {
//                 max = T[i].id;
//             }
//         }
//     }
//     return max + 1;
// }
// //*********************business Logics signup user**********/.
app.post("/api/user/signUp", multer({ storage: storageConfig }).single("img"), (req, res) => {
    //instructon
    Users.findOne({ email: req.body.email }).then((response) => {
        console.log("email", response);
        if (!response) {
            bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
                console.log("Here crypted pwd", cryptedPwd);
                req.body.pwd = cryptedPwd;
                if (req.file) {
                    req.body.path = `http://localhost:3000/shortCut/${req.file.filename}`
                } else {
                    req.body.path = `http://localhost:3000/shortCut/avatar.png`
                }
                let user = new Users(req.body);
                user.save();
                res.json({ isAdded: true });
            });
        } else {
            res.json({ isAdded: false });
        }
    });
});
// //*********************business Logics logIn**********/.
app.post("/api/user/logIn", (req, res) => {
    Users.findOne({ email: req.body.email }).then((response) => {
        console.log("here objecttt", response);
        console.log("here email", req.body.email)
        if (!response) {
            res.json({ msg: "check your email" });
        } else {
            bcrypt.compare(req.body.pwd, response.pwd).then((cryptedResult) => {
                console.log("cryptedResult", cryptedResult);
                if (!cryptedResult) {
                    res.json({ msg: "check your pwd" });
                } else {
                    let userToSend = {
                        role: response.role,
                        firstName: response.firstName,
                        lastName: response.lastName,
                        email: response.email,
                        id: response._id,
                    };
                    const token = jwt.sign(userToSend, secretKey, { expiresIn: "24h" });
                    res.json({ msg: 'welcome', user: token })
                    console.log("welcome",token);
                    
                }
            });
        }
    });
});


//business Logics: add course
app.post("/api/course", (req, res) => {
    //instructon
    console.log("here into BL:Add course", req.body);
    let course = new Course(req.body);
    course.save();
    res.json({ isAdded: true });
});

//business Logics: Edit course
app.put("/api/course", (req, res) => {
    //instruction
    console.log("here into BL:Edit course", req.body);
    Course.updateOne({ _id: req.body._id }, req.body).then((responseUpdate) => {
        console.log("responseUpdate", responseUpdate);
        if (responseUpdate.nModified == 1) {
            res.json({ isEdited: "success" });
        } else {
            res.json({ isEdited: "Echec" });
        }
    });
});

//business Logics: get all course
app.get("/api/course", (req, res) => {
    //instruction
    console.log("here into BL:Get All Course");
    Course.find().then((docs) => {
        res.json({ courses: docs });
    });
});
// business Logics : delete course by ID
app.delete("/api/course/:id", (req, res) => {
    //instruction
    console.log("Here into BL : delete course By id", req.params.id);
    Course.deleteOne({ _id: req.params.id }).then((responseDeleteOne) => {
        console.log("responseDeleteOne", responseDeleteOne);
        if (responseDeleteOne.deletedCount == 1) {
            res.json({ isDeleted: true });
        } else {
            res.json({ isDeleted: false });
        }
    });
});

//business Logics : get course by id
app.get("/api/course/:id", (req, res) => {
    console.log("here get course By id", req.params.id);
    Course.findById(req.params.id).then((doc) => {
        res.json({ course: doc });
    });
});

app.post("/api/course/search", (req, res) => {
    //instructon search
    console.log("here into BL:Add course", req.body);
    let courses = [];
    for (let i = 0; i < coursesTab.length; i++) {
        if (
            coursesTab[i].scoreOne == req.body.score1 ||
            coursesTab[i].scoreTwo == req.body.score2
        ) {
            courses.push(coursesTab[i]);
        }
    }
    res.json({ T: courses });
});

//business Logics: add teachers
app.post("/api/teacher", (req, res) => {
    //instructon
    console.log("here into BL:Add teacher", req.body);
    let teacher = new Teacher(req.body);
    teacher.save();
    res.json({ isAdded: true });
});
//business Logics: Edit teacher
app.put("/api/teacher", (req, res) => {
    //instruction
    console.log("here into BL:Edit teacher", req.body);
    Teacher.updateOne({ _id: req.params._idid }, req.body).then((update) => {
        console.log("update", update);
        if (update.nModified == 1) {
            res.json({ isEdited: "success" });
        } else {
            res.json({ isEdited: "echec" });
        }
    });
});

//business Logics: get all teacher
app.get("/api/teacher", (req, res) => {
    //instruction
    console.log("here into BL:Get All teacher");
    Teacher.find().then((response) => {
        res.json({ teachers: response });
    });
});
// business Logics : delete teacher by ID
app.delete("/api/teacher/:id", (req, res) => {
    //instruction
    console.log("Here into BL : delete teacher By id", req.params.id);
    Teacher.deleteOne({ _id: req.params.id }).then((response) => {
        console.log("delete", response);
        if (response.deletedCount == 1) {
            res.json({ isDeleted: true });
        } else {
            res.json({ isDeleted: false });
        }
    });
});
//business Logics : get teacher by id
app.get("/api/teacher/:id", (req, res) => {
    console.log("here get teacher By id", req.params.id);
    Teacher.findById(req.params.id).then((response) => {
        console.log("find b id", response);
        res.json({ teacher: response });
    });
});
app.post("/api/teacher/search", (req, res) => {
    //instructon
    console.log("here into BL:Add teacher", req.body);
    let teachers = [];
    for (let i = 0; i < teachersTab.length; i++) {
        if (
            teachersTab[i].name == req.body.Name ||
            teachersTab[i].speciality == req.body.speciality
        ) {
            teachers.push(teachersTab[i]);
        }
    }
    res.json({ T: teachers });
});

module.exports = app;