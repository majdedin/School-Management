//********************module importation**************************/
//import express module
const express = require("express");

//import body parser module
const bodyParser = require("body-parser");
//*********************Importation:mongoose***********************/
const mongoose = require("mongoose");
//EducationDB=>data base name
const cors = require("cors");

try {
  mongoose.connect("mongodb://127.0.0.1:27017/educationDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB connected");
} catch (err) {
  console.error(err.message);
  process.exit(1);
}

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://127.0.0.1:27017/educationDB";
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
app.use(cors());

//*********************Module d'Importation jsonwebtoken************************/
const jwt = require("jsonwebtoken");
//*********************Module d'Importation express-session************************/
const session = require("express-session");
//***********************importation multer******************************
const path = require("path");
const multer = require("multer");

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
app.use("/shortCut", express.static(path.join("backend/photos")));
const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storageConfig = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    if (isValid) {
      cb(null, "backend/photos");
    }
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + "-" + Date.now() + "-crococoder-" + "." + extension;
    cb(null, imgName);
  },
});
//************secret key configuration
const secretKey = "your secret key";
app.use(
  session({
    secret: "votre secret ici", // Remplacez par une clé secrète sécurisée
    resave: false, // Ne sauvegarde pas la session si elle n'a pas été modifiée
    saveUninitialized: false, // Ne sauvegarde pas les sessions non initialisées
    cookie: { secure: false }, // Changez 'secure' en true si vous utilisez HTTPS
  })
);

// //*********************Models Importation*************************/
const Course = require("./models/course");
const Teacher = require("./models/teacher");
const Users = require("./models/user");
const Student = require("./models/student");
const Parent = require("./models/parent");

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
app.post(
  "/api/user/signUp",
  multer({ storage: storageConfig }).single("img"),
  (req, res) => {
    //instructon
    Users.findOne({ email: req.body.email }).then((response) => {
      console.log("email", response);
      if (!response) {
        bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
          console.log("Here crypted pwd", cryptedPwd);
          req.body.pwd = cryptedPwd;
          if (req.file) {
            req.body.path = `http://localhost:3000/shortCut/${req.file.filename}`;
          } else {
            req.body.path = `http://localhost:3000/shortCut/avatar.png`;
          }
          let user = new Users(req.body);
          user.save();
          res.json({ isAdded: true });
        });
      } else {
        res.json({ isAdded: false });
      }
    });
  }
);
// //*********************business Logics logIn**********/.
app.post("/api/user/logIn", (req, res) => {
  Users.findOne({ email: req.body.email }).then((response) => {
    console.log("here objecttt", response);
    console.log("here email", req.body.email);
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
          res.json({ msg: "welcome", user: token });
          console.log("welcome", token);
        }
      });
    }
  });
});

//business Logics: add course
// Post route to add a new course
app.post("/api/courses", async (req, res) => {
  console.log("cours hiiii");
  try {
    const {
      title,
      description,
      price,
      duration,
      ageOfKids,
      totalSeats,
      teacherId,
    } = req.body;

    // Create a new course and associate it with the teacher
    const newCourse = new Course({
      title,
      description,
      price,
      duration,
      ageOfKids,
      totalSeats,
      teacher: teacherId, // Assign teacherId to the teacher field
    });

    await newCourse.save();
    res
      .status(201)
      .json({ message: "Course added successfully", course: newCourse });
  } catch (error) {
    res.status(500).json({ message: "Error adding course", error });
  }
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
app.get("/api/courses", (req, res) => {
  //instruction
  console.log("here into BL:Get All Course");
  Course.find().then((docs) => {
    res.json({ courses: docs });
  });
});
// business Logics : delete course by ID
app.delete("/api/courses/:id", (req, res) => {
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
app.get("/api/courses/:id", (req, res) => {
  console.log("here get course By id", req.params.id);
  Course.findById(req.params.id).then((doc) => {
    res.json({ course: doc });
  });
});

app.post("/api/courses/search", (req, res) => {
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
  Teacher.updateOne({ _id: req.body._id }, req.body).then((update) => {
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
//***************************************************************** Mariemmm*********************************************/
app.get("/api/user/profil/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // Recherchez l'utilisateur par ID
    const user = await Users.findById(id).select("-password"); // Exclut le mot de passe de la réponse

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
app.put("/api/user/profil/:id", async (req, res) => {
  try {
    const userId = req.params.id; // Récupérer l'ID depuis l'URL
    const updateData = req.body; // Récupérer les nouvelles données utilisateur envoyées depuis le frontend

    // Vérifiez si l'utilisateur est un enseignant (Teacher) ou un autre rôle
    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let updatedUser;

    // Mise à jour en fonction du rôle de l'utilisateur
    if (user.role === "teacher") {
      // Utilisez le modèle Teacher pour mettre à jour les champs spécifiques à un enseignant
      updatedUser = await mongoose
        .model("teacher")
        .findByIdAndUpdate(
          userId,
          {
            firstName: updateData.firstName,
            lastName: updateData.lastName,
            age: updateData.age,
            address: updateData.address,
            speciality: updateData.speciality, // Champ spécifique à Teacher
            experience: updateData.experience, // Champ spécifique à Teacher
          },
          { new: true, runValidators: true }
        )
        .select("-password");
    } else if (user.role === "student") {
      // Utilisez le modèle Student pour mettre à jour les champs spécifiques à un étudiant
      updatedUser = await mongoose
        .model("Student")
        .findByIdAndUpdate(userId, updateData, {
          new: true,
          runValidators: true,
        })
        .select("-password");
    } else {
      // Sinon, mettre à jour l'utilisateur générique
      updatedUser = await Users.findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true,
      }).select("-password");
    }

    // Renvoie l'utilisateur mis à jour
    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.post("/api/students/", async (req, res) => {
  console.log("Here into BL: Add student", req.body);
  try {
    const { firstName, lastName, age, address, grade, parentId } = req.body;

    // Create the new student
    const newStudent = new Student({
      firstName,
      lastName,
      age,
      address,
      grade,
    });

    await newStudent.save();

    // If a parent is assigned, update the parent's children array
    if (parentId) {
      await Parent.findByIdAndUpdate(parentId, {
        $push: { children: newStudent._id },
      });
    }

    res
      .status(201)
      .json({ message: "Student added successfully", student: newStudent });
  } catch (error) {
    res.status(500).json({ message: "Error adding student", error });
  }
});
// Update a student
app.put("/api/students/:_id", (req, res) => {
  console.log("here into BL:Edit student", req.body);
  Student.updateOne({ _id: req.params._id }, req.body).then((update) => {
    console.log("update", update);
    if (update.nModified == 1) {
      res.json({ isEdited: "success" });
    } else {
      res.json({ isEdited: "echec" });
    }
  });
});

// Get all students
app.get("/api/students/", (req, res) => {
  console.log("here into BL:Get All students");
  Student.find().then((response) => {
    res.json({ students: response });
  });
});

// Delete a student by ID
app.delete("/api/students/:id", (req, res) => {
  console.log("Here into BL : delete student By id", req.params.id);
  Student.deleteOne({ _id: req.params.id }).then((response) => {
    console.log("delete", response);
    if (response.deletedCount == 1) {
      res.json({ isDeleted: true });
    } else {
      res.json({ isDeleted: false });
    }
  });
});

// Get student by ID
app.get("/api/students/:id", (req, res) => {
  console.log("here get student By id", req.params.id);
  Student.findById(req.params.id).then((response) => {
    console.log("find by id", response);
    res.json({ student: response });
  });
});

app.post("/api/parents/", async (req, res) => {
  console.log("Here into BL: Add parent", req.body);
  try {
    const newParent = new Parent(req.body);
    await newParent.save();
    res
      .status(201)
      .json({ message: "Parent added successfully", parent: newParent });
  } catch (error) {
    res.status(500).json({ message: "Error adding parent", error });
  }
});
// Update a parent
app.put("/api/parents/:_id", (req, res) => {
  console.log("here into BL:Edit parent", req.body);
  Parent.updateOne({ _id: req.params._id }, req.body).then((update) => {
    console.log("update", update);
    if (update.nModified == 1) {
      res.json({ isEdited: "success" });
    } else {
      res.json({ isEdited: "echec" });
    }
  });
});

// Get all parents
app.get("/api/parents/", (req, res) => {
  console.log("here into BL:Get All parents");
  Parent.find().then((response) => {
    res.json({ parents: response });
  });
});

// Delete a parent by ID
app.delete("/api/parents/:id", (req, res) => {
  console.log("Here into BL : delete parent By id", req.params.id);
  Parent.deleteOne({ _id: req.params.id }).then((response) => {
    console.log("delete", response);
    if (response.deletedCount == 1) {
      res.json({ isDeleted: true });
    } else {
      res.json({ isDeleted: false });
    }
  });
});

// Get parent by ID
app.get("/api/parents/:id", (req, res) => {
  console.log("here get parent By id", req.params.id);
  Parent.findById(req.params.id).then((response) => {
    console.log("find by id", response);
    res.json({ parent: response });
  });
});

// Fetch students enrolled in a specific course
app.get("/api/students/courses/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;

    // Find students where the `courses` array contains the specified `courseId`
    const students = await Student.find({
      courses: { $in: [courseId] },
    }).populate("courses", "title");

    if (!students.length) {
      return res
        .status(404)
        .json({ message: "No students found for this course" });
    }

    res.status(200).json({ students });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching students", error });
  }
});

// API to enroll a student in a course
app.put("/api/students/:studentId/enroll", async (req, res) => {
  const { studentId } = req.params;
  const { courseId } = req.body; // Get the courseId from the request body
  console.log("hiiiii");
  try {
    // Find the student and update the courses array
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { $addToSet: { courses: courseId } }, // Add courseId to courses array
      { new: true } // Return the updated document
    );
    // 2. Find the course and add the student to the course's students array
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $addToSet: { students: studentId } }, // Add studentId to the course's students array
      { new: true } // Return the updated document
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res
      .status(200)
      .json({ message: "Student enrolled in course", student: updatedStudent });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error enrolling student in course", error });
  }
});
// API to allow teachers to add courses
app.post("/api/teacher/:teacherId/courses", async (req, res) => {
  try {
    console.log("hhhhhhhhhh");
    const { teacherId } = req.params;
    const newCourse = new Course({
      ...req.body,
      teacher: teacherId,
    });
    await newCourse.save();
    res
      .status(201)
      .json({ message: "Course added successfully", course: newCourse });
  } catch (error) {
    res.status(500).json({ message: "Error adding course", error });
  }
});
// API to get all courses added by a specific teacher
app.get("/api/teacher/:teacherId/courses", async (req, res) => {
  try {
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    const { teacherId } = req.params;
    const courses = await Course.find({ teacher: teacherId }).populate(
      "firstName lastName"
    );

    if (!courses.length) {
      return res
        .status(404)
        .json({ message: "No courses found for this teacher" });
    }

    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
});

// API to get students enrolled in a specific course
app.get("/api/courses/:courseId/students", async (req, res) => {
  try {
    const { courseId } = req.params;

    // Find students enrolled in the given course and populate their grades for this course
    const students = await Student.find({ courses: courseId }).populate({
      path: "grades",
      select: "title",
    });

    if (!students.length) {
      return res
        .status(404)
        .json({ message: "No students found for this course" });
    }

    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
});

// API to assign a grade to a student for a specific course
app.put(
  "/api/courses/students/:courseId/:studentId/grade",
  async (req, res) => {
    try {
      console.log("heeeerrree");
      const { courseId, studentId } = req.params;
      const { grade } = req.body;

      // Find the student and update their grade for the course
      const student = await Student.findById(studentId);
      const courseGrade = student.grades.find(
        (g) => g.course.toString() === courseId
      );

      if (courseGrade) {
        courseGrade.grade = grade; // Update grade
      } else {
        student.grades.push({ course: courseId, grade });
      }

      await student.save();
      res.status(200).json({ message: "Grade updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating grade", error });
    }
  }
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(3000, () => {
  console.log("Le serveur écoute sur le port 3000");
});
module.exports = app;
