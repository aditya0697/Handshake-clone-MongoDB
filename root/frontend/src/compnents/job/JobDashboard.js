import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Button, Pagination, Modal, Form, ListGroup, Alert } from 'react-bootstrap';
import { Icon } from 'antd';
import styled from 'styled-components';
import JobSidebar from './JobSidebar';
import JobDiscription from './JobDiscription';
import DatePicker from "react-datepicker";
import { connect } from 'react-redux';
import { getJobs, getName } from './../../redux/selectors';
import { addJob, fetchJobs } from './../../redux/actions/jobActions';
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
    overflow-x: scroll;
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
.jobs-pagination{
    text-align: center;
        overflow-x: scroll;
        padding-left: 15px;
}
.job-sidebar-job-list{
    height: 535px;
    overflow-y: scroll;
}
  `;

class JobDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            alertFlag: false,
            Type: "Full Time",
            activePage: 1,
            totalPages: 1,
            limit:5,
            totalDocs: null,
            jobs: [],
            Deadline: new Date(),
            PostDate: new Date(),
            // discription_job: initial_job,
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.jobCardClickHandler = this.jobCardClickHandler.bind(this);
    }

    handlePageNext = (e) => {
        e.preventDefault();
        this.props.fetchJobs(this.props.user,this.props.jobData, this.state.nextPage, this.state.limit, this.props.user.id);
    }

    handlePagePrevious = (e) => {
        e.preventDefault();
        this.props.fetchJobs(this.props.user,this.props.jobData, this.state.prevPage, this.state.limit, this.props.user.id);
    }
    handlePageLast = (e) => {
        e.preventDefault();
        this.props.fetchJobs(this.props.user,this.props.jobData, this.state.totalPages, this.state.limit, this.props.user.id);
    }

    handlePageFirst = (e) => {
        e.preventDefault();
        this.props.fetchJobs(this.props.user,this.props.jobData, 1, this.state.limit, this.props.user.id);
    }
    // componentDidMount() {
    //     if (this.props.jobs === []) {
    //         this.props.getAllStudents();
    //     } 
    // }
    // componentWillReceiveProps(nextProps) {
    //     console.log("nextProps.students_list: " + JSON.stringify(nextProps.allStudents.page));

    // }

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
            PostDate: date,
        })
    };

    deadlineDateChangeHandler = (date) => {
        console.log(date);
        this.setState({
            Deadline: date,
        })
    };

    getUpdatedState = () => ({
        EmployerID: this.props.EmployerID,
        Postion: this.state.Postion,
        Type: this.state.Type,
        Salary: this.state.Salary,
        PostDate: this.state.PostDate,
        Deadline: this.state.Deadline,
        Description: this.state.Description,
        Address: {
            City: this.state.City,
            State: this.state.State,
            Zipcode: this.state.Zipcode,
        },
    });
    validation = () => {
        if (this.state.Postion && this.state.Type && this.state.City && this.state.State && this.state.Zipcode && this.state.Salary && this.state.Description) {
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
            this.props.addJob(this.getUpdatedState(), this.props.employerData);
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
        this.props.addJob(this.getUpdatedState(), this.props.user.email);

    }
    componentDidMount() {
        if (!this.props.jobs || this.props.jobs === []) {
            this.props.fetchJobs(this.props.user, this.props.jobData, 1, this.state.limit, this.props.user.id);
        } else {
            this.setState({
                jobs: this.props.jobs
            })
            if (this.props.jobData) {
                this.setState({
                    totalDocs: this.props.jobData.totalDocs,
                    totalPages: this.props.jobData.totalPages,
                    limit: this.props.jobData.limit,
                    nextPage: this.props.jobData.nextPage,
                    prevPage: this.props.jobData.prevPage,
                    activePage: this.props.jobData.page,
                });
            }
            this.props.fetchJobs(this.props.user, this.props.jobData, 1, this.state.limit, this.props.user.id);
        }
        if (this.props.jobs) {
            if (this.props.jobs.length > 0) {
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
        // console.log("nextProps.jobs: " + JSON.stringify(nextProps.jobs));
        if (nextProps.jobs) {
            this.setState({
                discription_job: nextProps.jobs[0],
            })
        }
        if (nextProps.jobData.page) {
            this.setState({
                totalDocs: nextProps.jobData.totalDocs,
                totalPages: nextProps.jobData.totalPages,
                limit: nextProps.jobData.limit,
                nextPage: nextProps.jobData.nextPage,
                prevPage: nextProps.jobData.prevPage,
                activePage: nextProps.jobData.page,
                jobs: nextProps.jobs,
            })
        }
    };

    render() {
        let jobSidebar = [];
        if (this.state.jobs) {
            jobSidebar = this.state.jobs.map((job, id) => {
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
                                    <Form.Label className="signup-form-lable">Job Postion</Form.Label>
                                    <Form.Control onChange={this.onChangeHandeler} name="Postion" placeholder="Job Postion" />
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="start_date">
                                        <Form.Label className="signup-form-lable">Post Date</Form.Label>
                                        <br />
                                        <DatePicker selected={this.state.PostDate} name="PostDate" className="date_picker" onChange={this.postDateChangeHandler} />
                                        <br />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="salary">
                                        <Form.Label className="signup-form-lable">Salary</Form.Label>
                                        <Form.Control onChange={this.onChangeHandeler} name="Salary" type="number" placeholder="salary" />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="end_date">
                                        <Form.Label className="signup-form-lable">Application Deadline,</Form.Label>
                                        <br />
                                        <DatePicker selected={this.state.Deadline} name="Deadline" className="date_picker" onChange={this.deadlineDateChangeHandler} />
                                        <br />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
                                        <Form.Label>Job Category </Form.Label>
                                        <Form.Control as="select" name="Type" onChange={this.onChangeHandeler} defaultValue={1}>
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
                                        <Form.Control name="City" placeholder="San Jose" onChange={this.onChangeHandeler} />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>State</Form.Label>
                                        <Form.Control name="State" placeholder="CA" onChange={this.onChangeHandeler} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>Zip Code</Form.Label>
                                        <Form.Control name="Zipcode" placeholder="12345" onChange={this.onChangeHandeler} />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Label>Discription</Form.Label>
                                    <Form.Control name="Description" as="textarea" placeholder="Discription..." onChange={this.onChangeHandeler} />
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
                                    <div className="job-sidebar-job-list">
                                        <Col>
                                            <div className="jobs-details">
                                                <span><b>{this.state.totalDocs && this.state.totalDocs} jobs match your interests</b></span>
                                            </div>
                                        </Col>
                                        <ListGroup as="ul" className="job-list-group">
                                            {jobSidebar}
                                        </ListGroup>
                                    </div>
                                    <div className="jobs-pagination">
                                        <Pagination >
                                            <Pagination.First onClick={this.handlePageFirst} />
                                            <Pagination.Prev onClick={this.handlePagePrevious} />
                                            <Pagination.Item key={this.state.activePage} active={true}>
                                                {this.state.activePage}
                                            </Pagination.Item>
                                            <Pagination.Next onClick={this.handlePageNext} />
                                            <Pagination.Last onClick={this.handlePageLast} />
                                        </Pagination>
                                    </div>
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
        jobData: state.jobs,
        user: state.auth,
        name: getName(state),
        employerData: state.employer.employerData,
        studentData: state.student.studentData,
    };
};
export default connect(mapStateToProps, { addJob, fetchJobs })(JobDashboard);