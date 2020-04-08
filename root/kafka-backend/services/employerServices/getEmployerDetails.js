var Employer = require('./../../models/employer/EmployerModel');

function handle_request(email, callback) {
    console.log("In Employer details kafka backend");
    Employer.findOne({ "Email": email }, (error, employer) => {
        if (error) {
            callback(error, error)
        }if(employer) {
            console.log("Employer: ", JSON.stringify(employer));
            callback(null, employer);
        }else{
            callback("Employer not found", "Student Not Found");
        }
    });
}

exports.handle_request = handle_request