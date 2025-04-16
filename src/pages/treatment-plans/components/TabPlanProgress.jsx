import React, { useState } from 'react'
import { tasksListData } from '@/utils/data/tasksListData';
import { FiEdit, FiStar } from 'react-icons/fi';
import Dropdown from '@/components/shared/Dropdown';
import PerfectScrollbar from "react-perfect-scrollbar";
import TaskHeader from './TaskHeader';
import Footer from '@/components/shared/Footer';
import TaskSidebar from './TaskSidebar';
import { Link } from 'react-router-dom';
import { upcomingScheduleList } from '@/utils/data/upcomingScheduleList';
import ImageGroup from '@/components/shared/ImageGroup';

const actions = [
    { label: "Edit Task", icon: "" },
    { label: "View Task", icon: "" },
    { label: "Delete Task", icon: "" },
]
const TabPlanProgress = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const groupedTasks = groupTasksByDate(tasksListData);

    return (
        <div className="d-flex">
            <TaskSidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
            <div className='content-area'>
                <PerfectScrollbar>
                    <div className="ms-4">
                        <div className="">
                            <div className="card stretch stretch-full">
                                <div className="card-body">
                                    {upcomingScheduleList.map(({ date, id, schedule_name, color }) => {
                                            return (
                                                <div key={id} className="p-3 border border-dashed rounded-3 schedule-card">
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex align-items-center gap-3">
                                                            <div className={`wd-50 ht-50 lh-1 d-flex align-items-center justify-content-center flex-column rounded-2 bg-soft-${color} text-${color} schedule-date`}>
                                                                <span className="fs-18 fw-bold mb-1 d-block">{date.day}</span>
                                                                <span className="fs-10 fw-semibold text-uppercase d-block">{date.month}</span>
                                                            </div>
                                                            <div className="text-dark">
                                                                <Link to="#" className="fw-bold mb-2 text-truncate-1-line">{schedule_name}</Link>
                                                                <span className="fs-11 fw-normal text-muted text-truncate-1-line">{date.time}</span>
                                                            </div>
                                                        </div>
                                                        {/* <div className="img-group lh-0 ms-3 justify-content-start d-none d-sm-flex">
                                                            <ImageGroup data={team_members} avatarSize='avatar-md' />
                                                        </div> */}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <Link to="#" className="card-footer fs-11 fw-bold text-uppercase text-center py-4">Upcomming Schedule</Link>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </PerfectScrollbar>
            </div>
        </div>
    )
}

export default TabPlanProgress

const List = ({ title, priority, taskType, priorityColor, priorityBgColor, taskTypeColor, taskTypeBgColor }) => {
    return (
        <li className="single-task-list p-3 mb-3 border border-dashed rounded-3">
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3 me-3">
                    <div className="d-flex align-items-center gap-3">
                        <a
                            href={`/appointments/2`}
                            className="single-task-list-link"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#tasksDetailsOffcanvas"
                        >
                            <div className="fs-13 fw-bold text-truncate-1-line">
                                {title}
                            </div>
                            <div className="fs-12 fw-normal text-muted text-truncate-1-line">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                            </div>
                        </a>
                    </div>
                </div>
                <div className="d-flex flex-shrink-0 align-items-center gap-3">
                    <div className={`badge bg-${taskTypeBgColor} text-${taskTypeColor} d-md-inline-block d-none text-capitalize`}>
                        [Appointment Type]
                    </div>
                    <div className="d-md-inline-block d-none me-3">[Appointment Date]</div>
                </div>
            </div>
        </li>
    )
}


const groupTasksByDate = (tasks) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const groupedTasks = {
        "Recently Assigned": [],
        "Yesterday": [],
    };

    tasks.forEach(task => {
        const taskDate = new Date(task.date);
        if (taskDate.toDateString() === today.toDateString()) {
            groupedTasks["Recently Assigned"].push(task);
        } else if (taskDate.toDateString() === yesterday.toDateString()) {
            groupedTasks["Yesterday"].push(task);
        }
        else {
            const weekStart = getStartOfWeekGroup(taskDate).toDateString();

            if (!groupedTasks[weekStart]) {
                groupedTasks[weekStart] = [];
            }
            groupedTasks[weekStart].push(task);
        }
    });

    return groupedTasks;
};

const getStartOfWeekGroup = (taskDate) => {
    const startOfWeekGroup = new Date(taskDate);
    // Move back to the nearest start of a 7-day block (if today is Day 0, it's the start)
    const dayOffset = taskDate.getDate() % 7;
    startOfWeekGroup.setDate(taskDate.getDate() - dayOffset);
    return startOfWeekGroup;
};




