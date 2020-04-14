var Conversation = require('./../../models/message/ConversationModel');


function handle_request(msg, callback) {
    console.log("In AddMEssageToConversation Kafka-backend");

    var sender = msg.sender;
    var reciever = msg.reciever;
    var message = msg.message;

    const newChatMessage = {
        SenderId: sender,
        MessageTime: new Date(),
        Message: message,
    }

    console.log("msg: ", JSON.stringify(msg));
    Conversation.update({"Persons.PersonId": [sender,reciever] } , {Messages: {$push: {newChatMessage}}}, function (err, result) {
        if (err) {
            console.log("Error: ", err);
            callback(err, err)
        }
        else {
            console.log("newChatMessage is added!");
            callback(null, result);
        }
    });
}

exports.handle_request = handle_request;