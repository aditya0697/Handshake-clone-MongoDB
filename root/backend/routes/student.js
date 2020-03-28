var express = require('express');
var router = express.Router();
var Student = require('./../models/student/StudentModel');
var StudentAuth = require('../models/student/StudentAuthModel');
var bcrypt = require("bcrypt");


var education_1 = {
  school: "San Jose State University",
  Major: "Computer Engineering",
  Level: "Masters",
  GradDate: new Date(),
  GPA: 3.58,
};

var experience_1 = {
  Employer: "Ultra Infotech",
  Title: "Software Developer",
  Description: "Hii there",
  StartDate: new Date(),
  EndDate: new Date,

};

const student_1 = {
  Email: "aditya0697@gmail.com",
  FirstName: "Aditya",
  LastName: "Patel",
  PhoneNumber: "4086809213",
  ProfileUrl: "",
  CareerObjective: "Hi there",
  Skills: [],
  Educations: [],
  Experiences: [],
}

/* GET users listing. */
router.post('/signup', function (req, res, next) {
  console.log("Inside Student Signup");
  var education = {
    school: req.body.school,
    Major: req.body.major,
    Level: req.body.level,
    GradDate: new Date(),
    GPA: req.body.gpa,
  };

  var newStudent = new Student({
    Email: req.body.email,
    FirstName: req.body.firstName,
    LastName: req.body.lastName,
    Educations: [education],
  });
  var newStudentAuth = new StudentAuth({
    Email: req.body.email,
    Password: bcrypt.hashSync(req.body.password, 10),
  })

  Student.findOne({ "Email": newStudent.Email }, (error, student) => {
    if (error) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      })
      res.end();
      return;
    }
    if (student) {
      console.log("Student: ", JSON.stringify(student));
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end("student already exists");
      return;
    }
    else {
      newStudent.save((error, studentData) => {
        if (error) {
          res.writeHead(500, {
            'Content-Type': 'text/plain'
          })
          res.end();
          return;
        }
        else {

          newStudentAuth.save((err, loginData) => {
            if (err) {
              res.writeHead(500, {
                'Content-Type': 'text/plain'
              })
              res.end();
              return;
            }
            else {
              console.log("studentData: ", JSON.stringify(studentData));
              console.log("loginData: ", JSON.stringify(loginData));
              res.writeHead(200, {
                'Content-Type': 'text/plain'
              })
              res.end(JSON.stringify(loginData));
              return;
            }
          })
        }
      });
    }

  });
});




module.exports = router;
