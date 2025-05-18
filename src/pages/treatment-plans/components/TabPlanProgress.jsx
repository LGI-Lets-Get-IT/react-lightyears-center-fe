import React, { useState } from 'react'
import { tasksListData } from '@/utils/data/tasksListData';
import { FiEdit, FiStar, FiTrash2 } from 'react-icons/fi';
import Dropdown from '@/components/shared/Dropdown';
import PerfectScrollbar from "react-perfect-scrollbar";
import Footer from '@/components/shared/Footer';
import ProgressSidebar from './ProgressSidebar';
import { BsCircleFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import LeadsEmptyCard from '@/components/leadsViewCreate/LeadsEmptyCard';
import AddProgressModal from './AddProgressModal';

const actions = [
    { label: "Edit Task", icon: "" },
    { label: "View Task", icon: "" },
    { label: "Delete Task", icon: "" },
]

const TabPlanProgress = () => {
    const [openModal, setOpenModal] = useState(false)
    const { plan } = useSelector(state => state.treatmentPlans)

    return (
        <>
            <div className="content-area-body pb-0">
                {plan && plan.sessions.length > 0 ? (
                    <div className="row note-has-grid" id="note-full-container">
                        {/* {plan?.sessions?.map(({ category, content, date, id, title }) => (
                                    <NoteCard
                                    key={id}
                                    id={id}
                                    title={title}
                                    date={date}
                                    content={content}
                                    category={category}
                                    // handleFavourite={handleFavourite}
                                    // handleDeleteNote={handleDeleteNote}
                                    // filteredCategory={filteredCategory}
                                    // favourites={favourites}
                                    // onCategory={onCategory}
                                    // selectCategory={selectCategory}
                                    />
                                    ))
                                    } */}
                    </div>
                ) : (
                    <LeadsEmptyCard title={'No progress yet!'} description={'There are no progress on this treatment plan'} onClick={() => setOpenModal(true)} />
                )}
                {openModal && <>
                    <AddProgressModal setOpenModal={setOpenModal} />
                    <div className="modal-backdrop fade show" />
                </>
                }
            </div>
        </>

    )
}

export default TabPlanProgress

const NoteCard = ({ title, date, content, category, handleFavourite, handleDeleteNote, filteredCategory, id, favourites, onCategory, selectCategory }) => {

    return (
        <div className="col-xxl-4 col-xl-6 col-lg-4 col-sm-6 single-note-item all-category">
            <div className="card card-body mb-4 stretch stretch-full">
                <span className={`side-stick bg-${getColor(selectCategory.id == id ? selectCategory.name : category)}`}></span>
                <h5 className="note-title text-truncate w-75 mb-1 d-flex align-items-center" data-noteheading={title}>
                    {title}
                    <i className={`point ms-2 fs-7 text-${getColor(selectCategory.id == id ? selectCategory.name : category)}`}><BsCircleFill /></i>
                </h5>
                <p className="fs-11 text-muted note-date">{date}</p>
                <div className="note-content flex-grow-1">
                    <p className="text-muted note-inner-content text-truncate-3-line" data-notecontent={content}>
                        {content}
                    </p>
                </div>
                <div className="d-flex align-items-center gap-1">
                    <span className={`avatar-text avatar-sm ${favourites.includes(id) ? 'favourite' : ''}`} onClick={() => handleFavourite(id)}>
                        <FiStar />
                    </span>
                    <span className="avatar-text avatar-sm" onClick={() => handleDeleteNote(id)}>
                        <FiTrash2 />
                    </span>
                    <div className="ms-auto">
                        <div className="filter-dropdown btn-group category-selector">
                            <a className="nav-link dropdown-toggle category-dropdown label-group p-0" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="true">
                            </a>
                            <div className="dropdown-menu dropdown-menu-right category-menu">
                                {
                                    filteredCategory?.map((name, index) => (
                                        <Link
                                            key={index}
                                            onClick={(e) => onCategory(e, name, id)}
                                            className="note-tasks badge-group-item badge-tasks dropdown-item position-relative category-tasks text-capitalize" href="#">
                                            <span className={`wd-5 ht-5 rounded-circle me-3 bg-${getColor(name)}`}></span>
                                            {name}
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const getColor = (name) => {
    switch (name) {
        case 'tasks':
            return "danger"
        case 'works':
            return "primary"
        case 'social':
            return "info"
        case 'archive':
            return "dark"
        case 'priority':
            return "danger"
        case 'personal':
            return "primary"
        case 'business':
            return "warning"
        case 'important':
            return "success"

        default:
            return null;
    }
}


const List = ({ title, priority, taskType, user_img, priorityColor, priorityBgColor, taskTypeColor, taskTypeBgColor }) => {
    return (
        <li className="single-task-list p-3 mb-3 border border-dashed rounded-3">
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3 me-3">
                    <div className="custom-control custom-checkbox me-2">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheckTask1"
                            data-checked-action="task-action"
                        />
                        <label
                            className="custom-control-label c-pointer"
                            htmlFor="customCheckTask1"
                        />
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <div className="lh-base">
                            <FiStar />
                        </div>
                        <a
                            href="#"
                            className="single-task-list-link"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#tasksDetailsOffcanvas"
                        >
                            <div className="fs-13 fw-bold text-truncate-1-line">
                                {title}
                                <span className={`ms-2 badge bg-${priorityBgColor} text-${priorityColor} text-capitalize`}>
                                    {priority}
                                </span>
                            </div>
                            <div className="fs-12 fw-normal text-muted text-truncate-1-line">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                            </div>
                        </a>
                    </div>
                </div>
                <div className="d-flex flex-shrink-0 align-items-center gap-3">
                    <div className={`badge bg-${taskTypeBgColor} text-${taskTypeColor} d-md-inline-block d-none text-capitalize`}>
                        {taskType}
                    </div>
                    <div className="d-md-inline-block d-none me-3">27 Nov, 2023</div>
                    <div className="avatar-image avatar-md d-sm-inline-block d-none">
                        <img
                            src={user_img}
                            alt="user"
                            className="img-fluid"
                        />
                    </div>
                    <Dropdown dropdownItems={actions} triggerClass='avatar-md' />
                </div>
            </div>
        </li>
    )
}




