import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Card, CardGroup, Button, Jumbotron, Modal, Form, ListGroup, Alert } from 'react-bootstrap';
import { Icon } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getApplications } from '../../redux/selectors';
import { fetchApplications } from '../../redux/actions/applicationAction';
import ApplicationCard from './ApplicationCard';

const Styles = styled.div`
    .job-sidebar-container{
        margin: 0 auto;
        overflow-y: scroll;
        height: 585px;
    }
    .job-list-group {
        border: 0px;
    }
    .job-list-item {
        border: 0px;
        &:hover {
            border-left: 4px solid #b3b3b3;
            background-color: #f2f2f2
        }
    }
    .jobs-details{
        height: 40px;
        margin: 10px auto;
        paddinng: 10px;
        padding-left: 15px;
        padding-right: 15px;
   }
   .apllication-dashboard-padding{
        height: 20px;
        margin: 10px auto;
        paddinng: 10px;
   }
`;


class ApplicationDashBoard extends Component {



    componentDidMount (){
        if (!this.props.applications || this.props.applications === []) {
            this.props.fetchApplications(this.props.user);
        }
    }

    render() {
        let ApplicationsListView = [];
        if (this.props.applications) {
            console.log("Applications: "+JSON.stringify(this.props.applications));
            ApplicationsListView = this.props.applications.map((application, id) => {
                if (!application) {
                    return;
                }
                return (
                        <ApplicationCard application={application} id={id} jobCardClickHandler={this.jobCardClickHandler} />
                )
            });
        };
        return (
            <Styles>
                <div>
                    <Row>
                        <Col sm={4} md={4} className="job-dashboard-sidebar-col">
                            <div className="sidebar-backgroung">
                                <div className="job-sidebar-container">
                                    <Col>
                                        <div className="jobs-details">
                                            <br></br>
                                            <span><b>Applications</b></span>
                                        </div>
                                    </Col>
                                    <ListGroup as="ul" className="job-list-group">

                                    </ListGroup>
                                </div>
                            </div>
                        </Col>
                        <Col sm={8} md={8}>
                            {this.props.user.user_type === "employer" &&
                                <div className="job-discription-card">
                                </div>
                            }
                            <div className="">
                                {ApplicationsListView}
                            </div>
                        </Col>
                    </Row>
                </div>
            </Styles>
        )
    }
}
const mapStateToProps = state => {
    return {
        applications: getApplications(state),
        user: state.auth,
    };
};
export default connect(mapStateToProps, {fetchApplications})(ApplicationDashBoard);