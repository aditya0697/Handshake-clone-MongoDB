import React, { Component } from 'react';
import { Row, Col, Card, CardGroup, Container, Button, Modal, Form } from 'react-bootstrap';
import { Icon } from 'antd';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getEducationByID } from './../../redux/selectors';
import {updateEducationById} from './../../redux/actions/studentActions'

class ModelEducation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    };
    schoolChangeHandler = (e) => {
        // console.log("StudentEmail: " + e.target.value);
        this.setState({
            school: e.target.value
        })
    }
    majorChangeHandler = (e) => {
        // console.log("StudentEmail: " + e.target.value);
        this.setState({
            major: e.target.value
        })
    }
    levelChangeHandler = (e) => {
        // console.log(": " + e.target.value);
        this.setState({
            level: e.target.value
        })
    }
    gradDateChangeHandler = (date) => {
        console.log(date);
        this.setState({
            grad_date: date,
        })
    }

    handleClose = (e) => {
        this.setState({
            show: false,
        })
    };
    handleShow = (e) => {
        console.log("Inside handleShow");
        this.setState({
            show: true,
        })
    };

    gpaChangeHandler = (e) => {
        this.setState({
            gpa: e.target.value,
        })
    }

    getUpdatedState = () => {
        const education =  {
            "edu_id": this.props.education.edu_id,
            "school": this.props.education.school,
            "edu_major": this.props.education.edu_major,
            "level": this.props.education.level,
            "grad_date": this.props.education.grad_date,
            "gpa": this.props.education.gpa,
        }

        if(this.state.school){
            education.school = this.state.school;
        }
        if(this.state.major){
            education.edu_major = this.state.major;
        }
        if(this.state.level){
            education.level = this.state.level;
        }
        if(this.state.grad_date){
            education.grad_date = this.state.grad_date;
        }
        if(this.state.gpa){
            education.gpa = this.state.gpa;
        }
        return education;
    }

    saveChangeHandler = (e) => {
        e.preventDefault();
        this.setState({
            show: false,
        })
        
        this.props.updateEducationById(this.getUpdatedState(), this.props.id);

    }

    componentWillReceiveProps(nextProps){
        console.log("nextProps recieved in ModalEducation: "+ JSON.stringify(nextProps.education));
        // this.setState({
        //     school: nextProps.education.school,
        //     major: nextProps.education.edu_major,
        //     level: nextProps.education.level,
        //     gradDate: new Date(nextProps.education.grad_date),
        //     gpa: nextProps.education.gpa,
        // })
    }

    render() {
        return (
            <div>
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Education</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="school">
                            <Form.Label className="signup-form-lable">School</Form.Label>
                            <Form.Control onChange={this.schoolChangeHandler} defaultValue={this.props.education.school} />
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} controlId="major">
                                <Form.Label className="signup-form-lable">Major</Form.Label>
                                <Form.Control onChange={this.majorChangeHandler} defaultValue={this.props.education.edu_major} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="level">
                                <Form.Label className="signup-form-lable">Degree Level</Form.Label>
                                <Form.Control onChange={this.levelChangeHandler} defaultValue={this.props.education.level} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="gradDate">
                                <Form.Label className="signup-form-lable">Grad Date</Form.Label>
                                <br />
                                <DatePicker selected={new Date(this.props.education.grad_date)} className="date_picker" onChange={this.gradDateChangeHandler} />
                                <br />
                            </Form.Group>
                            <Form.Group as={Col} controlId="gpa">
                                <Form.Label className="signup-form-lable">GPA</Form.Label>
                                <Form.Control onChange={this.gpaChangeHandler} type="number" defaultValue={this.props.education.gpa} />
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                        </Button>
                    <Button variant="primary" onClick={this.saveChangeHandler}>
                        Save Changes
                        </Button>
                </Modal.Footer>
            </Modal>
            <div className="profile-education-card">
                <div className="profile-education-school">
                    <Row>
                        <Col xs={11} md={11}>
                            {this.props.education.school}
                        </Col>
                        <Col xs={1} md={1}>
                            <Icon type="edit" onClick={this.handleShow}></Icon>
                        </Col>
                    </Row>
                </div>
                <div className="profile-education-level">
                    {this.props.education.level}
                </div>
                <div className="profile-education-major">
                    {"Major in " + this.props.education.edu_major}
                </div>
                <div className="profile-education-date">
                    {"Graduation date: " + this.props.education.grad_date}
                </div>
                <div className="profile-education-gpa">
                    {"Cumulative GPA: " + this.props.education.gpa}
                </div>
            </div>
            <div className="profile-education-card-divider"></div>
        </div>
        )
    };
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps;
    // console.log("Inside mapStateToProps of ModalEducattion: "+ JSON.stringify(ownProps));
    return { 
        education: getEducationByID(state.student.studentData, id),
    };
};

export default connect(mapStateToProps , {updateEducationById}) (ModelEducation);