import React, { Component } from 'react';
import { Alert, Row, Col, Form, Button } from 'react-bootstrap';
import { Route , withRouter} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { connect } from "react-redux";
import {studentSignIn, employerSignIn} from './../../redux/actions/authActions'
import { getUser } from '../../redux/selectors';

const Styles = styled.div``;

class Signin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            studentEmail: "",
            studentPassword: "",
            employerEmail: "",
            employerPassword: "",
            alertFlag: false,
            activeStudentLogin: true,
            activeEmployerLogin: true,
        };

        this.studentEmailChangeHandler = this.studentEmailChangeHandler.bind(this);
        this.studentPasswordChangeHandler = this.studentPasswordChangeHandler.bind(this);
        this.employerEmailChangeHandler = this.employerEmailChangeHandler.bind(this);
        this.employerPasswordChangeHandler = this.employerPasswordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }
    //student's email change handler to update state variable with the text entered by the user
    studentEmailChangeHandler = (e) => {
        console.log("StudentEmail: "+e.target.value);
        this.setState({
            studentEmail: e.target.value
        })
        if (e.target.value !== ""){
            this.setState({
                activeEmployerLogin: false,
            })
        }else{
            this.setState({
                activeEmployerLogin: true,
            })
        }
    }
    //student's password change handler to update state variable with the text entered by the user
    studentPasswordChangeHandler = (e) => {
        this.setState({
            studentPassword: e.target.value
        })
        if (e.target.value !== ""){
            this.setState({
                activeEmployerLogin: false,
            })
        }else{
            this.setState({
                activeEmployerLogin: true,
            })
        }
    }

    //employer's email change handler to update state variable with the text entered by the user
    employerEmailChangeHandler = (e) => {
        this.setState({
            employerEmail: e.target.value
        })
        if (e.target.value !== ""){
            this.setState({
                activeStudentLogin: false,
            })
        }else{
            this.setState({
                activeStudentLogin: true,
            })
        }
    }
    // employer's password change handler to update state variable with the text entered by the user
    employerPasswordChangeHandler = (e) => {
        this.setState({
            employerPassword: e.target.value
        })
        if (e.target.value !== ""){
            this.setState({
                activeStudentLogin: false,
            })
        }else{
            this.setState({
                activeStudentLogin: true,
            })
        }
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        //prevent page from refresh
        e.preventDefault();
        console.log("Inside submitLogin");
        if (this.state.activeStudentLogin){
            const credential = {
                username: this.state.studentEmail,
                password: this.state.studentPassword
            }
            this.props.studentSignIn(credential)
            // this.performStudentLogin();
        }else{
            const credential = {
                username: this.state.employerEmail,
                password: this.state.employerPassword,
            }
            this.props.employerSignIn(credential);
            // this.performEmployerLogin();
        }
    }

    performStudentLogin = () => {
        console.log("Inside performStudentLogin");
        const data = {
            username: this.state.studentEmail,
            password: this.state.studentPassword
        }
        // this.props.studentSignIn(data);
        axios.defaults.withCredentials = true;
        //make a post request with the user data

        //  'http://localhost:3001/student_signin'

        axios.post('http://52.8.254.75:3001/student_signin', data)
            .then((response) => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        authFlag: true
                    })
                    this.props.login(this.state.studentEmail, null);
                    this.props.history.push("/profile");
                }
            },
            (error) => {
                console.log("Status Code : ", JSON.stringify(error));
                this.setState({
                    alertFlag: true,
                })
            });
    };

    performEmployerLogin = () => {
        console.log("Inside performEmployerLogin");
        const data = {
            username: this.state.employerEmail,
            password: this.state.employerPassword,
        }
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        //  http://localhost:3001/employer_signin

        axios.post('http://52.8.254.75:3001/employer_signin', data)
            .then((response) => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        authFlag: true
                    })
                    this.props.login(null,this.state.employerEmail);
                    this.props.history.push("/profile");
                }
            },
            (error) => {
                console.log("Status Code : ", JSON.stringify(error));
                this.setState({
                    alertFlag: true,
                })
            });
    };

    componentWillReceiveProps(nextProps) {
        console.log("Props received in signin ")
        console.log(nextProps)
        if(nextProps.user){
            if(nextProps.user.error){
                this.setState({
                    alertFlag: true,
                })
            }else if(nextProps.user.email){ 
                // this.props.login(this.state.studentEmail, null);
                localStorage.setItem('user',nextProps.user)
                this.props.history.push("/jobs");
            }
        }
    }


    render() {
        return (
            <Styles>
                <div className="signin-body">
                    <h2><b>Sign In</b></h2>
                    {this.state.alertFlag && <Alert variant="danger">Email or Password is Incorrect!!</Alert>}
                    <Form>
                        <h6><b>Students & Alumni</b></h6>
                        <Form.Group controlId="studentEmail">
                            <Form.Label className="signin-form-lable ">Student Email address</Form.Label>
                            <Form.Control disabled={!this.state.activeStudentLogin} onChange={this.studentEmailChangeHandler} type="email" placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group controlId="studentPassword">
                            <Form.Label className="signin-form-lable ">Password</Form.Label>
                            <Form.Control type="password" disabled={!this.state.activeStudentLogin} onChange={this.studentPasswordChangeHandler} placeholder="Password" />
                        </Form.Group>
                        <h6><b>Employers & Career Centers</b></h6>
                        <Form.Group controlId="employerEmail">
                            <Form.Label className="signin-form-lable ">Company Email address</Form.Label>
                            <Form.Control  disabled={!this.state.activeEmployerLogin} onChange={this.employerEmailChangeHandler}  type="email" placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group controlId="employerPassword">
                            <Form.Label className="signin-form-lable ">Password</Form.Label>
                            <Form.Control  disabled={!this.state.activeEmployerLogin} onChange={this.employerPasswordChangeHandler} type="password" placeholder="Password" />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Button type="submit" onClick={this.submitLogin}>Next</Button>
                            </Col>
                            <div className="signin-signup">
                                <h6>No account? <a className="signin-signup-link" href="" onClick={this.props.signUpHandler.bind(this)}>Sign up here.</a></h6>
                            </div>
                            <Col>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Styles>
        );
    };
}


const mapStateToProps = state => { 

    return { 
       user: state.auth,
    };
  };

export default  withRouter(connect(mapStateToProps,{studentSignIn, employerSignIn})(Signin));