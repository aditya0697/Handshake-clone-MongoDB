var Registrations = require('./../../models/event/RegistrationModel');

function handle_request(msg, callback) {
    console.log("In Get Events for Employer kafka backend");
    const options = {
        page: msg.page,
        limit: msg.limit,
        // sort : { "Event.EventDate": -1},

    };
    console.log("msg: ",JSON.stringify(msg));
    Registrations.paginate({ "Student._id": msg.student_id},options,function (err, result) {
        if (err) {
            console.log("Error: ",err);
            callback(err, err)
        }
        else {
            console.log("Events found");
            callback(null, result);
        }
    });
}

exports.handle_request = handle_request;