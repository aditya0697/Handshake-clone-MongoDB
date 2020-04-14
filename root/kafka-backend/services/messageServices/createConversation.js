var Conversation = require('./../../models/message/ConversationModel');
var Message = require('./../../models/message/MessageModel');


function handle_request(msg, callback) {
    console.log("In Get Apllications for employer kafka backend");
    var sender = msg.sender;
    var reciever = msg.reciever;
    var message = msg.message;


    console.log("msg: ", JSON.stringify(msg));

    // const newMessageForSender = new Message({
    //     PersonId: sender._id,
    //     ConversationIds: [],
    // });
    // const newMessageForReciever = new Message({
    //     PersonId: reciever._id,
    //     ConversationIds: [],
    // });
    const newChatMessage = {
        SenderId: sender.PersonId,
        MessageTime: new Date(),
        Message: message,
    }
    const person_1 = {
        PersonType: sender.PersonType,
        Name: sender.Name,
        PersonProfileUrl: sender.PersonProfileUrl,
        PersonId: sender.PersonId,
    };

    const person_2 = {
        PersonType: reciever.PersonType,
        Name: reciever.Name, 
        PersonProfileUrl: reciever.PersonProfileUrl,
        PersonId: reciever.PersonId,
    };
    const newConversation = new Conversation({
        Persons: [person_1,person_2],
        Time: new Date(),
        Messages: [newChatMessage],
    });

    Conversation.findOne({"Persons.PersonId": [person_1.PersonId,person_2.PersonID] }, (err, conversation) => {
        if(err){
            console.log("Error in finding conversations",err);
            callback(err,null);
        }
        else if(conversation){
            console.log("conversation already exists!!",conversation);
            callback(null, conversation);
        }
        else{
            newConversation.save((err,result)=>{
                if(err){
                    console.log("Error in saving conversations",err);
                    callback(err,null);
                }else{
                    console.log("Conversation saved successfully!",result);
                    callback(null,result);
                }
            });
        }
    });
    
    
}

exports.handle_request = handle_request;