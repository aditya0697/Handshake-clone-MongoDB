import React, { Component } from 'react';
import { Route , withRouter} from 'react-router-dom';
import { Row, Col, Card, CardGroup, Container } from 'react-bootstrap';
import Avatar from 'react-avatar';
import { Icon } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {createConversation } from './../../redux/actions/messageAction';
import {getName, getProfileUrl} from './../../redux/selectors';

const Styles = styled.div`
   .student-card-name {
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        font-size: 20px;
        font-weight: 550;
   }
   .student-card-holder{
        width: 850px,
        height: 80px;
        padding: 5px;
        background-color: #ffff;
   }
   .job-card-jobtype {

   }
   .application-card-holder{
       width: 750px,
       height: 80px;
       padding: 5px;
   }
   .resume-link{
       target: _blank;
   }
   .student-card-education{
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        font-size: 14px;
        font-weight: 500;
   }
   .student-card-experience{
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        font-size: 12px;
        font-weight: 400;
   }
`;


class StudentCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            apply_show: false,
            Email: this.props.student.Email,
            FirstName: this.props.student.FirstName,
            LastName: this.props.student.LastName,
            PhoneNumber: this.props.student.PhoneNumber,
            ProfileUrl: this.props.student.ProfileUrl,
            CareerObjective: this.props.student.CareerObjective,
            Skills: this.props.student.Skills,
            Education: this.props.student.Educations[0],
        }
        this.clickHandler = this.clickHandler.bind();
    }

    clickHandler = (e) => {
        e.preventDefault();
        this.props.studentCardClickHandler(this.props.id);
    }

    startConversationHandler = (e) => {
        e.preventDefault()
        this.props.createConversation(this.props.user,this.props.student,this.props.userName,this.props.userProfileUrl);
        this.props.history.push("/messages");
    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps.student: " + JSON.stringify(nextProps.student));
        if (nextProps.student) {
            this.setState({
                Email: nextProps.student.Email,
                FirstName: nextProps.student.FirstName,
                LastName: nextProps.student.LastName,
                PhoneNumber: nextProps.student.PhoneNumber,
                ProfileUrl: nextProps.student.ProfileUrl,
                CareerObjective: nextProps.student.CareerObjective,
                Skills: nextProps.student.Skills,
                Education: nextProps.student.Educations[0],
            })
        }
    }
    render() {
        return (
            <Styles>
                <Container  className="student-card-holder">
                    <div className="student-card-holder">
                        <Row>
                            <Col sd={2} md={2}>
                                <Avatar onClick={this.clickHandler} name={this.state.FirstName + " " + this.state.LastName} src={this.state.ProfileUrl} size={75} round={true} />
                            </Col>

                            <Col sd={8} md={8}>
                                <Row className="student-card-name">
                                    <Col sd={11} md={11}>
                                        <span><b>{this.state.FirstName + " " + this.state.LastName}</b></span>
                                    </Col>
                                    <Col sd={1} md={1}>
                                        <Icon type="message" onClick={this.startConversationHandler}></Icon>
                                    </Col>
                                </Row>
                                <div className="student-card-education">
                                    <span>{this.state.Education.School}</span>
                                </div>
                                <div className="student-card-education">
                                    <span>{this.state.Education.Level} in {this.state.Education.Major}</span>
                                </div>
                                {
                                    this.state.Experience &&
                                    <div className="student-card-experience">
                                        <span>Worked at {this.state.Experience.Employer}</span>
                                    </div>
                                }
                            </Col>
                        </Row>
                    </div>
                </Container>

            </Styles>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth,
        userName: getName(state),
        userProfileUrl: getProfileUrl(state),

        // job_profile_pic: getProfileUrlForEmployerForJob(state.job),
    };
};

export default withRouter(connect(mapStateToProps, {createConversation})(StudentCard));