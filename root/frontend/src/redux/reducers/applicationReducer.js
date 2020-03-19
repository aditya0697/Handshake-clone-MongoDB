import { ADD_APPLICATION, UPDATE_APPLICATION,GET_APPLICATIONS}  from './../actionTypes';
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
                applicationData: {
                    applications: action.payload
                }
            }
        case ADD_APPLICATION:
            console.log("Payload in ADD_EXPERIENCE: " + JSON.stringify(action.payload));
            return update(state, {
                applicationData: {
                    applications: { $push: [action.payload] }
                }
            });

        case UPDATE_APPLICATION:
            console.log("action id :", JSON.stringify(action.payload));
            // console.log(action.payload.education)
            return update(state, {
                applicationData: {
                    applications: {
                        [action.payload.index]: { $set: action.payload.job }
                    }
                }
            });

        default:
            return state;
    }
}

export default applicationReducer;

