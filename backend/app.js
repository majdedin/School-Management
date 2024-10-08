//********************module importation**************************/
//import express module
const express = require("express");

//import body parser module
const bodyParser = require("body-parser");
///import bib FS
const fs = require("fs");
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

app.get("/static-images/:filename", (req, res) => {
  const filename = req.params.filename;
  const uploadsDir = path.join(__dirname, "backend/uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  fs.access(resolvedFilePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`File not found: ${resolvedFilePath}`);
      return res.status(404).send("Image not found");
    }
    res.sendFile(resolvedFilePath);
  });
});

// Configuring multer disk storage

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
// Multer setup to accept image and PDF files

// Signup route to handle user registration

const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "application/pdf": "pdf",
};

// Directory for file uploads
const uploadDirectory = path.join(__dirname, "uploads");

// Check if the directory exists, if not create it
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

app.use("/uploads", express.static(path.join("uploads")));
// Update the storage configuration for multer
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    if (isValid) {
      cb(null, uploadDirectory); // Save both PDFs and images in the same folder
    } else {
      cb(new Error("Invalid MIME type"), false);
    }
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    const fileName = name + "-" + Date.now() + "-crococoder." + extension;
    cb(null, fileName);
  },
});
const upload = multer({ storage: storageConfig });

app.post(
  "/api/user/signUp",
  upload.fields([
    { name: "img", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      console.log(req.body);
      const { firstName, lastName, age, email, role, phone, childPhone } =
        req.body;

      // Check if the user already exists
      const existingUser = await Users.findOne({ email });
      if (existingUser) {
        return res.json({ isAdded: false, message: "Email already exists" });
      }

      // Hash the password
      let hashedPwd = await bcrypt.hash(req.body.pwd, 10);
      req.body.pwd = hashedPwd;

      // Handle file uploads (both image and PDF)
      if (req.files) {
        if (req.files["img"]) {
          req.body.path = `http://localhost:3000/uploads/${req.files["img"][0].filename}`;
        }
        if (req.files["pdf"]) {
          req.body.resume = `http://localhost:3000/uploads/${req.files["pdf"][0].filename}`;
        }
      }

      // If role is 'parent', validate the child's phone number
      if (role === "parent") {
        const child = await Users.findOne({
          phone: childPhone,
          role: "student",
        });
        if (!child) {
          console.log("Child not found");
          return res.json({ isAdded: false, message: "Child not found" });
        }
        req.body.children = [child._id]; // Link parent to child
      }

      // Create the new user
      const newUser = new Users(req.body);
      await newUser.save();

      res.json({ isAdded: true, message: "User added successfully" });
    } catch (error) {
      console.error("Error signing up:", error);
      res
        .status(500)
        .json({ isAdded: false, message: "Error signing up", error });
    }
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
app.put("/api/courses", (req, res) => {
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

app.post("/api/teacher", async (req, res) => {
  try {
    console.log("Here into BL: Add teacher", req.body);

    const {
      firstName,
      lastName,
      age,
      address,
      email,
      password,
      speciality,
      experience,
    } = req.body;

    // Check if the teacher with the same email already exists
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.json({ isAdded: false, message: "Email already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new teacher object
    const newTeacher = new Teacher({
      firstName,
      lastName,
      age,
      address,
      email,
      pwd: hashedPassword, // Store the hashed password
      speciality,
      experience,
    });

    // Save the teacher to the database
    await newTeacher.save();

    res
      .status(201)
      .json({ isAdded: true, message: "Teacher added successfully" });
  } catch (error) {
    console.error("Error adding teacher:", error);
    res
      .status(500)
      .json({ isAdded: false, message: "Error adding teacher", error });
  }
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
app.put(
  "/api/user/profil/:id",
  multer({ storage: storageConfig }).fields([
    { name: "img", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const userId = req.params.id;
      const updateData = req.body;

      // Fetch the existing user
      const user = await Users.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Preserve previous values if no new files are uploaded
      updateData.path = user.path; // Keep the old image if no new image
      updateData.resume = user.resume; // Keep the old resume if no new PDF

      // Check for uploaded files and update only if new ones are present
      if (req.files) {
        if (req.files["img"]) {
          updateData.path = `http://localhost:3000/uploads/${req.files["img"][0].filename}`;
        }
        if (req.files["pdf"]) {
          updateData.resume = `http://localhost:3000/uploads/${req.files["pdf"][0].filename}`;
        }
      }

      let updatedUser;

      // Update based on the user role
      if (user.role === "teacher") {
        // Update Teacher specific fields
        updatedUser = await mongoose
          .model("teacher")
          .findByIdAndUpdate(
            userId,
            {
              firstName: updateData.firstName || user.firstName,
              lastName: updateData.lastName || user.lastName,
              age: updateData.age || user.age,
              address: updateData.address || user.address,
              phone: updateData.phone || user.phone,
              path: updateData.path,
              resume: updateData.resume,
              speciality: updateData.speciality || user.speciality,
              experience: updateData.experience || user.experience,
            },
            { new: true, runValidators: true }
          )
          .select("-password");
      } else if (user.role === "student") {
        // Update Student specific fields
        updatedUser = await mongoose
          .model("student")
          .findByIdAndUpdate(
            userId,
            {
              firstName: updateData.firstName || user.firstName,
              lastName: updateData.lastName || user.lastName,
              age: updateData.age || user.age,
              address: updateData.address || user.address,
              phone: updateData.phone || user.phone,
            },
            { new: true, runValidators: true }
          )
          .select("-password");
      } else {
        // Generic user update
        updatedUser = await Users.findByIdAndUpdate(
          userId,
          {
            firstName: updateData.firstName || user.firstName,
            lastName: updateData.lastName || user.lastName,
            age: updateData.age || user.age,
            address: updateData.address || user.address,
            phone: updateData.phone || user.phone,
            path: updateData.path,
            resume: updateData.resume,
          },
          { new: true, runValidators: true }
        ).select("-password");
      }

      // Send the updated user response
      res.status(200).json({
        message: "Profile updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }
);

app.post("/api/students/", async (req, res) => {
  console.log("Here into BL: Add student", req.body);
  try {
    const { firstName, lastName, age, address, parentId, email, pwd } =
      req.body;

    // Check if the student email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    // Create the new student
    const newStudent = new Student({
      firstName,
      lastName,
      age,
      address,

      email,
      pwd: hashedPwd,
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
    const { email, password, firstName, lastName, address } = req.body;

    // Check if parent with the email already exists
    const existingParent = await Parent.findOne({ email });
    if (existingParent) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10);

    // Create the new parent
    const newParent = new Parent({
      firstName,
      lastName,
      email,
      address,
      pwd: hashedPwd, // Save the hashed password
    });

    await newParent.save();
    res
      .status(201)
      .json({ message: "Parent added successfully", parent: newParent });
  } catch (error) {
    console.log(error);
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
      console.log(req.body);
      console.log("heeeerrree");
      const { courseId, studentId } = req.params;
      const { gradeData } = req.body;

      // Find the student and update their grade for the course
      const student = await Student.findById(studentId);
      const courseGrade = student.grades.find(
        (g) => g.course.toString() === courseId
      );

      if (courseGrade) {
        courseGrade.grade = gradeData.grade;
        courseGrade.evaluation = gradeData.evaluation;
      } else {
        student.grades.push({
          course: courseId,
          grade: gradeData.grade,
          evaluation: gradeData.evaluation,
        });
      }

      await student.save();
      res.status(200).json({ message: "Grade updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating grade", error });
    }
  }
);
app.get("/api/students/students/:studentId/courses", async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findById(studentId)
      .populate("courses", "title description price duration")
      .populate({
        path: "grades",
        select: "title",
      });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      courses: student.courses,
      grades: student.grades,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching student courses and grades", error });
  }
});

// GET: Fetch children for a specific parent
app.get("/api/parents/:parentId/children", async (req, res) => {
  const { parentId } = req.params;
  try {
    // Fetch parent and populate children, courses, and grades
    const parent = await Parent.findById(parentId)
      .populate({
        path: "children",
        populate: {
          path: "courses",
          select: "title description duration teacher",
        },
      })

      .populate({
        path: "children",
        populate: { path: "grades.course", select: "title" },
      });

    if (!parent) {
      return res.status(404).json({ message: "Parent not found" });
    }

    res.status(200).json({ children: parent.children });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching children", error });
  }
});

// API to validate a teacher
app.put("/api/teacher/:id/validate", async (req, res) => {
  try {
    const teacherId = req.params.id;

    // Find the teacher and update their status
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      { status: "validated" }, // Update status to validated
      { new: true } // Return the updated document
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({
      message: "Teacher validated successfully",
      teacher: updatedTeacher,
    });
  } catch (error) {
    res.status(500).json({ message: "Error validating teacher", error });
  }
});
app.get("/api/parents/child/:phone", async (req, res) => {
  try {
    const phone = req.params.phone;

    // Find the child by phone number, populate course details in grades
    const child = await Users.findOne({ phone, role: "student" })
      .populate({
        path: "grades.course", // Populate course within grades
      })
      .populate({
        path: "courses", // Populate course within grades
      });

    if (!child) {
      return res.status(404).json({ message: "Child not found" });
    }

    // Return the child details and their courses
    res.status(200).json({ child });
  } catch (error) {
    console.error("Error fetching child:", error);
    res.status(500).json({ message: "Server error", error });
  }
});
// Get all courses with teacher information
app.get("/api/courses-with-teachers", async (req, res) => {
  try {
    // Fetch all courses and populate the teacher field
    const courses = await Course.find().populate("teacher");

    if (!courses) {
      return res.status(404).json({ message: "No courses found" });
    }

    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

app.listen(3000, () => {
  console.log(`Server running on port ${3000}`);
});

module.exports = app;
