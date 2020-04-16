var Registrations = require('./../../models/event/RegistrationModel');

function handle_request(msg, callback) {
    console.log("In createCourse kafka backend");
    if (!msg.Event._id) {
        console.log("Event in Registrations: ",JSON.stringify(msg.Job));
        callback("No Event", "no Event");
        return;
    }
    
    console.log("Registrations data",JSON.stringify(msg))
    var newRegistration = new Registrations({
        Event: msg.Event, 
        Student: msg.Student,
    });
    Registrations.findOne({"Student._id": newRegistration.Student._id, "Event._id": newRegistration.Event._id},(err, registrations) => {
        if (err) {
            console.log("Error In registrations find");
            callback(null, null)
            return;
        }
        if(registrations){
            // callback("Application already exists", null)
            console.log("Error In registrations already exists");
            callback(null, null)
            // callback("error":"Application already exists"}) 
            return;
        }else{
            newRegistration.save((error, registrationData) => {
                if (error) {
                    console.log("Error In registrations saving",error);
                    callback(null, null)
                    // callback("Application already exists", null)
                    return;
                }
                else {
                    console.log("creation of registrations is successful");
                    callback("Succeful", registrationData);
                    return;
                }
            });
        }
    });
}

exports.handle_request = handle_request;