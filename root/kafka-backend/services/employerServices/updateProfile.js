var Employer = require('./../../models/employer/EmployerModel');

function handle_request(msg, callback) {
    console.log("In Update student profile backend");
    console.log("msg: ",JSON.stringify(msg));
    if(!msg){
        callback("Employer not found null", "Employer Not Found");
        return;
    }
    Employer.findOneAndUpdate({ "_id": msg._id },msg,{new: true, upsert: true, setDefaultsOnInsert: true}).exec((error, employer) => {
        if (error) {
            callback(error, error)
        }if(employer) {
            console.log("Employer: ", JSON.stringify(employer));
            callback(null, employer);
        }else{
            callback("Employer not found", "Employer Not Found");
        }
    });
}

exports.handle_request = handle_request