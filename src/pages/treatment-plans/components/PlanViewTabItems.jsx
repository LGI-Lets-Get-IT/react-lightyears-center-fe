import useConfirmation from "@/hooks/useConfirmation";
import useFilterByPermission from "@/hooks/useFilterByPermission";
import { PERMISSIONS } from "@/shared/permissionsConstant";
import { generatePlanReport } from "@/store/slice/fileSlice";
import { deletePlanByIds } from "@/store/slice/treatmentPlanSlice";
import React, { useState } from "react";
import { FiEdit, FiPrinter, FiTrash } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const PlanViewTabItems = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showConfirmation, ConfirmationDialog } = useConfirmation();
  const { id } = useParams();
  const { hasPermission } = useFilterByPermission()
  const { plan, isLoading: deleteLoading } = useSelector((state) => state.treatmentPlans);
  const { isLoading: downloadLoading } = useSelector((state) => state.files);

  const generateTreatmentPlanReport = () => {
    dispatch(generatePlanReport(id)).then((response) => {
      const blob = new Blob([response.payload], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${plan?.client?.fullName}_TREATMENT-PLAN-REPORT.pdf`; // Set your desired filename here
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    });
  };

    const handleDeleteConfirmed = () => {
      showConfirmation(
        'Are you sure to delete this treatment plan?',
        () => {
          dispatch(deletePlanByIds({ planIds: [id]}))
            .unwrap()
            .then(() => navigate(`/treatment-plans`))
            .catch((error) => console.error("Handle error:", error))
        },
        () => {}
      )

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
                className={`action-btn ${downloadLoading ? 'pe-none' : ''}`}
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
            {hasPermission(PERMISSIONS.TREATMENT_PLANS.UPDATE) &&
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
            }
            {hasPermission(PERMISSIONS.TREATMENT_PLANS.DELETE) &&
              <div className="d-md-none d-lg-flex">
                <a
                  href="#"
                  onClick={handleDeleteConfirmed}
                  className={`action-btn ${deleteLoading ? 'pe-none' : ''}`}
                  data-bs-toggle="tooltip"
                  title="Delete Treatment Plan"
                >
                {deleteLoading ? (
                  <div
                    className="spinner-border spinner-border-sm text-primary"
                    role="status"
                  />
                ) : (
                  <FiTrash size={16} />
                )}
                </a>
              </div>
            }
          </div>
        </div>
      </div>
      <ConfirmationDialog/>
    </div>
  );
};

export default PlanViewTabItems;
