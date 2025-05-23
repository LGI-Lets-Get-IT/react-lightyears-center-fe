import { generatePlanReport } from "@/store/slice/fileSlice";
import { deletePlanById } from "@/store/slice/treatmentPlanSlice";
import React, { useState } from "react";
import { FiCheckCircle, FiEdit, FiPrinter, FiTrash } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const PlanViewTabItems = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { plan } = useSelector((state) => state.treatmentPlans);
  const { isLoading: downloadLoading } = useSelector((state) => state.files);

  const generateTreatmentPlanReport = () => {
    dispatch(generatePlanReport(id)).then((response) => {
      const blob = new Blob([response.payload], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${plan.clientName}_TREATMENT-PLAN-REPORT.pdf`; // Set your desired filename here
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    });

  };

    // Actual delete function which will be called on confirmation
    const handleDeleteConfirmed = () => {
      if (!uuid) {
        console.error("UUID is undefined");
        return;
      }
      setIsDeleting(true);
      const payload = {
        planIds: [id],
      };
  
      dispatch(deletePlanById(payload))
        .unwrap()
        .then(() => {
          console.log("Treatment plan deleted successfully");
          navigate(`/treatment-plans`);
        })
        .catch((error) => console.error("Handle error:", error))
        .finally(() => {
          setIsDeleting(false);
          setOpenModal(false);
        });
    };
  return (
    <div className="bg-white py-3 border-bottom rounded-0 p-md-0 mb-0">
      <div className="d-md-none d-flex align-items-center justify-content-between">
        <a href="#" className="page-content-left-open-toggle">
          <i className="feather-align-left fs-20"></i>
        </a>
      </div>
      <div className="d-flex align-items-center justify-content-between w-100 overflow-auto">
        <div className="nav-tabs-wrapper page-content-left-sidebar-wrapper">
          <ul
            className="nav nav-tabs nav-tabs-custom-style flex-nowrap"
            id="treatmentPlanTab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                data-bs-toggle="tab"
                data-bs-target="#overviewTab"
              >
                Overview
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#progressTab"
              >
                Progress
              </button>
            </li>
          </ul>
        </div>
        <div className="page-content-right-sidebar-wrapper">
          <div className="proposal-action-btn">
            <div className="d-md-none d-lg-flex">
              <a
                href="#"
                onClick={generateTreatmentPlanReport}
                className="action-btn"
                data-bs-toggle="tooltip"
                title="Print Plan Report"
              >
                {downloadLoading ? (
                  <div
                    className="spinner-border spinner-border-sm text-primary"
                    role="status"
                  />
                ) : (
                  <FiPrinter size={16} />
                )}
              </a>
            </div>
            <div className="d-md-none d-lg-flex">
              <a
                href={`/treatment-plans/${id}/edit`}
                className="action-btn"
                data-bs-toggle="tooltip"
                title="Edit Treatment Plan"
              >
                <FiEdit size={16} />
              </a>
            </div>
            <div className="d-md-none d-lg-flex">
              <a
              onClick={() => setOpenModal(true)}
                className="action-btn"
                data-bs-toggle="tooltip"
                title="Delete Treatment Plan"
              >
                <FiTrash size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanViewTabItems;
