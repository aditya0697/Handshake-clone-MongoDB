import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Card, CardGroup, Button, Jumbotron, Modal, Form, ListGroup, Alert } from 'react-bootstrap';
import { Icon } from 'antd';
import styled from 'styled-components';
import EventDiscription from './EventDiscription';
import DatePicker from "react-datepicker";
import { connect } from 'react-redux';
import { getEvents, getName } from '../../redux/selectors';
import { fetchEvents, addEvent, registerEvent } from '../../redux/actions/eventAction';
import EventCard from './EventCard';
const Styles = styled.div`
.col-md-8, .col-md-4 {
    padding: 0px;
   
  }
  .job-dashboard-sidebar-col{
    border-right: 1px solid #d9d9d9;
  }

  .dashboard-background{
      height: 585px;
      padding-right: 15px;
      padding-left: 15px;
      box-shadow: 1px 1px 4px 1px rgba(0,0,0,.05), 2px 2px 2px 1px rgba(0,0,0,.05);
      background-color: #fff;
      border-radius: 3px;
      
  }
  .sidebar-backgroung{
    height: 585px;
    margin: 0 auto;
  }

  .job-discription-card {
    max-height: 800px;
    overflow-y: scroll;
    margin: 10px;
    padding: 24px;
    box-shadow: 1px 1px 4px 1px rgba(0,0,0,.05), 2px 2px 2px 1px rgba(0,0,0,.05);
    background-color: #fff;
    border-radius: 3px;
}
.job-create-job{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 20px;
    min-width: 675px;
    font-weight: 550;
    height: 30px;
   }
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
  `;

class EventDashboard extends Component {

    constructor(props) {
        super(props);
        const initial_event = {
            event_id: "",
            employer: "",
            event_title: "",
            event_city: "",
            major: "",
            post_date: new Date(),
            deadline: new Date(),
            event_detail: "",
            addEventModalAlertFlag: false,
        }
        this.state = {
            show: false,
            alertFlag: false,
            deadline: new Date(),
            post_date: new Date(),
            discription_event: initial_event,
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.eventCardClickHandler = this.eventCardClickHandler.bind(this);
    }

    // getJobForDiscription = () => {
    //     if (!this.props.jobs) {
    //         return 
    //     }
    //     return this.props.jobs[this.state.discription_job_id];

    // };

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

    eventCardClickHandler = (id) => {
        console.log("Job id: ", id);
        this.setState({
            discription_event: this.props.events[id],
        })
        console.log("discription_event: " + JSON.stringify(this.state.discription_event));
    };
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

    getUpdatedState = () => ({
        employer: "",
        event_title: this.state.event_title,
        event_city: this.state.event_city,
        major: this.state.major,
        event_detail: this.state.event_detail,
        employer: this.props.name,
        post_date: this.state.post_date,
        deadline: this.state.deadline,
    });
    validation = () => {
        if (this.state.event_title && this.state.event_city && this.state.major && this.state.event_detail) {
            return true;
        }
        return false;
    }

    addEventHandler = (e) => {

        e.preventDefault();
        if (!this.validation()) {
            this.setState({
                addEventModalAlertFlag: true,
            })
            return;
        }
        this.setState({
            show: false,
        })
        if (this.props.user.user_type === "employer") {
            console.log("getUpdatedState: " + JSON.stringify(this.getUpdatedState()));
            this.props.addEvent(this.getUpdatedState(), this.props.user.email);
        }
    }

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
    componentDidMount() {
        if (!this.props.events || this.props.events === []) {
            this.props.fetchEvents(this.props.user);

        }
        if (this.props.events) {
            if (this.props.events.length > 0) {
                this.setState({
                    discription_event: this.props.events[0],
                })
            }
            // this.props.jobs.map( job => {
            //     this.props.fetchProfileUrlForEmployerForJob(job.job_id);
            // })
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps.events: " + JSON.stringify(nextProps.events));
        if (nextProps.events) {
            this.setState({
                discription_event: nextProps.events[0],
                
            })
        }
    };

    render() {
        let eventSidebar = [];
        if (this.props.events) {
            eventSidebar = this.props.events.map((event, id) => {
                if (!event) {
                    return;
                }
                return (
                    <ListGroup.Item as="li" className="job-list-item">
                        <EventCard event={event} id={id} eventCardClickHandler={this.eventCardClickHandler} />
                    </ListGroup.Item>
                )
            });
        };

        return (
            <Styles>
                <div className="dashboard-background" id="employer_modal">
                    {/* --------------------------------------------------------------------------------------------------------------------------------- */}
                    <Modal show={this.state.show} onHide={this.handleClose} >
                        <Modal.Header closeButton>
                            <Modal.Title>Create Event</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.state.addEventModalAlertFlag && <Alert variant="danger">Insert all values</Alert>}
                            <Form>
                                <Form.Group controlId="employer">
                                    <Form.Label className="signup-form-lable">Event Title</Form.Label>
                                    <Form.Control onChange={this.onChangeHandeler} name="event_title" placeholder="Event Title" />
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="start_date">
                                        <Form.Label className="signup-form-lable">Post Date</Form.Label>
                                        <br />
                                        <DatePicker selected={this.state.post_date} name="post_date" className="date_picker" onChange={this.postDateChangeHandler} />
                                        <br />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="salary">
                                        <Form.Label className="signup-form-lable">Major</Form.Label>
                                        <Form.Control onChange={this.onChangeHandeler} name="major" placeholder="Major" />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="end_date">
                                        <Form.Label className="signup-form-lable">Registration Deadline</Form.Label>
                                        <br />
                                        <DatePicker selected={this.state.deadline} name="deadline" className="date_picker" onChange={this.deadlineDateChangeHandler} />
                                        <br />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>Place</Form.Label>
                                        <Form.Control name="event_city" placeholder="San Jose" onChange={this.onChangeHandeler} />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Label> Event Detail</Form.Label>
                                    <Form.Control name="event_detail" as="textarea" placeholder="Discription..." onChange={this.onChangeHandeler} />
                                </Form.Row>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                        </Button>
                            <Button variant="primary" onClick={this.addEventHandler}>
                                Save Changes
                        </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* --------------------------------------------------------------------------------------------------------------------------------- */}
                    <Row>
                        <Col sm={4} md={4} className="job-dashboard-sidebar-col">
                            <div className="sidebar-backgroung">
                                <div className="job-sidebar-container">
                                    <Col>
                                        <div className="jobs-details">
                                            <span><b>Events</b></span>
                                        </div>
                                    </Col>
                                    <ListGroup as="ul" className="job-list-group">
                                        {eventSidebar}
                                    </ListGroup>
                                </div>
                            </div>
                        </Col>
                        <Col sm={8} md={8}>
                            {this.props.user.user_type === "employer" &&
                                <div className="job-discription-card">
                                    <div className="job-create-job">
                                        <Row>
                                            <Col xs={11} md={11}>
                                                Create Event
                                            </Col>
                                            <Col xs={1} md={1}>
                                                <Icon type="plus" onClick={this.handleShow}></Icon>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            }
                            <div className="">
                                {this.state.discription_event &&
                                    <EventDiscription event={this.state.discription_event} />
                                }
                            </div>
                        </Col>
                    </Row>
                </div>
            </Styles>

        )
    }
}
//Export The Main Component

const mapStateToProps = state => {
    return {
        events: getEvents(state),
        user: state.auth,
        name: getName(state),
    };
};
export default connect(mapStateToProps, { addEvent, fetchEvents, registerEvent })(EventDashboard);