import loggedReducer from './isLogged';
import studentReducer from './studentReducer';
import employerReducer from './employerReducer';
import authReducer from './authReducer';
import jobReducer from './jobReducer';
import applicationReducer from './applicationReducer';
import eventReducer from './eventReducer';
import profilPictureReducer from './profilePicturesReducer';
import studentTabReducer from './studentTabReducer';
import messageReducer from './messageReducer';
import {combineReducers} from 'redux';
import {SIGN_OUT} from './../actionTypes';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    // isLogged: loggedReducer,
    student: studentReducer,
    employer: employerReducer,
    auth: authReducer,
    jobs: jobReducer,
    application: applicationReducer,
    profilePicture:profilPictureReducer,
    eventData: eventReducer,
    allStudents: studentTabReducer,
    messageData: messageReducer,
});
const allReducers = (state, action) => {
    if (action.type === SIGN_OUT) {
        // for all keys defined in your persistConfig(s)
        storage.removeItem('persist:root')
        // storage.removeItem('persist:otherKey')
        state = undefined;
    }
    return rootReducer(state, action);
};
export default allReducers;