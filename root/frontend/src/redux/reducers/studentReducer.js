import {
    STUDENT_DETAILS, EDIT_STUDENT_DETAILS, UPDATE_EDUCATION_BY_ID, ADD_EDUCATION, UPDATE_EXPERIENCE_BY_ID, ADD_EXPERIENCE,
    UPDATE_STUDENT_FIRST_NAME, UPDATE_STUDENT_LAST_NAME, UPDATE_STUDENT_OBJECTIVE, ADD_SKILL, DELETE_SKILL, UPDATE_STUDENT_PHONENUMBER, 
    UPDATE_STUDENT_PROFILE_PIC, FETCH_STUDENT_PROFILE_PIC, UPDATE_STUDENT_PROFILE
} from './../actionTypes'
import update from 'react-addons-update'; // ES6

const initialState = {
    student_profile_pictures: [],
};
const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case STUDENT_DETAILS:
            console.log("Details Payload:")
            console.log(action.payload)
            return {
                ...state,
                studentData: action.payload
            }
        case UPDATE_STUDENT_PROFILE:
            console.log("Payload:")
            console.log(action.payload)
            return {
                ...state,
                studentData: action.payload
            }
        case UPDATE_EDUCATION_BY_ID:
            console.log("Payload in UPDATE_EDUCATION_BY_ID: ")
            console.log("action id :", JSON.stringify(action.payload));
            // console.log(action.payload.education)
            return update(state, {
                studentData: {
                    Educations: {
                        [action.payload.index]: { $set: action.payload.education }
                    }
                }
            });
        case ADD_EDUCATION:
            console.log("Payload in ADD_EDUCATION: " + JSON.stringify(action.payload));
            return update(state, {
                studentData: {
                    Educations: { $push: [action.payload] }
                }
            });
        case UPDATE_EXPERIENCE_BY_ID:
            console.log("Payload in UPDATE_EXPERIENCE_BY_ID: ")
            console.log("action id :", JSON.stringify(action.payload));
            // console.log(action.payload.education)
            return update(state, {
                studentData: {
                    Experiences: {
                        [action.payload.index]: { $set: action.payload.experience }
                    }
                }
            });
        case ADD_EXPERIENCE:
            console.log("Payload in ADD_EXPERIENCE: " + JSON.stringify(action.payload));
            return update(state, {
                studentData: {
                    Experiences: { $push: [action.payload] }
                }
            });
        case UPDATE_STUDENT_FIRST_NAME:
            return update(state, {
                studentData: {
                    FirstName: { $set: action.payload }
                }
            });
        case UPDATE_STUDENT_LAST_NAME:
            return update(state, {
                studentData: {
                    LastName: { $set: action.payload }
                }
            });
        case UPDATE_STUDENT_OBJECTIVE:
            return update(state, {
                studentData: {
                    CareerObjective: { $set: action.payload }
                }
            });
        case ADD_SKILL:
            return update(state, {
                studentData: {
                    Skills: { $push: [action.payload] }
                }
            });
        case DELETE_SKILL:
            return update(state, {
                studentData: {
                    Skills: [
                        ...state.items.slice(0, action.payload),
                        ...state.items.slice(action.payload + 1)
                    ],
                }
            });
        case UPDATE_STUDENT_PHONENUMBER:
            return update(state, {
                studentData: {
                    PhoneNumber: { $set: action.payload }
                }
            });
        case UPDATE_STUDENT_PROFILE_PIC:
            return update(state, {
                studentData: {
                    ProfileUrl: { $set: action.payload }
                }
            });
        default:
            return state;
    }
}
export default studentReducer;