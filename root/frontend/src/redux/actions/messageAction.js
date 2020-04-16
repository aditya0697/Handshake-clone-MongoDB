import axios from "axios";
import { HOST_URL , ENDPOINT} from "./../../config/config";
import { GET_CONVERSATIONS, CREATE_CONVERSATION, ADD_MESSAGE_TO_CONVERSATION } from './../actionTypes';
import io from "socket.io-client";

const ROOT_URL = HOST_URL + "message";

let socket;

export const getConversations = (user, messageData, page, limit) => dispatch => {
    // socket = io(ENDPOINT);
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        }
    }
    if (!page) {
        page = 1;
    }
    if (!limit) {
        limit = 5;
    }
    if (messageData) {
        if (page > messageData.totalPages) {
            page = 1
        }
    }

    axios.get(`${ROOT_URL}/get_convesations?PersonId=${user.id}&page=${page}&limit=${limit}`, config)
        .then(response => {
            if (response.status === 200) {
                // console.log("Conversations : " + JSON.stringify(response.data))
                dispatch({
                    type: GET_CONVERSATIONS,
                    payload: response.data,
                });
            }
        }, error => {
            console.log("Conversations  not found: " + JSON.stringify(error));
        }).catch(err => { console.log(err) });

}

export const sendMessage = (senderId, recieverId, conversationId, message, index) => dispatch => {
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        }
    };
    const newMessageObj = {
        message : {
            SenderId: senderId,
            MessageTime: new Date(),
            Message: message,
        },
        "index": index,
    };
    
    const data = {
        sender: senderId,
        reciever: recieverId,
        conversationId: conversationId,
        message: message,
    };
    console.log("Data change status: ",JSON.stringify(data));
    axios.post(`${ROOT_URL}/add_message_to_conversation`, data, config)
        .then(response => {
            if (response.status === 200) {
                console.log("Message added to conversation : " + JSON.stringify(response.data))
                dispatch({
                    type: ADD_MESSAGE_TO_CONVERSATION,
                    payload: newMessageObj,
                });
            }
        }, error => {
            console.log("Message was not added" + JSON.stringify(error));
        }).catch(err => { console.log(err) });

}

export const createConversation = (user, student, userName, userProfileUrl) => dispatch => {
    const data = {
        "reciever": {
            "PersonType": "student",
            "Name": student.FirstName +" "+ student.LastName,
            "PersonProfileUrl": student.ProfileUrl,
            "PersonId": student._id
        },
        "sender": {
            "PersonType": user.user_type,
            "Name": userName,
            "PersonProfileUrl": userProfileUrl,
            "PersonId": user.id,
        },
        message :"",
    }

    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        }
    };
    axios.post(`${ROOT_URL}/create_conversation`, data, config)
        .then(response => {
            if (response.status === 200) {
                console.log("Message added to conversation : " + JSON.stringify(response.data))
                dispatch({
                    type: CREATE_CONVERSATION,
                    payload: response.data,
                });
            }
        }, error => {
            console.log("Message was not added" + JSON.stringify(error));
        }).catch(err => { console.log(err) });
}



