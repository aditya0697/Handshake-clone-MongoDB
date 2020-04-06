var Student = require('./../../models/student/StudentModel');

function handle_request(email, callback) {
    console.log("In createCourse kafka backend");
    Student.findOne({ "Email": email }, (error, student) => {
        if (error) {
            callback(error, error)
        }if(student) {
            console.log("Student: ", JSON.stringify(student));
            callback(null, student);
        }else{
            callback("student not found", "Student Not Found");
        }
    });
}

exports.handle_request = handle_request