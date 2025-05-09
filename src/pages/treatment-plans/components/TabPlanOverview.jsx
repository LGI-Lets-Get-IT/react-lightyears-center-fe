import React from 'react'
import { FiArrowRight,FiCheck, FiFileText,} from 'react-icons/fi'
import { useSelector } from 'react-redux'


const TabPlanOverview = () => {
    const { plan }= useSelector(state => state.treatmentPlans);

    return (
        <div className="tab-pane fade active show" id="overviewTab">
            <div className="row">
                {/* <div className="col-lg-12">
                    <div className="card stretch stretch-full">
                        <div className="card-body task-header d-lg-flex align-items-center justify-content-between">
                            <div className="mb-4 mb-lg-0">
                                <h4 className="mb-3 fw-bold text-truncate-1-line">Duralux || CRM Applications & Admin Dashboar</h4>
                                <span className="badge bg-soft-primary text-primary me-2">In Prograss</span>
                            </div>
                            <div className="d-flex gap-2">
                                <button className="btn btn-icon" data-bs-toggle="tooltip" title="Print treatment plan report" onClick={generateTreatmentPlanReport}>
                                    <FiPrinter size={16} strokeWidth={1.6} />
                                </button>
                                <button  className="btn btn-icon" data-bs-toggle="tooltip" title="Mark Plan as Complete" onClick={generateTreatmentPlanReport} >
                                    <FiCheckCircle size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="">
                    <div className="card ">
                        <div className="card-header">
                            <h5 className="card-title">Plan Info</h5>
                        </div>
                        <div className="card-body">
                            <p>{plan?.presentProblem}</p>
                            <hr/>
                            <h6>Programs</h6>
                            <ul className="list-unstyled text-muted mb-0">
                                {plan?.programs?.length > 0 && plan?.programs?.map(({ id, treatmentName,sessionDuration, remainingSession, sessionFrequency, therapistName, aimOfTreatment, isCompleted }) => {
                                    return (
                                    <li key={id} className="d-flex align-items-start mb-3">
                                        <span className={`avatar-text avatar-sm ${isCompleted ? 'bg-gray-100' : 'bg-soft-success text-success'} me-3`}>
                                            <FiCheck className='fs-10' />
                                        </span>
                                        <span>{treatmentName} - {sessionDuration} minutes ({remainingSession} of {sessionFrequency} sessions completed) - {therapistName} - <strong>Goal:</strong> {aimOfTreatment}</span>
                                    </li>
                                )
                                })}
                            </ul>
                            <hr/>
                            <h6>Target Behaviors</h6>
                            <div
                                className="accordion proposal-faq-accordion"
                                id="accordionFaqGroup"
                            >
                                {plan?.targets?.length > 0 && plan?.targets?.map(({ id, targetBehavior, currentAbility, shortTermTarget, longTermTarget, mediaTools }) => {
                                    return (
                                        <AccordionItem
                                            key={id}
                                            id={id}
                                            header={targetBehavior}
                                            currentAbility={currentAbility}
                                            shortTermTarget={shortTermTarget}
                                            longTermTarget={longTermTarget}
                                            mediaTools={mediaTools}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    {/* <div className="card stretch stretch-full">
                        <div className="card-header">
                            <h5 className="card-title">Checklist</h5>
                            <Dropdown triggerClass='avatar-md' triggerPosition={"25, 25"} tooltipTitle={"Options"} dropdownItems={checkListOptions} />
                        </div>
                        <div className="card-body task-checklist">
                            <CheckList />
                        </div>
                    </div> */}
                    {/* <div className="card stretch stretch-full">
                        <div className="card-header">
                            <h5 className="card-title">Topics</h5>
                            <a href="#" className="btn btn-md btn-light-brand">
                                <FiPlus size={16} className='me-2' />
                                <span>Add New Topic</span>
                            </a>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-xxl-6">
                                    <Card
                                        title="How to upload data to the system?"
                                        link="#"
                                    />
                                    <Card
                                        title="How to draw a land plot on a map?"
                                        link="#"
                                    />
                                    <Card
                                        title="How to to view expire services?"
                                        link="#"
                                    />
                                    <Card
                                        title="How to integrate new web applications?"
                                        link="#"
                                    />
                                    <Card
                                        title="How do I set the geometry of an object?"
                                        link="#"
                                    />
                                </div>
                                <div className="col-xxl-6">
                                    <Card
                                        title="How to upload data to the system?"
                                        link="#"
                                    />
                                    <Card
                                        title="How to draw a land plot on a map?"
                                        link="#"
                                    />
                                    <Card
                                        title="How to to view expire services?"
                                        link="#"
                                    />
                                    <Card
                                        title="How to integrate new web applications?"
                                        link="#"
                                    />
                                    <Card
                                        title="How do I set the geometry of an object?"
                                        link="#"
                                    />
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
                {/* <div className="col-xxl-4 col-xl-6">
                    <div className="card stretch stretch-full">
                        <div className="card-body task-info">
                            <div className="mb-4">
                                <h5 className="card-title mb-1">Plan Info</h5>
                                <span className="fs-12 fw-normal text-muted d-block">Created at 2023-02-12 08:47:47</span>
                            </div>
                            <div className="task-info-list">
                                <div className="row align-items-center mb-3 task-list-row">
                                    <div className="col-6">
                                        <FiStar size={16} strokeWidth={1.7} className='me-2' />
                                        <span className="fw-semibold">Planned By:</span>
                                    </div>
                                    <div className="col-6 d-flex">
                                        <span className="border-bottom border-bottom-dashed border-gray-5">{plan?.psychologistName}</span>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-3 task-list-row">
                                    <div className="col-6">
                                        <FiStar size={16} strokeWidth={1.7} className='me-2' />
                                        <span className="fw-semibold">Treatment Programs To Be Done:</span>
                                    </div>
                                    <div className="col-6 d-flex">
                                        <span className="border-bottom border-bottom-dashed border-gray-5">{plan?.programs.length} programs</span>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-3 task-list-row">
                                    <div className="col-6">
                                        <FiStar size={16} strokeWidth={1.7} className='me-2' />
                                        <span className="fw-semibold">Total Target Behaviors:</span>
                                    </div>
                                    <div className="col-6 d-flex">
                                        <span className="border-bottom border-bottom-dashed border-gray-5">{plan?.targets.length} behavior targets</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card stretch stretch-full">
                        <div className="card-body task-tags">
                            <div className="mb-4">
                                <h5 className="card-title mb-1">Tags</h5>
                                <span className="fs-12 fw-normal text-muted d-block">Tags label for tasks</span>
                            </div>
                            <MultiSelectTags options={tags} defaultSelect={[tags[0], tags[3], tags[8], tags[6]]} />
                        </div>
                    </div>
                    <div className="card stretch stretch-full">
                        <div className="card-body task-assignees">
                            <div className="mb-4">
                                <h5 className="card-title mb-1">Assignees</h5>
                                <span className="fs-12 fw-normal text-muted d-block">Assigne member to this tasks</span>
                            </div>
                            <MultiSelectImg options={taskAssigneeOptions} defaultSelect={[taskAssigneeOptions[1], taskAssigneeOptions[3], taskAssigneeOptions[4]]} />
                        </div>
                    </div>
                    <div className="card stretch stretch-full">
                        <div className="card-body task-followers">
                            <div className="mb-4">
                                <h5 className="card-title mb-1">Followers</h5>
                                <span className="fs-12 fw-normal text-muted d-block">5 followers for this task</span>
                            </div>
                            <MultiSelectImg options={taskAssigneeOptions} defaultSelect={[taskAssigneeOptions[1], taskAssigneeOptions[3], taskAssigneeOptions[4]]} />
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default TabPlanOverview

const AccordionItem = ({ id, header, ...content }) => {
    return (
        <div className="accordion-item">
            {console.log('content', content)}
            <h2 className="accordion-header" id={`flush-heading${id}`}>
                <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#flush-collapse${id}`}
                    aria-expanded="false"
                    aria-controls={`flush-collapse${id}`}
                >
                    {header}
                </button>
            </h2>
            <div
                id={`flush-collapse${id}`}
                className="accordion-collapse collapse"
                aria-labelledby={`flush-heading${id}`}
                data-bs-parent="#accordionFaqGroup"
            >
            <div className="accordion-body bg-light p-3 rounded">
                <p>💪 <strong>Current Ability:</strong> <span className="text-primary">{content.currentAbility}</span></p>
                <p>🎯 <strong>Target:</strong> Grow to <span className="text-success">{content.shortTermTarget}</span> soon, aiming for <span className="text-warning">{content.longTermTarget}</span> in the long run.</p>
                <p>🛠️ <strong>Tools:</strong> {content.mediaTools}</p>
                </div>
            </div>
        </div>
    );
}

const Card = ({ icon: Icon, title, link }) => {
    return (
        <div className="card border border-gray-2 rounded-2 my-2 overflow-hidden">
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <div className="wd-50 ht-50 bg-gray-100 me-3 d-flex align-items-center justify-content-center">
                        {/* <Icon /> */}
                        <FiFileText />
                    </div>
                    <a href={link}>{title}</a>
                </div>
                <a href={link} className="avatar-text avatar-sm me-3">
                    <FiArrowRight />
                </a>
            </div>
        </div>
    );
};
