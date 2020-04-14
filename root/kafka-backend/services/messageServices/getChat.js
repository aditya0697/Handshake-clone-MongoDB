var Message = require('./../../models/message/MessageModel');

function handle_request(msg, callback) {
    console.log("In Get Apllications for employer kafka backend");
    const options = {
        page: msg.page,
        limit: msg.limit,
    };
    console.log("msg: ", JSON.stringify(msg));
    Application.paginate({ "Job.EmployerID": msg.id, }, options, function (err, result) {
        if (err) {
            console.log("Error: ", err);
            callback(err, err)
        }
        else {
            console.log("Students found");
            callback(null, result);
        }
    });
}

exports.handle_request = handle_request;