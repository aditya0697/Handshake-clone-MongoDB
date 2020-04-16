import {REGISTER_FOR_EVENT, GET_REGISTRATIONS, ADD_REGISTRATION}  from './../actionTypes';
import update from 'react-addons-update'; // ES6

const initialState = {
    registrations: [],
};

const registrationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REGISTRATIONS:
            console.log("Details Payload:")
            console.log(action.payload)
            return {
                ...state,
                registrations: action.payload.docs,
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
        case REGISTER_FOR_EVENT:
            return{
                ...state,
                registration_error: action.payload,
            }
        case ADD_REGISTRATION:
            console.log("Payload in ADD_APPLICATION: " + JSON.stringify(action.payload));
            if (action.payload == "Rigistrations already exists"){
                return{
                    ...state,
                    registration_error: action.payload,
                }
            }
            return update(state, {
                registrations:  { $push: [action.payload] }
            });
        default:
            return state;
    }
}

export default registrationsReducer;

