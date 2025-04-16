import React from 'react'
import PerfectScrollbar from "react-perfect-scrollbar";
import { FiCheckCircle, FiList, FiPlus, FiWatch } from 'react-icons/fi'

const TaskSidebar = ({ sidebarOpen }) => {
    return (
        <div className={`content-sidebar content-sidebar-md ${sidebarOpen ? "app-sidebar-open" : ""}`}>
            <PerfectScrollbar>
                <div className="content-sidebar-header bg-white sticky-top hstack justify-content-between">
                    <h4 className="fw-bolder mb-0">Progress</h4>
                </div>
                <div className="content-sidebar-header">
                    <a href="#" className="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#addNewTasks">
                        <FiPlus size={17} className='me-2' />
                        <span>Add Progress</span>
                    </a>
                </div>
                <div className="content-sidebar-body">
                    <ul className="nav flex-column nxl-content-sidebar-item">
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <FiList size={16} strokeWidth={1.6} />
                                <span>Upcoming</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <FiWatch size={16} strokeWidth={1.6} />
                                <span>In Progress</span>
                            </a>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link" href="#">
                                <FiActivity size={16} strokeWidth={1.6} />
                                <span>Done</span>
                            </a>
                        </li> */}
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <FiCheckCircle size={16} strokeWidth={1.6} />
                                <span>Done</span>
                            </a>
                        </li>
                    </ul>
                    {/* <ul className="nav flex-column nxl-content-sidebar-item">
                        <li className="px-4 my-2 fs-10 fw-bold text-uppercase text-muted text-spacing-1 d-flex align-items-center justify-content-between">
                            <span>Priority</span>
                            <a href="#">
                                <span className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Add New">  <FiPlus /> </span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <span className="wd-7 ht-7 bg-dark rounded-circle"></span>
                                <span>Low</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <span className="wd-7 ht-7 bg-success rounded-circle"></span>
                                <span>Normal</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <span className="wd-7 ht-7 bg-primary rounded-circle"></span>
                                <span>Medium</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <span className="wd-7 ht-7 bg-warning rounded-circle"></span>
                                <span>High</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <span className="wd-7 ht-7 bg-danger rounded-circle"></span>
                                <span>Urgent</span>
                            </a>
                        </li>
                    </ul> */}
                    {/* <ul className="nav flex-column nxl-content-sidebar-item">
                        <li className="px-4 my-2 fs-10 fw-bold text-uppercase text-muted text-spacing-1 d-flex align-items-center justify-content-between">
                            <span>Overview</span>
                            <a href="#">
                                <span className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Add New"> <FiPlus /> </span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <FiHash size={16} />
                                <span>Overview</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <FiHash size={16} />
                                <span>My Tasks</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <FiHash size={16} />
                                <span>Tasks Activity</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <FiHash size={16} />
                                <span>Tasks Attachments</span>
                            </a>
                        </li>
                    </ul> */}
                </div>
            </PerfectScrollbar>
        </div>
    )
}

export default TaskSidebar