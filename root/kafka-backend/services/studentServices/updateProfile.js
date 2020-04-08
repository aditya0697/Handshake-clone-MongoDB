var Student = require('./../../models/student/StudentModel');

function handle_request(msg, callback) {
    console.log("In Update student profile backend");
    console.log("msg: ",JSON.stringify(msg));
    if(!msg){
        callback("student not found", null);
        return;
    }
    Student.findOneAndUpdate({ "_id": msg._id },msg,{new: true, upsert: true, setDefaultsOnInsert: true}).exec((error, student) => {
        if (error) {
            callback("student not found", "Student Not Found");
        }if(student) {
            console.log("Student: ", JSON.stringify(student));
            callback(null, student);
        }else{
            callback("student not found ", "Student Not Found");
        }
    });
}

exports.handle_request = handle_request