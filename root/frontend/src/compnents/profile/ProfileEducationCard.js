import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Card, CardGroup, Container, ListGroup, InputGroup, Form, FormControl, Button, Modal, Alert } from 'react-bootstrap';
import Avatar from 'react-avatar';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getEducation } from './../../redux/selectors';
import ModelEducation from './ModelEducation';
import { Icon } from 'antd';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addEducation } from './../../redux/actions/studentActions'

const Styles = styled.div`
    .profile-eductionCard-card {
        max-height: 950px;
        overflow-y: scroll;
        padding: 24px;
        box-shadow: 1px 1px 4px 1px rgba(0,0,0,.05), 2px 2px 2px 1px rgba(0,0,0,.05);
        background-color: #fff;
        border-radius: 3px;
    }
    .profile-education-card-divider{
        height:5px;
    }
   .profile-education-card {
        height: 175px;
        max-height: 275px;
        padding: 10px;
        box-shadow: 1px 1px 1px 1px rgba(0,0,0,.05), 1px 1px 1px 1px rgba(0,0,0,.05);
        background-color: #fff;
        border-radius: 3px;
   }
   .profile-education-title{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 20px;
    font-weight: 550;
    height: 30px;
   }
   .profile-education-school{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 20px;
    font-weight: 550;
    height: 30px;
   }
   .profile-education-level{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 18px;
    font-weight: 540;
    height: 30px;
   }
   .profile-education-major{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 18px;
    font-weight: 450;
    height: 30px;
   }
   .profile-education-date{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 16px;
    font-weight: 350;
    height: 30px;
   }
   .profile-education-gpa{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 16px;
    font-weight: 350;
    height: 30px;
   }
   .date_picker{
    z-index: 16000; 
   }
`;

class ProfileEducationCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            alertFlag: false,
            grad_date: new Date(),
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

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

    gradDateChangeHandler = (date) => {
        console.log(date);
        this.setState({
            grad_date: date,
        })
    };

    validation = () => {
        if (this.state.school && this.state.level && this.state.edu_major && this.state.gpa) {
            return true;
        }
        return false;
    }
    getUpdatedState = () => ({
        school: this.state.school,
        level: this.state.level,
        edu_major: this.state.edu_major,
        grad_date: this.state.grad_date.toISOString(),
        gpa: this.state.gpa,
    });

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

    render() {
        let eductionDetails = [];
        if (this.props.education) {
            eductionDetails = this.props.education.map((education, id) => {
                if (!education) {
                    return;
                }
                return (
                    // <div>
                    //     <Modal show={this.state.show} onHide={this.handleClose}>
                    //         <Modal.Header closeButton>
                    //             <Modal.Title>Modal heading</Modal.Title>
                    //         </Modal.Header>
                    //         <Modal.Body>
                    //             <Form>
                    //                 <Form.Group controlId="school">
                    //                     <Form.Label className="signup-form-lable">School</Form.Label>
                    //                     <Form.Control onChange={this.schoolChangeHandler} placeholder={education.school} />
                    //                 </Form.Group>
                    //                 <Form.Row>
                    //                     <Form.Group as={Col} controlId="major">
                    //                         <Form.Label className="signup-form-lable">Major</Form.Label>
                    //                         <Form.Control onChange={this.majorChangeHandler} placeholder={education.edu_major} />
                    //                     </Form.Group>
                    //                     <Form.Group as={Col} controlId="level">
                    //                         <Form.Label className="signup-form-lable">Degree Level</Form.Label>
                    //                         <Form.Control onChange={this.levelChangeHandler} placeholder={education.level} />
                    //                     </Form.Group>
                    //                 </Form.Row>
                    //                 <Form.Row>
                    //                     <Form.Group as={Col} controlId="gradDate">
                    //                         <Form.Label className="signup-form-lable">Grad Date</Form.Label>
                    //                         <br />
                    //                         <DatePicker onChange={this.handleChange} className="date_picker" onChange={this.gradDateChangeHandler} placeholder="Select date" />
                    //                         <br />
                    //                     </Form.Group>
                    //                     <Form.Group as={Col} controlId="gpa">
                    //                         <Form.Label className="signup-form-lable">GPA</Form.Label>
                    //                         <Form.Control onChange={this.levelChangeHandler} type="number" placeholder={education.gpa} />
                    //                     </Form.Group>
                    //                 </Form.Row>
                    //             </Form>
                    //         </Modal.Body>
                    //         <Modal.Footer>
                    //             <Button variant="secondary" onClick={this.handleClose}>
                    //                 Close
                    //                 </Button>
                    //             <Button variant="primary" onClick={this.handleClose}>
                    //                 Save Changes
                    //                 </Button>
                    //         </Modal.Footer>
                    //     </Modal>
                    //     <div className="profile-education-card">
                    //         <div className="profile-education-school">
                    //             <Row>
                    //                 <Col xs={11} md={11}>
                    //                     {education.school}
                    //                 </Col>
                    //                 <Col xs={1} md={1}>
                    //                     <Icon type="edit" onClick={this.handleShow}></Icon>
                    //                 </Col>
                    //             </Row>
                    //         </div>
                    //         <div className="profile-education-level">
                    //             {education.level}
                    //         </div>
                    //         <div className="profile-education-major">
                    //             {"Major in " + education.edu_major}
                    //         </div>
                    //         <div className="profile-education-date">
                    //             {"Graduation date: " + education.grad_date}
                    //         </div>
                    //         <div className="profile-education-gpa">
                    //             {"Cumulative GPA: " + education.gpa}
                    //         </div>
                    //     </div>
                    //     <div className="profile-education-card-divider"></div>
                    // </div> education ={education}
                    <ModelEducation id={id} />
                )
            })
        }

        return (
            <Styles>
                <div className="profile-eductionCard-card ">
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Education</Modal.Title>
                        </Modal.Header>
                            {this.state.alertFlag && <Alert variant="danger">Insert all values</Alert>}
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="school">
                                    <Form.Label className="signup-form-lable">School</Form.Label>
                                    <Form.Control onChange={this.onChangeHandeler} name="school" placeholder="School" />
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="edu_major">
                                        <Form.Label className="signup-form-lable">Major</Form.Label>
                                        <Form.Control onChange={this.onChangeHandeler} name="edu_major" placeholder="Major" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="level">
                                        <Form.Label className="signup-form-lable">Degree Level</Form.Label>
                                        <Form.Control onChange={this.onChangeHandeler} name="level" placeholder="Degree Type" />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="grad_date">
                                        <Form.Label className="signup-form-lable">Grad Date</Form.Label>
                                        <br />
                                        <DatePicker selected={this.state.grad_date} className="date_picker" name="grad_date" onChange={this.gradDateChangeHandler} />
                                        <br />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="gpa">
                                        <Form.Label className="signup-form-lable">GPA</Form.Label>
                                        <Form.Control onChange={this.onChangeHandeler} name="gpa" type="number" placeholder="GPA" />
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
                    <div className="profile-education-title">
                        <Row>
                            <Col xs={11} md={11}>
                                Education
                            </Col>
                            <Col xs={1} md={1}>
                                <Icon type="plus" onClick={this.handleShow}></Icon>
                            </Col>
                        </Row>
                    </div>
                    <div >
                        {eductionDetails}
                    </div>
                </div>
            </Styles>
        );
    };
}
const mapStateToProps = state => {
    return {
        user: state.auth,
        education: getEducation(state.student.studentData)
    };
};

export default connect(mapStateToProps, { addEducation })(ProfileEducationCard);