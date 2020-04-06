var Student = require('./../../models/student/StudentModel');
var StudentAuth = require('./../../models/student/StudentAuthModel');
var bcrypt = require("bcrypt");


function handle_request(msg, callback) {
    console.log("In student signin kafka backend");
    var studentAuth = new StudentAuth({
        Email: msg.email,
        Password: bcrypt.hashSync(msg.password, 10),
    })

    StudentAuth.findOne({ "Email": studentAuth.Email }, (error, student) => {
        if (error) {
            callback(error, error)
        }
        if (student) {
            if (bcrypt.compareSync(password, result.password)) {
                console.log("password matched")
                console.log("Student: ", JSON.stringify(student));
                callback(null, student);
            }
            console.log("password not matched");
            callback("Password is incorrect !", "Password is incorrect !");
        }
    });
}

exports.handle_request = handle_request;