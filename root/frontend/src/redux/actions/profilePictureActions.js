import { FETCH_EMPLOPYER_PROFILE_PIC, FETCH_STUDENT_PROFILE_PIC}  from './../actionTypes';
import axios from "axios";

const HOST_URL = "http://52.8.254.75:3001";
// const HOST_URL = "http://localhost:3001";

export const getProfileUrlForEmployer = (employer_email) => dispatch => {
    dispatch({
        type: FETCH_EMPLOPYER_PROFILE_PIC,
        payload: {
            email:"employer_email",
            profile_picture:"response"
        }
    })
    axios.get(`${HOST_URL}/employer/get_profile_picture/${employer_email}`)
        .then(response => {
            console.log("Employer getProfileUrlForEmployer in actions" );
            if (response.status == 200) {
                console.log("getProfileUrlForEmployer profile_picture: "+ JSON.stringify(response.data.profile_picture));
                dispatch({
                    type: FETCH_EMPLOPYER_PROFILE_PIC,
                    payload: {
                        email:employer_email,
                        profile_picture:response.data.profile_picture
                    }
                })
            }
        });
}