import axios from "axios";
import {GET_APPLICATIONS, ADD_APPLICATION, UPDATE_APPLICATION} from './../actionTypes';

const ROOT_URL = "http://52.8.254.75:3001/application";
// const ROOT_URL = "http://localhost:3001/application";

export const fetchApplications = (user) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(" Inside fetchApplications :", user.email);
    const applicationData = {
        applications: []
    }
    if (user.user_type == "student") {
        axios.get(`${ROOT_URL}/student/get_applications/${user.email}`)
            .then(response => {
                console.log("application Data in actions", JSON.stringify(response));
                if (response.status == 200) {
                    console.log("application Data in actions")
                    dispatch({
                        type: GET_APPLICATIONS,
                        payload: response.data.applications,
                    })
                }
            }, error => {
                console.log(" get application error:", JSON.stringify(error));
                dispatch({
                    type: GET_APPLICATIONS,
                    payload: applicationData.applications,
                })
            });
    } else {
        axios.get(`${ROOT_URL}/employer/get_applications/${user.email}`)
            .then(response => {
                console.log("job Data in actions", JSON.stringify(response));
                if (response.status == 200) {
                    console.log("job Data in actions")
                    dispatch({
                        type: GET_APPLICATIONS,
                        payload: response.data.applications,
                    })
                }
            }, error => {
                console.log(" getJobs error:", JSON.stringify(error));
                dispatch({
                    type: GET_APPLICATIONS,
                    payload: applicationData,
                })
            });
    }
};
