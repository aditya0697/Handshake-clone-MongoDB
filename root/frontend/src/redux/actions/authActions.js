import axios from "axios";
import {AUTHENTICATE_STUDENT, AUTHENTICATE_EMPLOYER, SIGN_OUT} from './../actionTypes';
import storage from 'redux-persist/lib/storage';
import store from './../store'
const ROOT_URL = "http://52.8.254.75:3001";
// const ROOT_URL = "http://localhost:3001";
export const studentSignIn = (credentials) => dispatch => {
    axios.defaults.withCredentials = true
    axios.post(`${ROOT_URL}/student_signin`, credentials)
        .then(response => {
            console.log("studentSignIn Status:", JSON.stringify(response.data))
            if (response.status === 200) {
                console.log("Data in actions", response.data.msg)
                dispatch({
                    type: AUTHENTICATE_STUDENT,
                    payload: {
                        'email':credentials.username,
                        'message': response.data,
                        'error_message': "",
                    }
                })
            }
        },
        error => {
            console.log("studentSignIn error:", JSON.stringify(error));
            dispatch({
                type: AUTHENTICATE_STUDENT,
                payload: {
                    'email':credentials.username,
                    'message': "Invalid Username or Password",
                    'error_message': "Login Failed",
                }
                
            })
        });
};

export const studentSignUp = (student_data) => dispatch => {
    axios.defaults.withCredentials = true
    axios.post(`${ROOT_URL}/student_signup`, student_data)
            .then((response) => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    dispatch({
                        type: AUTHENTICATE_STUDENT,
                        payload: {
                            'email':student_data.email,
                            'message': response.data,
                            'error_message': "",
                        }
                        
                    });
                }
            },
                (error) => {
                    dispatch({
                        type: AUTHENTICATE_STUDENT,
                        payload: {
                            'email':"",
                            'message': "",
                            'message': "Invalid Username or Password",
                            'error_message': error.response.data.errMessage,

                        }
                    });
                });
}

export const employerSignIn = (credentials) => dispatch => {
    axios.defaults.withCredentials = true
    axios.post(`${ROOT_URL}/employer_signin`, credentials)
        .then(response => {
            console.log("employerSignIn Status:", JSON.stringify(response.data))
            if (response.status == 200) {
                console.log("Data in actions", response.data.msg)
                dispatch({
                    type: AUTHENTICATE_EMPLOYER,
                    payload: {
                        'email':credentials.username,
                        'message': response.data.message,
                        'error_message': "",
                    }
                })
            }
        },
        error => {
            console.log("employerSignIn error:", JSON.stringify(error));
            dispatch({
                type: AUTHENTICATE_EMPLOYER,
                payload: {
                    'email':credentials.username,
                    'message': "Invalid Username or Password",
                    'error_message': error.response.data.message,
                }
            })
        });
};


export const employerSignUp = (employer_data) => dispatch => {
    axios.defaults.withCredentials = true
    axios.post(`${ROOT_URL}/employer_signup`, employer_data)
            .then((response) => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    dispatch({
                        type: AUTHENTICATE_EMPLOYER,
                        payload: {
                            'email':employer_data.email,
                            'message': response.data,
                            'error_message': "",
                        }
                    });
                }
            },
                (error) => {
                    dispatch({
                        type: AUTHENTICATE_EMPLOYER,
                        payload: {
                            'email':"",
                            'message': "",
                            'message': "Invalid Username or Password",
                            'error_message': error.response.data.errMessage,
                        }
                    });
                });
}

export const signout = () => dispatch => {
    localStorage.clear();
    storage.removeItem('persist:root');
    store.persistor.flush();
    console.log("Signout !!")
        dispatch({
        type: SIGN_OUT
    })
};

