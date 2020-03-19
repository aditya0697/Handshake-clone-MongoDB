import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Card, CardGroup, Container, Jumbotron, Button, Modal, Form, Alert } from 'react-bootstrap';
import { Icon } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import axios from "axios";
// import {JobSidebar} from './jobsidebar/JobSidebar';

const Styles = styled.div`
    .job-discription-container{
        margin: 0 auto;
        overflow-y: scroll;
        height: 485px;
    }

    .job-discription-job-title{
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        font-size: 28px;
        font-weight: 620;
        max-height: 75px;
       }
    .job-discription-job-employer{
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        font-size: 16px;
        font-weight: 550;
        min-height: 15px;
        max-height: 25px;
       }
    .job-discription-heading{
        height: 115px;
        overflow-y:scrool;
        padding:5px;
    }
    .job-discription-subheading{
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        font-size: 14px;
        font-weight: 350;
        min-height: 20px;
        max-height: 20px;
        vertical-align: middle;
        padding: 3px;
    }
    .job-discription-apply-box{
        max-height: 65px;
        overflow-y: scroll;
        margin: 10px;
        padding: 4px;
        box-shadow: 1px 1px 4px 1px rgba(0,0,0,.05), 2px 2px 2px 1px rgba(0,0,0,.05);
        background-color: #fff;
        border-radius: 3px;
    }
    .job-discription-discription-title{
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        font-size: 22px;
        font-weight: 450;
        padding: 10px;
        min-height: 40px;
        max-height: 60px;
        vertical-align: middle;
    }
    .job-discription-discription{
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        font-size: 14px;
        font-weight: 50;
        overflow-y:scrool;
        padding: 10px;
        min-height: 60px;
        max-height: 50px;
    }
  `;

class JobDiscription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            apply_show: false,
            application_confirmation_show: false,
            job_id: this.props.job.job_id,
            employer: this.props.job.employer,
            job_title: this.props.job.job_title,
            job_city: this.props.job.job_city,
            job_state: this.props.job.job_state,
            job_zip_code: this.props.job.job_zip_code,
            job_type: this.props.job.job_type,
            salary: this.props.job.salary,
            post_date: new Date(),
            deadline: new Date(),
            job_discription: this.props.job.job_discription,
            resume_file: null,
            apply_button_state: "primary",
            apply_button_text: "Apply",
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.applyHandleShow = this.applyHandleShow.bind(this);
        this.applyHandleClose = this.applyHandleClose.bind(this);
    }

    onValueChangeHandler = (e) => this.setState({ [e.target.name]: e.target.value })
    onFileUploadChangeHandler = event => {

        console.log(event.target.files[0])
        this.setState({
            resume_file: event.target.files[0],
        })

    }
    getJobTypeOtionId = () => {
        switch (this.state.job_type) {
            case "Full Time":
                return 0;
            case "Part Time":
                return 1;
            case "Intern":
                return 2;
            case "On Campus":
                return 3;
            default:
                return 3;
        }

    }
    setShow = (show) => {
        this.setState({
            application_confirmation_show: false,
        })
    }
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
    applyHandleClose = (e) => {
        this.setState({
            apply_show: false,
        })
    };
    applyHandleShow = (e) => {
        this.setState({
            apply_show: true,
        })
    };
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

    applyClickeHandler = (e) => {
        e.preventDefault();
        this.setState({
            apply_show: false,
            apply_button_state: "success",
            apply_button_text: "Applied",
        })
        const formData = new FormData();
        formData.append('student_email', this.props.user.email);
        formData.append('job_id', this.props.job.job_id);
        formData.append('resume_file', this.state.resume_file);
        //  http://localhost:3001/application/apply
        axios.post('http://52.8.254.75:3001/application/apply', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then((response) => {

                this.setState({
                    application_confirmation_show: true,
                });

                console.log("Application id: " + response.data.application_id)
            }).catch((error) => {
                console.log("Application was not submitted.: " + JSON.stringify(error));
            });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.job) {
            console.log("Job Discription Updated!!")
            this.setState({
                job_id: nextProps.job.job_id,
                employer: nextProps.job.employer,
                job_title: nextProps.job.job_title,
                job_city: nextProps.job.job_city,
                job_state: nextProps.job.job_state,
                job_zip_code: nextProps.job.job_zip_code,
                job_type: nextProps.job.job_type,
                salary: nextProps.job.salary,
                post_date: new Date(nextProps.job.post_date),
                deadline: new Date(nextProps.job.deadline),
                job_discription: nextProps.job.job_discription,
            });
        }
    }

    render() {
        return (
            <Styles>
                <Container className="job-discription-container">
                    <div>
                        <Modal show={this.state.apply_show} onHide={this.applyHandleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Upload Your Resume</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <input type="file" name="file" onChange={this.onFileUploadChangeHandler} />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.applyHandleClose}>Close</Button>
                                <Button variant="primary" onClick={this.applyClickeHandler}>Apply</Button>
                            </Modal.Footer>
                        </Modal>
                        {/* --------------------------------------------------------------------------------------------------------------------------------- */}
                        <Modal show={this.state.show} onHide={this.handleClose} >
                            <Modal.Header closeButton>
                                <Modal.Title>Create Job</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group controlId="employer">
                                        <Form.Label className="signup-form-lable">Job Title</Form.Label>
                                        <Form.Control onChange={this.onValueChangeHandler} name="job_title" placeholder="job_title" defaultValue={this.state.job_title} />
                                    </Form.Group>
                                    <Form.Row>
                                        <Form.Group as={Col} >
                                            <Form.Label className="signup-form-lable">Post Date</Form.Label>
                                            <br />
                                            <DatePicker selected={this.state.post_date} name="post_date" className="date_picker" onChange={this.postDateChangeHandler} />
                                            <br />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="salary">
                                            <Form.Label className="signup-form-lable">Salary</Form.Label>
                                            <Form.Control onChange={this.onChangeHandeler} name="salary" type="number" placeholder="salary" defaultValue={this.state.salary} />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label className="signup-form-lable">Application Deadline,</Form.Label>
                                            <br />
                                            <DatePicker selected={this.state.deadline} name="deadline" className="date_picker" onChange={this.deadlineDateChangeHandler} />
                                            <br />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
                                            <Form.Label>Job Category </Form.Label>
                                            <Form.Control as="select" name="job_category" defaultValue={this.getJobTypeOtionId()} >
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
                                            <Form.Control name="city" placeholder="San Jose" onChange={this.onChangeHandeler} defaultValue={this.state.job_city} />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridCity">
                                            <Form.Label>State</Form.Label>
                                            <Form.Control name="state" placeholder="CA" onChange={this.onChangeHandeler} defaultValue={this.state.job_state} />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formGridCity">
                                            <Form.Label>Zip Code</Form.Label>
                                            <Form.Control name="zip_code" placeholder="12345" onChange={this.onChangeHandeler} defaultValue={this.state.job_zip_code} />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Label>Discription</Form.Label>
                                        <Form.Control name="job_discription" as="textarea" placeholder="Discription..." defaultValue={this.state.job_discription} />
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
                        {this.state.application_confirmation_show &&
                            <Alert variant="success" onClose={() => this.setShow(false)} dismissible>
                                <Alert.Heading>Application Submitted!</Alert.Heading>
                            </Alert>
                        }

                        <div className="job-discription-heading">

                            <div className="job-discription-job-title">
                                <Row>
                                    <Col xs={11} md={11}>
                                        {this.state.job_title}
                                    </Col>
                                    {
                                        this.props.user.user_type === "employer" &&
                                        <Col xs={1} md={1}>
                                            <Icon style={{ fontSize: '16px', color: '#08c' }} type="edit" onClick={this.handleShow}></Icon>
                                        </Col>
                                    }

                                </Row>
                                <Row>
                                    <Col xs={11} md={11}>
                                        <div className="job-discription-job-employer">
                                            {this.state.employer}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div>
                                <Row>
                                    <Col xs={0.1} md={0.1}>
                                        <Icon style={{ fontSize: '16px' }} type="bank" ></Icon>
                                    </Col>
                                    <Col xs={2} md={2}>
                                        <div className="job-discription-subheading">
                                            {this.state.job_type}
                                        </div>
                                    </Col>
                                    <Col xs={0.1} md={0.1}>
                                        <Icon style={{ fontSize: '16px' }} type="money-collect" ></Icon>
                                    </Col>
                                    <Col xs={2} md={2}>
                                        <div className="job-discription-subheading">
                                            ${this.state.salary}
                                        </div>
                                    </Col>
                                    <Col xs={0.1} md={0.1}>
                                        <Icon style={{ fontSize: '16px' }} type="home" ></Icon>
                                    </Col>
                                    <Col xs={2} md={2}>
                                        <div className="job-discription-subheading">
                                            {this.state.job_city}
                                        </div>
                                    </Col>
                                    <Col xs={0.1} md={0.1}>
                                        <Icon style={{ fontSize: '16px' }} type="history"></Icon>
                                    </Col>
                                    <Col xs={4} md={4}>
                                        <div className="job-discription-subheading">
                                            Posted on {(new Date(this.state.post_date)).toDateString()}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className="job-discription-apply-box">
                            <Row>
                                <Col xs={10} md={10}>
                                    Applications close on <b>{(new Date(this.state.deadline)).toDateString()} </b>
                                </Col>
                                {this.props.user.user_type === "student" &&
                                    <Col xs={2} md={2}>
                                        <Button variant={this.state.apply_button_state} onClick={this.applyHandleShow}>{this.state.apply_button_text}</Button>
                                    </Col>
                                }
                            </Row>
                        </div>

                        <div className="job-discription-discription-title">
                            Job Responsibilities:
                        </div>
                        <div className="job-discription-discription">
                            {this.state.job_discription}
                        </div>
                    </div>
                    <div className="profile-experience-card-divider"></div>
                </Container>
            </Styles>

        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.auth,
    };
};
//Export The Main Component
export default connect(mapStateToProps, {})(JobDiscription);