import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Card, CardGroup, Container, Jumbotron, Button, Modal, Form, Alert } from 'react-bootstrap';
import { Icon } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import {registerEvent} from './../../redux/actions/eventAction';
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
    .registration-block{
        padding: 5px;
    }
    .subheading-block {
        padding: 5px;
        padding-left: 15px;
    }
  `;

class EventDiscription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            apply_show: false,
            application_confirmation_show: false,
            event_id: this.props.event.event_id,
            employer: this.props.event.employer,
            event_title: this.props.event.event_title,
            event_city: this.props.event.event_city,
            major: this.props.event.major,
            post_date: new Date(),
            deadline: new Date(),
            event_detail: this.props.event.event_detail,
            resume_file: null,
            register_button_state: "primary",
            register_button_text: "Register",
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.applyHandleShow = this.applyHandleShow.bind(this);
        this.applyHandleClose = this.applyHandleClose.bind(this);
    }

    onValueChangeHandler = (e) => this.setState({ [e.target.name]: e.target.value })

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

    registerHandleShow = (e) => {
        e.preventDefault();
        this.setState({
            register_button_state: "success",
            register_button_text: "Registered"
        })
        this.props.registerEvent(this.state.event_id, this.props.user.email);
        // const formData = new FormData();
        // formData.append('student_email', this.props.user.email);
        // formData.append('job_id', this.props.job.job_id);
        // formData.append('resume_file', this.state.resume_file);
        // // http://52.8.254.75:3001/application/apply
        // axios.post('http://localhost:3001/application/apply', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        //     .then((response) => {

        //         this.setState({
        //             application_confirmation_show: true,
        //         });

        //         console.log("Application id: " + response.data.application_id)
        //     }).catch((error) => {
        //         console.log("Application was not submitted.: " + JSON.stringify(error));
        //     });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.event) {
            console.log("Job Discription Updated!!")
            this.setState({
                event_id: nextProps.event.event_id,
                employer: nextProps.event.employer,
                event_title: nextProps.event.event_title,
                event_city: nextProps.event.event_city,
                major: nextProps.event.major,
                post_date: new Date(nextProps.event.post_date),
                deadline: new Date(nextProps.event.deadline),
                event_detail: nextProps.event.event_detail,
            });
        }
    }

    render() {
        return (
            <Styles>
                <Container className="job-discription-container">
                    <div>
                        {/* --------------------------------------------------------------------------------------------------------------------------------- */}
                        <Modal show={this.state.show} onHide={this.handleClose} >
                            <Modal.Header closeButton>
                                <Modal.Title>Create Job</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group controlId="employer">
                                        <Form.Label className="signup-form-lable">Job Title</Form.Label>
                                        <Form.Control onChange={this.onValueChangeHandler} name="event_title" placeholder="job_title" defaultValue={this.state.event_title} />
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
                                            <Form.Control onChange={this.onChangeHandeler} name="salary" type="number" placeholder="salary" defaultValue={this.state.major} />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label className="signup-form-lable">Application Deadline,</Form.Label>
                                            <br />
                                            <DatePicker selected={this.state.deadline} name="deadline" className="date_picker" onChange={this.deadlineDateChangeHandler} />
                                            <br />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formGridCity">
                                            <Form.Label>Place</Form.Label>
                                            <Form.Control name="event_city" placeholder="San Jose" onChange={this.onChangeHandeler} defaultValue={this.state.event_city} />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Label>Event Detail</Form.Label>
                                        <Form.Control name="event_detail" as="textarea" placeholder="Detail..." defaultValue={this.state.event_detail} />
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
                        <div className="job-discription-heading">
                            
                            <div className="job-discription-job-title">
                                <Row>
                                    <Col xs={11} md={11}>
                                        {this.state.event_title}
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
                                <Row className="subheading-block">
                                    <Col xs={0.5} md={0.5}>
                                    <Icon style={{ fontSize: '16px' }} type="calendar"></Icon>
                                    </Col>
                                    <Col xs={3} md={3}>
                                        <div className="job-discription-subheading">
                                            
                                            {"On " + (new Date(this.state.post_date)).toDateString()}
                                        </div>
                                    </Col>
                                    <Col xs={0.5} md={0.5}>
                                    <Icon style={{ fontSize: '16px' }} type="global"></Icon>
                                    </Col>
                                    <Col xs={3} md={3}>
                                        <div className="job-discription-subheading">
                                            {this.state.event_city}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className="job-discription-apply-box">
                            <Row>
                                <Col xs={10} md={10}>
                                    <div className="registration-block">
                                        Registrations close on <b>{(new Date(this.state.deadline)).toDateString()} </b>
                                    </div>
                                </Col>
                                {this.props.user.user_type === "student" &&
                                    <Col xs={2} md={2}>
                                        <Button variant={this.state.register_button_state} onClick={this.registerHandleShow}>{this.state.register_button_text}</Button>
                                    </Col>
                                }
                            </Row>
                        </div>
                        <div className="job-discription-discription-title">
                            Event Detail:
                        </div>
                        <div className="job-discription-discription">
                            {this.state.event_detail}
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
export default connect(mapStateToProps, {registerEvent})(EventDiscription);