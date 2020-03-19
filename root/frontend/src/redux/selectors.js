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
            return state.student.studentData.first_name + " " + state.student.studentData.last_name;
        }
    }
    if (state.auth.user_type === "employer") {
        if (state.employer.employerData) {
            return state.employer.employerData.comapnay_name;
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
            return state.student.studentData.first_name;
        }
    }
    if (state.auth.user_type === "employer") {
        if (state.employer.employerData) {
            return state.employer.employerData;
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
            return state.student.studentData.last_name;
        }
    }
    if (state.auth.user_type === "employer") {
        return state.employer.employerData;
    }
    return;
};

export const getEmail = state => {
    if (!state.auth) {
        return;
    }
    if (state.auth.user_type === "student") {
        if (state.student.studentData) {
            return state.student.studentData.email;
        }
    }
    if (state.auth.user_type === "employer") {
        if (state.employer.employerData) {
            return state.employer.employerData.email;
        }

    }
}
export const getPhoneNumber = state => {
    if (!state.auth) {
        return;
    }
    if (state.auth.user_type === "student") {
        if (state.student.studentData) {
            return state.student.studentData.phone_number;
        }
    }
    if (state.auth.user_type === "employer") {
        if (state.employer.employerData) {
            return state.employer.employerData.phone_number;
        }

    }
}

export const getEducation = studentData => {
    if (studentData) {
        return studentData.education;
    }
}

export const getExperience = studentData => {
    if (studentData) {
        return studentData.experience;
    }
}

export const getObjective = studentData => {
    if (studentData) {
        return studentData.objective;
    }
}

export const getSkills = studentData => {
    if (studentData) {
        return studentData.skills;
    }
}

export const getLastEducation = studentData => {
    if (studentData) {
        if (studentData.education) {
            return studentData.education[0];
        }
    }
}
export const getProfileUrl = state => {
    if (!state.auth) {
        return;
    }
    if (state.auth.user_type === "student") {
        if (state.student.studentData) {
            return state.student.studentData.profile_picture;
        }
    }
    if (state.auth.user_type === "employer") {
        if (state.employer.employerData) {
            return state.employer.employerData.profile_picture;
        }

    }
}

export const getEducationByID = (studentData, index) => {
    if (studentData) {
        if (studentData.education) {
            return studentData.education[index];
        }
    }
}

export const getExperienceByID = (studentData, index) => {
    if (studentData) {
        if (studentData.experience) {
            return studentData.experience[index];
        }
    }
}


export const getAddress = (employerData) => {
    if (employerData) {
        return employerData.address;
    }
}

export const getEmployerDiscription = (employerData) => {
    if (employerData) {
        return employerData.discription;
    }
}

export const getJobs = (state) => {
    if (!state.auth) {
        return;
    }
    if (state.auth.user_type === "student") {
        if (state.job.jobData) {
            return state.job.jobData.jobs;
        }
    }
    if (state.auth.user_type === "employer") {
        if (state.job.jobData) {
            return state.job.jobData.jobs;
        }
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
    if (state.application.applicationData) {
        return state.application.applicationData.applications;
    }

}

export const getEvents = (state) => {
    if (!state.auth) {
        return;
    }
    if (state.event.eventData) {
        return state.event.eventData.events;
    }
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
