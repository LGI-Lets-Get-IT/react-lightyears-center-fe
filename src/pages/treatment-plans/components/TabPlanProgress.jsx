import React, { useState } from "react";
import { FiDownload, FiEdit3, FiPlus, FiStar, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import LeadsEmptyCard from "@/components/leadsViewCreate/LeadsEmptyCard";
import AddProgressModal from "./AddProgressModal";
import useFilterByPermission from "@/hooks/useFilterByPermission";
import { PERMISSIONS } from "@/shared/permissionsConstant";
import { generateDailyProgressReport } from "@/store/slice/fileSlice";
import useConfirmation from "@/hooks/useConfirmation";
import {
  deleteSessionByIds,
  fetchAllSessionByPlanId,
} from "@/store/slice/treatmentSessionSlice";

const TabPlanProgress = ({ id }) => {
  const dispatch = useDispatch();
  const { hasPermission } = useFilterByPermission();
  const { plan } = useSelector((state) => state.treatmentPlans);
  const [openModal, setOpenModal] = useState(false);
  const { showConfirmation, ConfirmationDialog } = useConfirmation();

  const handleConfirmDelete = (sessionId) => {
    dispatch(
      fetchAllSessionByPlanId({
        params: {
          planId: plan?.id,
        },
      })
    );

    showConfirmation(
      "Are you sure to delete this treatment session?",
      () => {
        dispatch(deleteSessionByIds({ sessionIds: [sessionId] }))
          .unwrap()
          .then(() => {
            dispatch(
              fetchAllSessionByPlanId({
                params: {
                  planId: plan?.id,
                },
              })
            );
          })
          .catch((error) => console.error("Handle error:", error));
      },
      () => {}
    );
  };

  const handleDownloadDailyReport = (sessionId) => {
    dispatch(generateDailyProgressReport(sessionId)).then((response) => {
      const blob = new Blob([response.payload], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${plan?.client?.fullName}_DAILY-PROGRESS-REPORT.pdf`; // Set your desired filename here
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <>
      <div className="content-area-body pb-0">
        {plan && plan.sessions?.length > 0 ? (
          <>
            {hasPermission(PERMISSIONS.TREATMENT_SESSIONS.CREATE) && (
              <button
                className="btn btn-primary mb-4"
                onClick={() => setOpenModal(true)}
              >
                <FiPlus size={16} className="me-2" />
                <span>Add Progress</span>
              </button>
            )}
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
                    handleDownload={() => handleDownloadDailyReport(id)}
                    handleDelete={() => handleConfirmDelete(id)}
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
      <ConfirmationDialog />
    </>
  );
};

export default TabPlanProgress;

const AccordionItem = ({
  id,
  header,
  handleDownload,
  handleDelete,
  ...content
}) => {
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
          <div className="d-flex gap-2">
            <button
              className="btn btn-primary btn-sm mb-3"
              onClick={handleDownload}
            >
              Download Daily Progress Report
            </button>
            <button
              className="btn btn-danger btn-sm mb-3"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
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
