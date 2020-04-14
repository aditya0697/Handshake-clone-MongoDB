import { AUTHENTICATE_STUDENT, AUTHENTICATE_EMPLOYER } from './../actionTypes';

const initialState = { 
    user: {
        email: "",
        user_type: "student",
        success: "",
        id: "",
        error: "Invalid Username or Password",
    } ,
  };


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE_STUDENT:
            console.log("Payload:", action.payload)
            // console.log(action.payload)
            if (action.payload.message == "Invalid Username or Password") {
                return {
                    user_type: "student",
                    success: "",
                    error: action.payload.error_message,
                    email: "",
                    id:"",
                }
            } else {
                return {
                    success: "Sigin in Successful!" ,
                    user_type: "student",
                    error: "",
                    email: action.payload.email,
                    id: action.payload.id,
                }
            }
        case AUTHENTICATE_EMPLOYER:
            console.log("Payload:", action.payload)
            // console.log(action.payload)
            if (action.payload.message == "Invalid Username or Password") {
                return {
                    user_type: "employer",
                    success: "",
                    error: action.payload.error_message,
                    email: "",
                    id: "",
                }
            } else {
                return {
                    success: "Sigin in Successful!" ,
                    user_type: "employer",
                    error: "",
                    email: action.payload.email,
                    id: action.payload.id,
                }
            }
        default:
            return state
        }
    };
export default authReducer;