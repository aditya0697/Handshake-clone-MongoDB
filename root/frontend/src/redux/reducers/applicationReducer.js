import { ADD_APPLICATION, UPDATE_APPLICATION,GET_APPLICATIONS, APPLY}  from './../actionTypes';
import update from 'react-addons-update'; // ES6

const initialState = {
};

const applicationReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_APPLICATIONS:
            console.log("Details Payload:")
            console.log(action.payload)
            return {
                ...state,
                applicationData: action.payload.docs,
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
        case APPLY:
            return{
                ...state,
                apply_error: action.payload,
            }
        case ADD_APPLICATION:
            console.log("Payload in ADD_APPLICATION: " + JSON.stringify(action.payload));
            if (action.payload == "Application already exists"){
                return{
                    ...state,
                    apply_error: action.payload,
                }
            }
            return update(state, {
                applicationData:  { $push: [action.payload] }
            });

        case UPDATE_APPLICATION:
            console.log("action id :", JSON.stringify(action.payload));
            // console.log(action.payload.education)
            return update(state, {
                applicationData: {
                        [action.payload.index]: { $set: action.payload.job }
                }
            });

        default:
            return state;
    }
}

export default applicationReducer;

