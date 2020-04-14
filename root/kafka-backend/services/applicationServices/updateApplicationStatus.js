var Application = require('./../../models/job/ApplicationModel');

function handle_request(msg, callback) {
    console.log("In Update student profile backend");
    console.log("msg: ",JSON.stringify(msg));
    if(!msg){
        callback("application not found null", "application Not Found");
        return;
    }
    Application.findOneAndUpdate({ "_id": msg.ApplicationId },{$set:{ "Status" : msg.Status}},{new: true, upsert: true, setDefaultsOnInsert: true}).exec((error, application) => {
        if (error) {
            callback(error,null)
        }if(application) {
            console.log("Application: ", JSON.stringify(application));
            callback(null, application);
        }else{
            callback("Application not found",null);
        }
    });
}

exports.handle_request = handle_request