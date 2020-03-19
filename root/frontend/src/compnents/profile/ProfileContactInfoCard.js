import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Card, CardGroup, Container, ListGroup, InputGroup, FormControl, Button, Modal, Form } from 'react-bootstrap';
import Avatar from 'react-avatar';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import { getPhoneNumber, getEmail, getAddress } from './../../redux/selectors';
import { updateEmployerAddress, updateEmployerPhoneNumber} from './../../redux/actions/employerActions';
import {updateStudentPhoneNumber} from './../../redux/actions/studentActions';


const Styles = styled.div`
   .profile-Contact-card {
        max-height: 400px;
        overflow-y: scroll;
        width: 210;
        padding: 24px;
        box-shadow: 1px 1px 4px 1px rgba(0,0,0,.05), 2px 2px 2px 1px rgba(0,0,0,.05);
        background-color: #fff;
        border-radius: 3px;
   }
   .profile-contact-contact{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 18px;
    font-weight: 550;
    height: 30px;
   }
   .profile-contact-type{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 14px;
    font-weight: 550;
    height: 20px;
   }
   .profile-contact-value{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 12px;
    font-weight: 150;
    height: 20px;
   }
`;

class ProfileContactInfoCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
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
    validation = () => {
        if (this.state.phone_number && this.state.last_name) {
            return true;
        }
        return false;
    }

    onValueChangeHandler = (e) => this.setState({ [e.target.name]: e.target.value });

    isAddressUpdated = () => {
        if(this.props.user.user_type === "student"){
            return false;
        }
        if (this.state.street || this.state.apt_name || this.state.city || this.state.state || this.state.zip_code){
            return true;
        }
        return false;
    }
    updatedAddress = () => {
        const address = {
            "street": this.props.address.street,
            "apt_name": this.props.address.apt_name,
            "city":  this.props.address.city,
            "state":  this.props.address.state,
            "zip_code":  this.props.address.zip_code,
        }
        if (this.state.street){
            address.street = this.state.street;
        }
        if (this.state.apt_name){
            address.apt_name = this.state.apt_name;
        }
        if (this.state.city){
            address.city = this.state.city;
        }
        if (this.state.state){
            address.state = this.state.state;
        }
        if (this.state.zip_code){
            address.zip_code = this.state.zip_code;
        }
        return address;
    }

    saveChangeHandler = (e) => {
        e.preventDefault();
        this.setState({
            show: false,
        })
        if (this.state.phone_number) {
            if(this.props.user.user_type === "employer"){
                this.props.updateEmployerPhoneNumber(this.state.phone_number);
            }
            else {
                this.props.updateStudentPhoneNumber(this.state.phone_number);
            }
        }
        if(this.props.user.user_type === "employer"){
            if (this.isAddressUpdated) {
                this.props.updateEmployerAddress(this.updatedAddress());
            }
        }
        
    }

    render() {

        return (
            <Styles>
                <div className="profile-Contact-card">
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Contact Information</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="">
                                        <Form.Label className="signup-form-lable">Phone Number</Form.Label>
                                        <Form.Control onChange={this.onValueChangeHandler} name="phone_number" defaultValue={this.props.phone_number} />
                                    </Form.Group>
                                </Form.Row>
                                {this.props.user.user_type === "employer" &&
                                    <div>
                                        <Form.Group controlId="formGridAddress1">
                                            <Form.Label>Address</Form.Label>
                                            {
                                                this.props.address && <Form.Control placeholder="1234 Main St" onChange={this.onChangeHandeler} name="street" defaultValue={this.props.address.street} />

                                            }
                                        </Form.Group>

                                        <Form.Group controlId="formGridAddress2">
                                            <Form.Label>Address 2</Form.Label>
                                            {
                                                this.props.address && <Form.Control placeholder="Apartment, studio, or floor" onChange={this.onChangeHandeler} name="apt_name" defaultValue={this.props.address.apt_name} />

                                            }
                                            
                                        </Form.Group>

                                        <Form.Row>
                                            <Form.Group as={Col} controlId="formGridCity">
                                                <Form.Label>City</Form.Label>
                                                {
                                                    this.props.address &&  <Form.Control name="city" placeholder="San Jose" onChange={this.onChangeHandeler} defaultValue={this.props.address.city} />

                                                }
                                               
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="formGridState">
                                                <Form.Label>State</Form.Label>
                                                {
                                                    this.props.address && <Form.Control placeholder="California" name="state" onChange={this.onChangeHandeler} defaultValue={this.props.address.state} />

                                                }
                                               
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="formGridZip">
                                                <Form.Label>Zip</Form.Label>
                                                {
                                                    this.props.address && <Form.Control placeholder="95192" name="zip_code" onChange={this.onChangeHandeler} defaultValue={this.props.address.zip_code} />

                                                }
                                                
                                            </Form.Group>
                                        </Form.Row>
                                    </div>
                                }
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
                    <div className="profile-contact-contact">
                        <Row>
                            <Col xs={10} md={10}>
                                Contact Information
                            </Col>
                            <Col xs={1} md={1}>
                                <Icon type="edit" onClick={this.handleShow}></Icon>
                            </Col>
                        </Row>
                    </div>
                    <div className="profile-contact-type">
                        Email Address
                    </div>
                    <div className="profile-contact-value">
                        {this.props.email}
                    </div>
                    <div className="profile-contact-type">
                        Phone Number
                    </div>
                    <div className="profile-contact-value">
                        {this.props.phone_number}
                    </div>
                    {this.props.user.user_type === "employer" &&
                        <div>
                            <div className="profile-contact-type">
                                Address
                        </div>
                            {this.props.address &&
                                <div>
                                    <div className="profile-contact-value">
                                        {this.props.address.street}
                                    </div>
                                    <div className="profile-contact-value">
                                        {this.props.address.apt_name}
                                    </div>
                                    <div className="profile-contact-value">
                                        {this.props.address.city}, {this.props.address.state}, {this.props.address.zip_code}
                                    </div>
                                </div>
                            }

                        </div>
                    }
                </div>
            </Styles>

        );
    };
}
const mapStateToProps = state => {
    return {
        user: state.auth,
        email: getEmail(state),
        phone_number: getPhoneNumber(state),
        address: getAddress(state.employer.employerData),
    };
};

export default connect(mapStateToProps, {updateEmployerAddress, updateStudentPhoneNumber, updateEmployerPhoneNumber })(ProfileContactInfoCard);