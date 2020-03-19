import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Card, CardGroup, Button, Jumbotron, Modal, Form, ListGroup, Alert } from 'react-bootstrap';
import { Icon } from 'antd';
import styled from 'styled-components';
import JobSidebar from './JobSidebar';
import JobDiscription from './JobDiscription';
import DatePicker from "react-datepicker";
import { connect } from 'react-redux';
import { getJobs, getName } from './../../redux/selectors';
import { addJob, fetchJobs, fetchProfileUrlForEmployerForJob } from './../../redux/actions/jobActions';
import JobCard from './JobCard';
const Styles = styled.div`
.col-md-8, .col-md-4 {
    padding: 0px;
   
  }
  .job-dashboard-sidebar-col{
    border-right: 1px solid #d9d9d9;
  }

  .dashboard-background{
      height: 585px;
      padding-right: 15px;
      padding-left: 15px;
      box-shadow: 1px 1px 4px 1px rgba(0,0,0,.05), 2px 2px 2px 1px rgba(0,0,0,.05);
      background-color: #fff;
      border-radius: 3px;
      
  }
  .sidebar-backgroung{
    height: 585px;
    margin: 0 auto;
  }

  .job-discription-card {
    max-height: 800px;
    overflow-y: scroll;
    margin: 10px;
    padding: 24px;
    box-shadow: 1px 1px 4px 1px rgba(0,0,0,.05), 2px 2px 2px 1px rgba(0,0,0,.05);
    background-color: #fff;
    border-radius: 3px;
}
.job-create-job{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 20px;
    min-width: 675px;
    font-weight: 550;
    height: 30px;
   }
.job-sidebar-container{
    margin: 0 auto;
    overflow-y: scroll;
    height: 585px;
}
.job-list-group {
    border: 0px;
}
.job-list-item {
    border: 0px;
    &:hover {
        border-left: 4px solid #b3b3b3;
        background-color: #f2f2f2
    }
}
  `;

class JobDashboard extends Component {

    constructor(props) {
        super(props);
        const initial_job = {
            job_id: "",
            employer: "",
            job_title: "",
            job_city: "",
            job_state: "",
            job_zip_code: "",
            job_type: "",
            salary: "",
            post_date: new Date(),
            deadline: new Date(),
            job_discription: "",
            addJobModalAlertFlag: false,
        }
        this.state = {
            show: false,
            alertFlag: false,
            job_type: "Full Time",
            deadline: new Date(),
            post_date: new Date(),
            discription_job: initial_job,
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.jobCardClickHandler = this.jobCardClickHandler.bind(this);
    }

    // getJobForDiscription = () => {
    //     if (!this.props.jobs) {
    //         return 
    //     }
    //     return this.props.jobs[this.state.discription_job_id];

    // };

    handleClose = (e) => {
        this.setState({
            show: false,
            alertFlag: false,
        })
    };
    handleShow = (e) => {
        e.preventDefault();
        console.log("Inside handleShow");
        this.setState({
            show: true,
        })
    };
    onChangeHandeler = (e) => this.setState({ [e.target.name]: e.target.value });

    jobCardClickHandler = (id) => {
        console.log("Job id: ", id);
        this.setState({
            discription_job: this.props.jobs[id],
        })
        console.log("discription_job: " + JSON.stringify(this.state.discription_job));
    };
    postDateChangeHandler = (date) => {
        console.log(date);
        this.setState({
            post_date: date,
        })
    };

    deadlineDateChangeHandler = (date) => {
        console.log(date);
        this.setState({
            deadline: date,
        })
    };

    getUpdatedState = () => ({
        employer: this.props.name,
        job_title: this.state.job_title,
        job_city: this.state.job_city,
        job_state: this.state.job_state,
        job_zip_code: this.state.job_zip_code,
        job_type: this.state.job_type,
        salary: this.state.salary,
        post_date: this.state.post_date,
        deadline: this.state.deadline,
        job_discription: this.state.job_discription,
    });
    validation = () => {
        if (this.state.job_title && this.state.job_type && this.state.job_city && this.state.job_state && this.state.job_zip_code && this.state.salary && this.state.job_discription) {
            return true;
        }
        return false;
    }

    addJobHandler = (e) => {

        e.preventDefault();
        if (!this.validation()) {
            this.setState({
                addJobModalAlertFlag: true,
            })
            return;
        }
        this.setState({
            show: false,
        })
        if (this.props.user.user_type === "employer") {
            console.log("getUpdatedState: " + JSON.stringify(this.getUpdatedState()));
            this.props.addJob(this.getUpdatedState(), this.props.user.email);
        }
    }

    saveChangeHandler = (e) => {
        if (!this.validation()) {
            this.setState({
                alertFlag: true,
            })
            return;
        }
        e.preventDefault();
        this.setState({
            show: false,
        })
        console.log("getUpdatedState: " + JSON.stringify(this.getUpdatedState()));
        this.props.addEducation(this.getUpdatedState(), this.props.user.email);

    }
    componentDidMount() {
        if (!this.props.jobs || this.props.jobs === []) {
            this.props.fetchJobs(this.props.user);
            
        }
        if (this.props.jobs) {
            if(this.props.jobs.length > 0){
                this.setState({
                    discription_job: this.props.jobs[0],
                })
            } 
            // this.props.jobs.map( job => {
            //     this.props.fetchProfileUrlForEmployerForJob(job.job_id);
            // })
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps.jobs: " + JSON.stringify(nextProps.jobs));
        if (nextProps.jobs) {
            this.setState({
                discription_job: nextProps.jobs[0],
            })
        }
    };

    render() {
        let jobSidebar = [];
        if (this.props.jobs) {
            jobSidebar = this.props.jobs.map((job, id) => {
                if (!job) {
                    return;
                }
                return (
                    <ListGroup.Item as="li" className="job-list-item">
                        <JobCard job={job} id={id} jobCardClickHandler={this.jobCardClickHandler} />
                    </ListGroup.Item>
                )
            });
        };

        return (
            <Styles>
                <div className="dashboard-background" id="employer_modal">
                    {/* --------------------------------------------------------------------------------------------------------------------------------- */}
                    <Modal show={this.state.show} onHide={this.handleClose} >
                        <Modal.Header closeButton>
                            <Modal.Title>Create Job</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.state.addJobModalAlertFlag && <Alert variant="danger">Insert all values</Alert>}
                            <Form>
                                <Form.Group controlId="employer">
                                    <Form.Label className="signup-form-lable">Job Title</Form.Label>
                                    <Form.Control onChange={this.onChangeHandeler} name="job_title" placeholder="Job Title" />
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="start_date">
                                        <Form.Label className="signup-form-lable">Post Date</Form.Label>
                                        <br />
                                        <DatePicker selected={this.state.post_date} name="post_date" className="date_picker" onChange={this.postDateChangeHandler} />
                                        <br />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="salary">
                                        <Form.Label className="signup-form-lable">Salary</Form.Label>
                                        <Form.Control onChange={this.onChangeHandeler} name="salary" type="number" placeholder="salary" />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="end_date">
                                        <Form.Label className="signup-form-lable">Application Deadline,</Form.Label>
                                        <br />
                                        <DatePicker selected={this.state.deadline} name="deadline" className="date_picker" onChange={this.deadlineDateChangeHandler} />
                                        <br />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
                                        <Form.Label>Job Category </Form.Label>
                                        <Form.Control as="select" name="job_type" onChange={this.onChangeHandeler} defaultValue={1}>
                                            <option>Full Time</option>
                                            <option>Part Time</option>
                                            <option>Intern</option>
                                            <option>On Campus</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control name="job_city" placeholder="San Jose" onChange={this.onChangeHandeler} />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>State</Form.Label>
                                        <Form.Control name="job_state" placeholder="CA" onChange={this.onChangeHandeler} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>Zip Code</Form.Label>
                                        <Form.Control name="job_zip_code" placeholder="12345" onChange={this.onChangeHandeler} />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Label>Discription</Form.Label>
                                    <Form.Control name="job_discription" as="textarea" placeholder="Discription..." onChange={this.onChangeHandeler} />
                                </Form.Row>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                        </Button>
                            <Button variant="primary" onClick={this.addJobHandler}>
                                Save Changes
                        </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* --------------------------------------------------------------------------------------------------------------------------------- */}
                    <Row>
                        <Col sm={4} md={4} className="job-dashboard-sidebar-col">
                            <div className="sidebar-backgroung">
                                <div className="job-sidebar-container">
                                    <Col>
                                        <div className="jobs-details">
                                            <span><b>{this.props.jobs && this.props.jobs.length} jobs match your interests</b></span>
                                        </div>
                                    </Col>
                                    <ListGroup as="ul" className="job-list-group">
                                        {jobSidebar}
                                    </ListGroup>
                                </div>
                            </div>
                        </Col>
                        <Col sm={8} md={8}>
                            {this.props.user.user_type === "employer" &&
                                <div className="job-discription-card">
                                    <div className="job-create-job">
                                        <Row>
                                            <Col xs={11} md={11}>
                                                Create Job
                                            </Col>
                                            <Col xs={1} md={1}>
                                                <Icon type="plus" onClick={this.handleShow}></Icon>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            }
                            <div className="">
                                {this.state.discription_job &&
                                    <JobDiscription job={this.state.discription_job} />
                                }
                            </div>
                        </Col>
                    </Row>
                </div>
            </Styles>

        )
    }
}
//Export The Main Component

const mapStateToProps = state => {
    return {
        jobs: getJobs(state),
        user: state.auth,
        name: getName(state),
    };
};
export default connect(mapStateToProps, { addJob, fetchJobs , fetchProfileUrlForEmployerForJob})(JobDashboard);