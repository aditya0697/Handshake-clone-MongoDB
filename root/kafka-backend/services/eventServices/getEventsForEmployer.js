var Event = require('./../../models/event/EventModel');

function handle_request(msg, callback) {
    console.log("In Get Events for Employer kafka backend");
    const options = {
        page: msg.page,
        limit: msg.limit,
        sort : { EventDate: -1},

    };
    console.log("msg: ",JSON.stringify(msg));
    Event.paginate({ EmployerID: msg.employer_id,},options,function (err, result) {
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