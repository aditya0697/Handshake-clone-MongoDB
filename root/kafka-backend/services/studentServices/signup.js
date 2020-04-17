var Student = require('./../../models/student/StudentModel');
var StudentAuth = require('./../../models/student/StudentAuthModel');
var bcrypt = require("bcrypt");

function handle_request(msg, callback) {
    console.log("In createCourse kafka backend");
    if(!msg.password){
        callback("No Password", "no password");
        return;
    }
    var education = {
        School: msg.school,
        Major: msg.major,
        Level: msg.level,
        GradDate: new Date(),
        GPA: msg.gpa,
    };

    var newStudent = new Student({
        Email: msg.email,
        FirstName: msg.firstName,
        LastName: msg.lastName,
        Educations: [education],
    });
    var newStudentAuth = new StudentAuth({
        Email: msg.email,
        Password: bcrypt.hashSync(msg.password, 10),
    })

    Student.findOne({ "Email": newStudent.Email }, (error, student) => {
        if (error) {
            callback(error, error)
        }
        if (student) {
            console.log("Student: ", JSON.stringify(student));
            callback("Student already exists", "Student already exists");
        }
        else {
            newStudent.save((error, studentData) => {
                if (error) {
                    callback(error, error)
                }
                else {
                    newStudentAuth.save((err, loginData) => {
                        if (err) {
                            callback(err, err)
                        }
                        else {
                            console.log("signup successful");
                            callback(null, loginData);
                        }
                    })
                }
            });
        }
    });
}

exports.handle_request = handle_request;