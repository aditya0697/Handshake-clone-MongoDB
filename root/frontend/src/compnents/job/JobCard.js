import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Card, CardGroup, Container } from 'react-bootstrap';
import Avatar from 'react-avatar';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {getProfileUrlForEmployer} from './../../redux/actions/profilePictureActions';
import { getProfilePicture } from '../../redux/selectors';

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
`;


class JobCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            apply_show: false,
            job_id: this.props.job.job_id,
            employer: this.props.job.employer,
            job_title: this.props.job.job_title,
            job_city: this.props.job.job_city,
            job_state: this.props.job.job_state,
            job_zip_code: this.props.job.job_zip_code,
            job_type: this.props.job.job_type,
            salary: this.props.job.salary,
            post_date: this.props.job.post_date,
            deadline: this.props.job.deadline,
            job_discription: this.props.job.job_discription
        }
        this.clickHandler = this.clickHandler.bind();
    }
    clickHandler = (e) => {
        e.preventDefault();
        this.props.jobCardClickHandler(this.props.id);
    }
    componentDidMount(){
        if(this.props.job.employer_email){
            
            this.props.getProfileUrlForEmployer(this.props.job.employer_email);
        }
    }
        render() {
           
            return (
                <Container onClick={this.clickHandler}>
                    <Row>
                        <Col sd={4} md={4}>
                            <Avatar name={this.state.employer} src={this.props.job_profile_pic} size={50} round={true} />
                        </Col>
                        <Col sd={8} md={8}>
                            <div className="job-card-postion-name">
                                <span><b>{this.state.job_title}</b></span>
                            </div>
                            <div className="job-card-company-name">
                                <span><a href="">{this.state.employer} - {this.state.job_city}, {this.state.job_state}</a></span>
                            </div>
                            <div className="job-card-jobtype">
                                <span>{this.state.job_type}</span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            )
        }
    }

    const mapStateToProps = (state, ownProps) => {
        return {
            user: state.auth,
            job_profile_pic:  getProfilePicture(state,"employer",ownProps.job.employer_email)
        };
    };
    
    export default connect(mapStateToProps, {getProfileUrlForEmployer})(JobCard);