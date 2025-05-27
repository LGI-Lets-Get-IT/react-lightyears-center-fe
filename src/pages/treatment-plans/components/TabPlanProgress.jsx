import React, { useState } from "react";
import {
  FiDownload,
  FiEdit3,
  FiPlus,
  FiStar,
  FiTrash2,
} from "react-icons/fi";
import Dropdown from "@/components/shared/Dropdown";
import { BsCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import LeadsEmptyCard from "@/components/leadsViewCreate/LeadsEmptyCard";
import AddProgressModal from "./AddProgressModal";
import { Link } from "react-router-dom";
import useFilterByPermission from "@/hooks/useFilterByPermission";
import { PERMISSIONS } from "@/shared/permissionsConstant";

const TabPlanProgress = ({ id }) => {
  const { hasPermission, filterItemsByPermission } = useFilterByPermission();
  const { plan } = useSelector((state) => state.treatmentPlans);
  const [openModal, setOpenModal] = useState(false);

  const getActions = (id) => [
    {
      label: "Download",
      icon: <FiDownload />,
      //   onClick: () => handleDownloadReport()
    },
    { label: "Edit", icon: <FiEdit3 />, onClick: () => setOpenModal(true) },
    { label: "Delete", icon: <FiTrash2 />, onClick: () => setOpenModal(true) },
  ];

  const permittedActions = filterItemsByPermission(getActions(id));

  return (
    <>
      <div className="content-area-body pb-0">
        {plan && plan.sessions?.length > 0 ? (
          <>
            {hasPermission(PERMISSIONS.TREATMENT_SESSIONS.CREATE) &&
              <button
                className="btn btn-primary mb-4"
                onClick={() => setOpenModal(true)}
              >
                <FiPlus size={16} className="me-2" />
                <span>Add Progress</span>
              </button>
            }
          {plan.sessions.map(
            ({
              id,
              shortTermGoals,
              activities,
              progress,
              appointment,
              program,
            }) => (
              <div
                key={id} // ✅ key added here
                className="accordion proposal-faq-accordion"
                id={`accordionProgressGroup-${id}`}
              >
                <AccordionItem
                  id={id}
                  header={`[${appointment?.appointmentType}] ${appointment?.title}`}
                  appointment={appointment}
                  program={program}
                  shortTermGoals={shortTermGoals}
                  activities={activities}
                  progress={progress}
                />
              </div>
            )
          )}
          </>
        ) : (
          <LeadsEmptyCard
            title="No progress yet!"
            description="There are no progress on this treatment plan"
            onClick={() => setOpenModal(true)}
          />
        )}

        {openModal && (
          <>
            <AddProgressModal setOpenModal={setOpenModal} />
            <div className="modal-backdrop fade show" />
          </>
        )}
      </div>
    </>
  );
};

export default TabPlanProgress;

const NoteCard = ({ title, date, content, permittedActions }) => {
  return (
    <div className="col-xxl-4 col-xl-6 col-lg-4 col-sm-6 single-note-item all-category">
      <div className="card card-body mb-4 stretch stretch-full">
        <span className={`side-stick bg-success`}></span>
        <h5
          className="note-title text-truncate w-75 mb-1 d-flex align-items-center"
          data-noteheading={title}
        >
          {title}
          <i className={`point ms-2 fs-7`}>
            <BsCircleFill />
          </i>
        </h5>
        <p className="fs-11 text-muted note-date">{date}</p>
        <div className="note-content flex-grow-1">
          <p
            className="text-muted note-inner-content text-truncate-3-line"
            data-notecontent={content}
          >
            {content}
          </p>
        </div>
        <div className="d-flex align-items-center gap-1">
          <span className={`avatar-text avatar-sm`} onClick={() => {}}>
            <FiDownload />
          </span>
          <div className="ms-auto">
            <div className="filter-dropdown btn-group category-selector">
              <a
                className="nav-link dropdown-toggle category-dropdown label-group p-0"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="true"
              ></a>
              <div className="dropdown-menu dropdown-menu-right category-menu">
                {permittedActions.length > 0 &&
                  permittedActions.map((action, index) => (
                    <Link
                      key={index}
                      onClick={action.onClick}
                      className="note-tasks badge-group-item badge-tasks dropdown-item position-relative category-tasks text-capitalize"
                    >
                      {action.icon}
                      <span></span>
                    </Link>
                  ))}
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
    case "tasks":
      return "danger";
    case "works":
      return "primary";
    case "social":
      return "info";
    case "archive":
      return "dark";
    case "priority":
      return "danger";
    case "personal":
      return "primary";
    case "business":
      return "warning";
    case "important":
      return "success";

    default:
      return null;
  }
};

const List = ({
  title,
  priority,
  taskType,
  user_img,
  priorityColor,
  priorityBgColor,
  taskTypeColor,
  taskTypeBgColor,
}) => {
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
                <span
                  className={`ms-2 badge bg-${priorityBgColor} text-${priorityColor} text-capitalize`}
                >
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
          <div
            className={`badge bg-${taskTypeBgColor} text-${taskTypeColor} d-md-inline-block d-none text-capitalize`}
          >
            {taskType}
          </div>
          <div className="d-md-inline-block d-none me-3">27 Nov, 2023</div>
          <div className="avatar-image avatar-md d-sm-inline-block d-none">
            <img src={user_img} alt="user" className="img-fluid" />
          </div>
          <Dropdown dropdownItems={actions} triggerClass="avatar-md" />
        </div>
      </div>
    </li>
  );
};

const AccordionItem = ({ id, header, ...content }) => {
  return (
    <div className="accordion-item">
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
          <div>
            <p className="fw-bold">
              📅 Linked Appointment:{" "}
              <a
                className="fw-normal"
                href={`/appointments/${content.appointment?.id}`}
              >
                [{content.appointment?.appointmentType}]{" "}
                {content.appointment?.title}
              </a>
            </p>
          </div>
          <p className="fw-bold">
            🧠 Therapy Name:{" "}
            <span className="fw-normal">
              {content.program.treatmentType.name} (
              {content.program.therapist.fullName})
            </span>
          </p>
          {/* <p className="fw-bold">
            🧠 Therapist Name:{" "}
            <span className="fw-normal">
              {content.program.therapist.fullName}
            </span>
          </p> */}
          <hr />
          {/* Short-Term Goals */}
          {content.shortTermGoals?.length > 0 && (
            <div>
              <p className="fw-bold">🎯 Short-term Goals:</p>
              <ul className="list-disc list-inside text-sm">
                {content.shortTermGoals.map((goal, idx) => (
                  <li key={idx}>{goal}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Activities */}
          {content.activities?.length > 0 && (
            <div>
              <p className="fw-bold">📘 Activities:</p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {content.activities.map((activity, idx) => (
                  <li key={idx}>{activity}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Progress */}
          {content.progress?.length > 0 && (
            <div>
              <p className="fw-bold">📊 Progress:</p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {content.progress.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
