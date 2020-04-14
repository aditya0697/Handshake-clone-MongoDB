var Convesation = require('./../../models/message/ConversationModel');

function handle_request(msg, callback) {
    console.log("In Get Convesation for employer kafka backend");
    console.log("Data: ",JSON.stringify(msg));
    const options = {
        page: msg.page,
        limit: msg.limit,
        sort : { Time:-1},
    };
    console.log("msg: ", JSON.stringify(msg));
    Convesation.paginate({ "Persons.PersonId": msg.PersonId}, options, function (err, result) {
        if (err) {
            console.log("Error: ", err);
            callback(err, err)
        }
        else {
            console.log("Convesation found");
            callback(null, result);
        }
    });
} 

exports.handle_request = handle_request;