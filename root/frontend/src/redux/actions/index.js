import { LOGOUT, LOGIN, CHANGE_LOGIN_VIEW } from '../actionTypes';

export const login = (student_email, employer_email) => dispatch => {

        localStorage.setItem("student_email",student_email);
        localStorage.setItem("employer_email",employer_email);
        console.log("login student_email :" +localStorage.getItem("student_email"));
        console.log("login employer_email :" +localStorage.getItem("employer_email"));
        
        dispatch({
                type: LOGIN
        })
};

export const logout = () => dispatch => {
        localStorage.clear()
        dispatch({
                type: LOGOUT
        })
};

