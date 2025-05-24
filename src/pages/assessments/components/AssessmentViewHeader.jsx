import useConfirmation from "@/hooks/useConfirmation";
import useFilterByPermission from "@/hooks/useFilterByPermission";
import { PERMISSIONS } from "@/shared/permissionsConstant";
import { deleteAssessmentByIds } from "@/store/slice/assessmentSlice";
import React from "react";
import { FiX } from "react-icons/fi";
import { LiaPencilAltSolid } from "react-icons/lia";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const AssessmentViewHeader = ({ id }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { hasPermission } = useFilterByPermission();
  const { showConfirmation, ConfirmationDialog } = useConfirmation();

  const handleDeleteConfirm = () => {
    showConfirmation(
      `Are you sure you want to delete this assessment?`,
      () => {
        dispatch(deleteAssessmentByIds({ assessmentIds: [id]}))
        .unwrap()
        .then(() => navigate('/assessments'))
        .catch((err) => console.error('Error: ', err))
      },
      () => {}
    );
  };

  return (
    <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
      {hasPermission(PERMISSIONS.ASSESSMENTS.UPDATE) && (
        <Link to={`/assessments/${id}/edit`} className="btn btn-primary">
          <LiaPencilAltSolid size={16} className="me-2" />
          <span>Edit Assessment</span>
        </Link>
      )}
      {hasPermission(PERMISSIONS.ASSESSMENTS.DELETE) && (
        <button className="btn btn-danger" onClick={handleDeleteConfirm}>
          <FiX size={16} className="me-2" />
          <span>Delete Assessment</span>
        </button>
      )}
      <ConfirmationDialog />
    </div>
  );
};

export default AssessmentViewHeader;
