import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Card, CardGroup, Container } from 'react-bootstrap';
import Avatar from 'react-avatar';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getProfileUrlForEmployer } from './../../redux/actions/profilePictureActions';
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


class EventCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employer_email:this.props.event.employer_email,
            employer: this.props.event.employer,
            event_id: this.props.event_id,
            event_title: this.props.event.event_title,
            event_city: this.props.event.event_city,
            major: this.props.event.major,
            event_detail: this.props.event.event_detail,
            employer: this.props.event.name,
            post_date: this.props.event.post_date,
            deadline: this.props.event.deadline,
            show: false,
            apply_show: false,
        }
        this.clickHandler = this.clickHandler.bind();
    }
    clickHandler = (e) => {
        e.preventDefault();
        this.props.eventCardClickHandler(this.props.id);
    }
    componentDidMount() {
        if(this.state.employer_email){
            this.props.getProfileUrlForEmployer(this.state.employer_email);
        }
    }
    render() {
        return (
            <Container onClick={this.clickHandler}>
                <Row>
                    <Col sd={4} md={4}>
                        <Avatar name={this.state.employer} src={this.props.event_employer_profile} size={50} round={true} />
                    </Col>
                    <Col sd={8} md={8}>
                        <div className="job-card-postion-name">
                            <span><b>{this.state.event_title}</b></span>
                        </div>
                        <div className="job-card-company-name">
                            <span><a href="">{this.state.employer}</a></span>
                        </div>
                        <div className="job-card-jobtype">
                            <span>On {(new Date(this.state.post_date)).toDateString()}</span>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    return {
        user: state.auth,
        event_employer_profile: getProfilePicture(state,"employer",ownProps.event.employer_email)
    };
};

export default connect(mapStateToProps, { getProfileUrlForEmployer })(EventCard);