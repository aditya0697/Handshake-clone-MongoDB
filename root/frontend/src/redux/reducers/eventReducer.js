import { ADD_EVENT, UPDATE_EVENT, GET_EVENTS } from './../actionTypes';
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
                events: action.payload.docs,
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
        case ADD_EVENT:
            console.log("Payload in ADD_EVENT: " + JSON.stringify(action.payload));
            return update(state, {
                events: { $push: [action.payload] }
            });
        case UPDATE_EVENT:
            console.log("action id :", JSON.stringify(action.payload));
            // console.log(action.payload.education)
            return update(state, {
                events: {
                    [action.payload.index]: { $set: action.payload.event }
                }
            });

        default:
            return state;
    }
}

export default eventReducer;

