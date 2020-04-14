import { ADD_JOB, UPDATE_JOB, GET_JOBS, FETCH_PROFILE_PICTURE_FOR_JOB } from './../actionTypes';
import update from 'react-addons-update'; // ES6


const initialState = {
};
const jobReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_JOBS:
            console.log("Details Payload:")
            console.log(action.payload)
            return {
                ...state,
                jobData: action.payload.docs,
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
        case ADD_JOB:
            console.log("Payload in ADD_EXPERIENCE: " + JSON.stringify(action.payload));
            return update(state, {
                    jobData: { $push: [action.payload] }
            });

        case UPDATE_JOB:
            console.log("action id :", JSON.stringify(action.payload));
            // console.log(action.payload.education)
            return update(state, {
                jobData: {
                    jobs: {
                        [action.payload.index]: { $set: action.payload.job }
                    }
                }
            });
        case FETCH_PROFILE_PICTURE_FOR_JOB:
            return {
                ...state,
                jobData: {
                    jobs_profile_pics: {
                        [action.payload.job_id]: action.payload.profile_picture,
                    }
                }
            }
        default:
            return state;
    }
}

export default jobReducer;

