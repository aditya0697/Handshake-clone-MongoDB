import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Pagination, Button, ListGroup, Alert } from 'react-bootstrap';
import { Icon } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getAllStudentsList } from '../../redux/selectors';
import { getAllStudents } from '../../redux/actions/studentTabAction';
import StudentCard from './StudentCard';

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
   .student-card-container{
        margin: 10px auto;
   }
   .student-card-list-view{
        height: 525px;
        margin: 10px auto;
        paddinng: 10px;
        overflow-y: scroll;
   }
   .students-pagination{
        text-align: center;
        overflow-x: scroll;
        padding-left: 15px;
   }
`;


class StudentDashBoard extends Component {

    constructor(props) {
        super();
        this.state = {
            activePage: 1,
            totalDocs: 1,
            totalPages: 1,
            limit: 5,
            students_list: []
        }
        // this.refreshClickListner = this.refreshClickListner.bind(this);
    }

    handlePageNext = (e) => {
        e.preventDefault();
        var page = 1;
        var limit = 5;
        if (this.props.allStudents) {

            if (this.props.allStudents.nextPage) {
                page = this.props.allStudents.nextPage
            }
            if (this.props.allStudents.limit) {
                limit = this.props.allStudents.limit;
            }
        }
        console.log("handlePageNext allStudents: ", JSON.stringify(this.props.allStudents));
        console.log("handlePageNext page :", page);
        console.log("handlePageNext limit :", limit);
        this.props.getAllStudents(this.props.allStudents, page, limit);

    }

    handlePagePrevious = (e) => {
        e.preventDefault();
        this.props.getAllStudents(this.props.allStudents, this.state.prevPage, this.state.limit);
        // var page = 1;
        // var limit = 5;
        // if (this.st.allStudents) {
        //     if (this.props.allStudents.prevPage) {
        //         page = this.props.allStudents.prevPage
        //     }
        //     if (this.props.allStudents.limit) {
        //         limit = this.props.allStudents.limit;
        //     }
        // }
        // this.props.getAllStudents(this.props.allStudents, page, limit);

    }
    handlePageLast = (e) => {
        e.preventDefault();
    }

    handlePageFirst = (e) => {
        e.preventDefault();
    }

    refreshClickListner = (e) => {
        e.preventDefault();
        this.props.getAllStudents();
    }
    componentDidMount() {
        if (this.props.students_list === []) {
            this.props.getAllStudents();
        } else {
            this.setState({
                students_list: this.props.students_list
            })
            if (this.props.allStudents) {
                this.setState({
                    totalDocs: this.props.allStudents.totalDocs,
                    totalPages: this.props.allStudents.totalPages,
                    limit: this.props.allStudents.limit,
                    nextPage: this.props.allStudents.nextPage,
                    prevPage: this.props.allStudents.prevPage,
                    activePage: this.props.allStudents.page,
                });
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log("nextProps.students_list: " + JSON.stringify(nextProps.allStudents.page));
        if (nextProps.allStudents.page) {
            this.setState({
                totalDocs: nextProps.allStudents.totalDocs,
                totalPages: nextProps.allStudents.totalPages,
                limit: nextProps.allStudents.limit,
                nextPage: nextProps.allStudents.nextPage,
                prevPage: nextProps.allStudents.prevPage,
                activePage: nextProps.allStudents.page,
                students_list: nextProps.students_list
            })
        }
    }
    render() {
        let StudentListView = [];
        if (!this.props.students_list == []) {
            // console.log("Students: " + JSON.stringify(this.props.students_list));
            // this.setState({
            //     students_list: this.props.students_list
            // })
            StudentListView = this.state.students_list.map((student, id) => {
                if (!student) {
                    return;
                }
                return (
                    <div className="student-card-container">
                        <StudentCard student={student} id={id} jobCardClickHandler={this.jobCardClickHandler} />
                    </div>
                )
            });
        } else {
            this.props.getAllStudents(this.state.activePage, this.state.limit);
            console.log("Students in Else : " + JSON.stringify(this.props.students_list));
        }
        let active = 1;
        let items = [];
        for (let number = 1; number <= 35; number++) {
            items.push(
                <Pagination.Item key={number} active={number === active}>
                    {number}
                </Pagination.Item>,
            );
        }
        return (
            <Styles>
                <div>
                    <Row>
                        <Col sm={3} md={3} className="job-dashboard-sidebar-col">
                            <div className="sidebar-backgroung">
                                <div className="job-sidebar-container">
                                    <Col>
                                        <div className="jobs-details">
                                            <br></br>
                                            <span><b>Students</b></span>
                                        </div>
                                    </Col>
                                    <ListGroup as="ul" className="job-list-group">

                                    </ListGroup>
                                </div>
                            </div>
                        </Col>
                        <Col sm={8} md={8}>
                            <div className="student-card-list-view">
                                {StudentListView}
                            </div>
                            <div className="students-pagination">
                                <Pagination >
                                    <Pagination.First onClick={this.handlePageFirst} />
                                    <Pagination.Prev onClick={this.handlePagePrevious} />
                                    <Pagination.Item key={this.state.activePage} active={true}>
                                        {this.state.activePage}
                                    </Pagination.Item>
                                    <Pagination.Next onClick={this.handlePageNext} />
                                    <Pagination.Last onClick={this.handlePageLast} />
                                </Pagination>
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
        students_list: getAllStudentsList(state.allStudents),
        user: state.auth,
        allStudents: state.allStudents,
    };
};
export default connect(mapStateToProps, { getAllStudents })(StudentDashBoard);