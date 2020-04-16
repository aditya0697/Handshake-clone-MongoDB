var Conversation = require('./../../models/message/ConversationModel');


function handle_request(msg, callback) {
    console.log("In AddMEssageToConversation Kafka-backend", JSON.stringify(msg));
    if(!msg){
        callback(null,null);
        return;
    }


    const newChatMessage = {
        SenderId: msg.sender,
        MessageTime: new Date(),
        Message: msg.message,
    }

    console.log("msg: ", JSON.stringify(msg));

    Conversation.update({ _id: msg.conversationId }, { $push: { Messages: newChatMessage }, Time: new Date() }, (err, messageResult) => {
        if (err) {
            console.log("Conversations not found: ", err);
            callback(err, err)
        } else {
            console.log("newChatMessage is added!", messageResult);
            callback(null, messageResult);
        }
    })
}

exports.handle_request = handle_request; 