var Application = require('./../../models/job/ApplicationModel');

function handle_request(msg, callback) {
    console.log("In createCourse kafka backend");
    if (!msg.Job._id) {
        console.log("Job in application: ",JSON.stringify(msg.Job));
        callback("No Job", "no Job");
        return;
    }
    
    console.log("Application data",JSON.stringify(msg))
    var newApplication = new Application({
        Job: msg.Job, 
        Student: msg.Student,
        ResumeURL: msg.ResumeURL,
        Status: msg.Status,
    });
    Application.findOne({"Student._id": newApplication.StudentID, "Job._id":newApplication.Job._id},(err, application) => {
        if (err) {
            console.log("Error In Application find");
            callback(null, null)
            return;
        }
        if(application){
            // callback("Application already exists", null)
            console.log("Error In Application already exists");
            callback(null, null)
            // callback("error":"Application already exists"})
            return;
        }else{
            newApplication.save((error, applicationData) => {
                if (error) {
                    console.log("Error In Application saving",error);
                    callback(null, null)
                    // callback("Application already exists", null)
                    return;
                }
                else {
                    console.log("creation of application is successful");
                    callback("Succeful", applicationData);
                    return;
                }
            });
        }
    });
}

exports.handle_request = handle_request;