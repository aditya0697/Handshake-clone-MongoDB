import { ADD_EVENT, UPDATE_EVENT,GET_EVENTS}  from './../actionTypes';
import update from 'react-addons-update'; // ES6

const initialState = {
};

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EVENTS:
            console.log("Details Payload:")
            console.log(action.payload)
            return {
                ...state,
                eventData: {
                    events: action.payload
                }
            }
        case ADD_EVENT:
            console.log("Payload in ADD_EVENT: " + JSON.stringify(action.payload));
            return update(state, {
                eventData: {
                    events: { $push: [action.payload] }
                }
            });

        case UPDATE_EVENT:
            console.log("action id :", JSON.stringify(action.payload));
            // console.log(action.payload.education)
            return update(state, {
                eventData: {
                    events: {
                        [action.payload.index]: { $set: action.payload.event }
                    }
                }
            });

        default:
            return state;
    }
}

export default eventReducer;

