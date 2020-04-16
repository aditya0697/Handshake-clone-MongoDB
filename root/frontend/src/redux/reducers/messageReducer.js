import { GET_CONVERSATIONS, ADD_MESSAGE_TO_CONVERSATION, CREATE_CONVERSATION}  from './../actionTypes';
import update from 'react-addons-update'; // ES6

const initialState = {
};

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CONVERSATIONS:
            console.log("Details Payload:")
            console.log(action.payload)
            return {
                ...state,
                messages: action.payload.docs,
                totalDocs: action.payload.totalDocs,
                limit: action.payload.limit,
                totalPages: action.payload.totalPages,
                page: action.payload.page,
                pagingCounter: action.payload.pagingCounter,
                hasPrevPage: action.payload.hasPrevPage,
                hasNextPage: action.payload.hasNextPage,
                prevPage: action.payload.prevPage,
                nextPage: action.payload.nextPage,
            }
        case ADD_MESSAGE_TO_CONVERSATION:
            console.log("ADD_MESSAGE_TO_CONVERSATION", JSON.stringify(action.payload));
            return update(state, {
                messages: {
                        [action.payload.index]: { 
                            Messages: { $push: [action.payload.message] }
                        }
                }
            });
        case CREATE_CONVERSATION:
            console.log("Payload in ADD_APPLICATION: " + JSON.stringify(action.payload));
            // return state;
            return {
                ...state,
                messages:  [action.payload, ...state.messages] 
            };
        default:
            return state;
    }
}

export default messageReducer;

