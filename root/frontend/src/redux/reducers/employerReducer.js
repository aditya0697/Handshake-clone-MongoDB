import {
    EMPLOYER_DETAILS, UPDATE_EMPLOYER_ADDRESS, UPDATE_EMPLOYER_DISCRIPTION, ADD_EMPLOYER_DISCRIPTION,
    UPDATE_EMPLOYER_PHONENUMBER, UPDATE_EMPLOYER_NAME, UPDATE_EMPLOYER_PROFILE_PIC, FETCH_EMPLOPYER_PROFILE_PIC
} from './../actionTypes';
import update from 'react-addons-update'; // ES6


const initialState = {
    employer_profile_pictures: [],
};
const employerReducer = (state = initialState, action) => {
    switch (action.type) {
        case EMPLOYER_DETAILS:
            console.log("Details Payload:")
            console.log(action.payload)
            return {
                ...state,
                employerData: action.payload
            }
        case UPDATE_EMPLOYER_ADDRESS:
            console.log("Payload:")
            console.log(action.payload)
            return update(state, {
                employerData: {
                    address: { $set: action.payload }
                }
            });
        case UPDATE_EMPLOYER_PHONENUMBER:
            console.log("Payload in UPDATE_EDUCATION_BY_ID: ")
            console.log("action id :", JSON.stringify(action.payload));
            // console.log(action.payload.education)
            return update(state, {
                employerData: {
                    phone_number: { $set: action.payload }
                }
            });
        case UPDATE_EMPLOYER_DISCRIPTION:
            console.log("Payload in ADD_EDUCATION: " + JSON.stringify(action.payload));
            return update(state, {
                employerData: {
                    discription: { $set: action.payload }
                }
            });
        case ADD_EMPLOYER_DISCRIPTION:
            console.log("Payload in UPDATE_EXPERIENCE_BY_ID: ")
            console.log("action id :", JSON.stringify(action.payload));
            // console.log(action.payload.education)
            return update(state, {
                employerData: {
                    discription: { $set: action.payload }
                }
            });
        case UPDATE_EMPLOYER_NAME:
            return update(state, {
                employerData: {
                    comapnay_name: { $set: action.payload }
                }
            });
        case UPDATE_EMPLOYER_PROFILE_PIC:
            return update(state, {
                employerData: {
                    profile_picture: { $set: action.payload }
                }
            });


        default:
            return state;
    }
}

export default employerReducer;