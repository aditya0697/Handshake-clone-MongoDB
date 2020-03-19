import React, { Component } from 'react';
import { Route , Redirect} from 'react-router-dom';
import { Row, Col, Card, CardGroup, Container } from 'react-bootstrap';
import Avatar from 'react-avatar';
import { Icon } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { } from './../../redux/actions/jobActions';
import { getProfileUrlForEmployerForJob } from '../../redux/selectors';

const Styles = styled.div`
   .job-card-postion-name {
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        font-size: 20px;
        font-weight: 700;
   }
   .job-card-company-name {

   }
   .job-card-jobtype {

   }
   .application-card-holder{
       width: 450px,
       height: 80px;
       padding: 5px;
   }
   .resume-link{
       target: _blank;
   }
`;


class ApplicationCard extends Component {


    constructor(props) {
        super(props);
        this.state = {
            show: false,
            apply_show: false,
            application_id: this.props.application.application_id,
            job_id: this.props.application.job_id,
            employer: this.props.application.employer,
            job_title: this.props.application.job_title,
            job_city: this.props.application.job_city,
            job_state: this.props.application.job_state,
            job_type: this.props.application.job_type,
            resume: this.props.application.resume,
        }
        this.clickHandler = this.clickHandler.bind();
    }

    resumeClickHandler = (e) => {
        e.preventDefault();
        return( <Redirect to={this.state.resume} />);
    }
    clickHandler = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <Styles>
                <Container onClick={this.clickHandler} className="application-card-holder">
                    <div className="application-card-holder">
                        <Row>
                            <Col sd={2} md={2}>
                                <Avatar name={this.state.employer} src="" size={75} round={false} />
                            </Col>

                            <Col sd={8} md={8}>
                                <Row className="job-card-postion-name">
                                    <Col sd={8} md={8}>
                                        <span><b>{this.state.job_title}</b></span>
                                    </Col>
                                    {this.props.user.user_type === "employer" &&
                                        <Col sd={1} md={1}>
                                            <Icon type="edit" onClick={this.handleShow}></Icon>
                                        </Col>
                                    }
                                </Row>
                                <div className="job-card-company-name">
                                    <span><a href="">{this.state.employer} - {this.state.job_city}, {this.state.job_state}</a></span>
                                </div>
                                <div className="job-card-jobtype">
                                    <span>Full Time</span>
                                </div>
                                <div>
                                    <Row>

                                        <Col sd={7} md={7}>
                                            <Icon type="audit" onClick={this.handleShow}></Icon>
                                            <span>Status: Submitted</span>
                                        </Col>
                                 
                                        <Col sd={3} md={3}>
                                            <Icon type="audit" onClick={this.handleShow}></Icon>
                                            <span> <a  href={ this.state.resume} target="_blank" rel="noopener noreferrer"> resume </a></span>
                                        </Col>
                                    </Row>
                                </div>
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
        // job_profile_pic: getProfileUrlForEmployerForJob(state.job),
    };
};

export default connect(mapStateToProps, {})(ApplicationCard);