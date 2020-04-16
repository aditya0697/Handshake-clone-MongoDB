export const getIsLoggedInState = auth => {
    if (auth) {
        return true
    }
    return false
};

export const getUser = auth => auth;

export const getName = state => {
    if (!state.auth) {
        return;
    }
    if (state.auth.user_type === "student") {
        if (state.student.studentData) {
            return state.student.studentData.FirstName + " " + state.student.studentData.LastName;
        }
    }
    if (state.auth.user_type === "employer") {
        if (state.employer.employerData) {
            return state.employer.employerData.EmployerName;
        }
    }
    return;
};

export const getFirstName = state => {
    if (!state.auth) {
        return;
    }
    if (state.auth.user_type === "student") {
        if (state.student.studentData) {
            return state.student.studentData.FirstName;
        }
    }
    if (state.auth.user_type === "employer") {
        if (state.employer.employerData) {
            return state.employer.employerData.EmployerName;
        }

    }
    return;
};

export const getLastName = state => {
    if (!state.auth) {
        return;
    }
    if (state.auth.user_type === "student") {
        if (state.student.studentData) {
            return state.student.studentData.LastName;
        }
    }
    return;
};

export const getEmail = state => {
    if (!state.auth) {
        return;
    }
    if (state.auth.user_type === "student") {
        if (state.student.studentData) {
            return state.student.studentData.Email;
        }
    }
    if (state.auth.user_type === "employer") {
        if (state.employer.employerData) {
            return state.employer.employerData.Email;
        }

    }
}
export const getPhoneNumber = state => {
    if (!state.auth) {
        return;
    }
    if (state.auth.user_type === "student") {
        if (state.student.studentData) {
            return state.student.studentData.PhoneNumber;
        }
    }
    if (state.auth.user_type === "employer") {
        if (state.employer.employerData) {
            return state.employer.employerData.PhoneNumber;
        }

    }
}

export const getEducation = studentData => {
    if (studentData) {
        return studentData.Educations;
    }
}

export const getExperience = studentData => {
    if (studentData) {
        return studentData.Experiences;
    }
}

export const getObjective = studentData => {
    if (studentData) {
        return studentData.CareerObjective;
    }
}

export const getSkills = studentData => {
    if (studentData) {
        return studentData.Skills;
    }
}

export const getLastEducation = studentData => {
    if (studentData) {
        if (studentData.Educations) {
            return studentData.Educations[0];
        }
    }
}
export const getProfileUrl = state => {
    if (!state.auth) {
        return;
    }
    if (state.auth.user_type === "student") {
        if (state.student.studentData) {
            return state.student.studentData.ProfileUrl;
        }
    }
    if (state.auth.user_type === "employer") {
        if (state.employer.employerData) {
            return state.employer.employerData.ProfileUrl;
        }

    }
}

export const getEducationByID = (studentData, index) => {
    if (studentData) {
        if (studentData.Educations) {
            return studentData.Educations[index];
        }
    }
}

export const getExperienceByID = (studentData, index) => {
    if (studentData) {
        if (studentData.Experiences) {
            return studentData.Experiences[index];
        }
    }
}


export const getAddress = (employerData) => {
    if (employerData) {
        return employerData.Address;
    }
}

export const getEmployerDiscription = (employerData) => {
    if (employerData) {
        return employerData.EmployerDescription;
    }
}

export const getJobs = (state) => {
    if (!state.auth) {
        return;
    }
    if (state.auth.user_type === "student") {
            return state.jobs.jobData;
    }
    if (state.auth.user_type === "employer") {
            return state.jobs.jobData;
    }
}

export const getProfileUrlForEmployerForJob = (job, job_id) => {
    if (job.jobData.jobs_profile_pics) {
        const jobs_profile_pics = job.jobData.jobs_profile_pics;
        return jobs_profile_pics[job_id];
    }

}

export const getApplications = (state) => {
    if (!state.auth) {
        return;
    }
   return state.application.applicationData;
}
export const getRegistrationsFormStore = (state) => {
    if (!state.auth) {
        return [];
    }
    return state.registrationData.registrations;
    
}

export const getEvents = (state) => {
    if (!state.auth) {
        return;
    }
    if (state.eventData.events) {
        return state.eventData.events;
    }
    return [];
}

export const getProfilePicture = (state, user_type, email) => {
    console.log("getProfilePicture: "+user_type+"  "+email);

    if (!state.auth) {
        return;
    }
    if (!email){
        return;
    }
    if (!state.profilePicture){
        return;
    }
    console.log(" in selector profilePicture: " + state.profilePicture.profile_pictures.email);
    if (user_type === "student") {
        if ( email in state.profilePicture.profile_pictures) {
            return state.profilePicture.profile_pictures[email];
        }
    }
    if (user_type === "employer") {
        console.log(" in selector profilePicture: " + state.profilePicture.profile_pictures.email);
        if ( email in state.profilePicture.profile_pictures) {
            return state.profilePicture.profile_pictures[email];
        }
    }
}

export const getAllStudentsList = (allStudent) => {
    if(allStudent){
        return allStudent.students;
    }
    return [];
}

export const getConversationsForUser = (messageData) => {
    if(messageData.messages){
        return messageData.messages
    }
    return []
}