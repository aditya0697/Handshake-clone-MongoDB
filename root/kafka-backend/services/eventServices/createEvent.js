var Event = require('./../../models/event/EventModel');

function handle_request(msg, callback) {
    console.log("In createCourse kafka backend");
    if (!msg) {
        callback("No Event", "no Event");
        return;
    }

    var newEvent = new Event({
        EmployerID: msg.EmployerID,
        EmployerName: msg.EmployerName,
        EventName: msg.EventName,
        EmployerProfileUrl: msg.EmployerProfileUrl,
        Majors: msg.Majors,
        EventDate: msg.EventDate,
        Address: msg.Address,
        Description: msg.Description
    });

    newEvent.save((error, eventData) => {
        if (error) {
            callback(error, error)
        }
        else {
            console.log("creation of event is successful");
            callback(null, eventData);
        }
    });
}

exports.handle_request = handle_request;