import axios from "axios";
import {HOST_URL} from "./../../config/config";
import {GET_EVENTS, ADD_EVENT, UPDATE_EVENT, REGISTER_EVENT} from './../actionTypes';


 const ROOT_URL = HOST_URL + "/event";
// const HOST_URL = "http://localhost:3001";

let getMajorsFromStudentData = (student) => {
    if(!student){
        return JSON.stringify([]);
    }
    var majors = [];
    student.Educations.map((education) => {
        if(education.Major){
            majors.push(education.Major);
        }
    });
    return JSON.stringify(majors);
}

export const fetchEvents = (user,student,eventData,page,limit) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(" Inside fetchApplications :", user.email);

    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }

    if(!page){
        page = 1;
    }
    if(!limit){
        limit = 5;
    }
    if(eventData){
        if (page > eventData.totalPages){
            page = 1;
        }
    }

    if (user.user_type == "student") {
        axios.get(`${ROOT_URL}/student/?Majors=${getMajorsFromStudentData(student)}&page=${page}&limit=${limit}`,config)
            .then(response => {
                console.log("events Data in actions", JSON.stringify(response));
                if (response.status == 200) {
                    console.log("events Data in actions")
                    dispatch({
                        type: GET_EVENTS,
                        payload: response.data,
                    })
                }
            }, error => {
                console.log(" get events error:", JSON.stringify(error));
                // dispatch({
                //     type: GET_EVENTS,
                //     payload: eventData.events,
                // })
            });
    } else {
        axios.get(`${ROOT_URL}/employer?employer_id=${user.id}&page=${page}&limit=${limit}`,config)
            .then(response => {
                console.log("events Data in actions", JSON.stringify(response));
                if (response.status == 200) {
                    console.log("events Data in actions")
                    dispatch({
                        type: GET_EVENTS,
                        payload: response.data,
                    })
                }
            }, error => {
                console.log(" fetchEvents error:", JSON.stringify(error));
                // dispatch({
                //     type: GET_EVENTS,
                //     payload: eventData.events,
                // })
            });
    }
};

export const addEvent = (event, employer_email) => dispatch => {
    console.log(" Inside addEvent :", JSON.stringify(event));
    axios.defaults.withCredentials = true;
    const data = {
        event,
        email: employer_email,
    }
    console.log(" Inside addEvent :", JSON.stringify(data));
    axios.post(`${ROOT_URL}/create_event`, data)
        .then(response => {
            console.log("job Data in actions", JSON.stringify(response));
            if (response.status == 200) {
                event.event_id = response.data.event_id;
                dispatch({
                    type: ADD_EVENT,
                    payload: event,
                })
            }
        },
        error => {
            console.log(" addEvent error:", JSON.stringify(error));
        });
}

export const updateEventById = (event, index) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(" Inside updateEventById :", JSON.stringify(event));
    axios.post(`${ROOT_URL}/update_event`,event)
        .then(response => {
            console.log("updateEventById in actions",JSON.stringify(response));
            if (response.status == 200) {
                dispatch({
                    type: UPDATE_EVENT,
                    payload: {
                        "index": parseInt(index),
                        "event": event,
                    }
                })
            }
        },
        error => {
            console.log(" updateEventById error:", JSON.stringify(error));
        });
}


export const registerEvent = (event_id, student_email) => dispatch => {
    console.log(" Inside registerEvent :", JSON.stringify(event_id));
    axios.defaults.withCredentials = true;
    const data = {
        event_id: event_id,
        student_email: student_email,
    }
    console.log(" Inside registerEvent :", JSON.stringify(data));
    axios.post(`${HOST_URL}/registration/register`, data)
        .then(response => {
            console.log("registerEvent Data in actions", JSON.stringify(response));
        },
        error => {
            console.log(" registerEvent error:", JSON.stringify(error));
        });
}
