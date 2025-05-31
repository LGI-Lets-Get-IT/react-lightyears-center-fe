import useConfirmation from "@/hooks/useConfirmation";
import useFilterByPermission from "@/hooks/useFilterByPermission";
import { PERMISSIONS } from "@/shared/permissionsConstant";
import { deleteAppointmentByIds } from "@/store/slice/appointmentSlice";
import React from "react";
import { FiX } from "react-icons/fi";
import { LiaPencilAltSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const AppointmentViewHeader = ({ id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading: deleteLoading } = useSelector(state => state.appointments);
  const { hasPermission } = useFilterByPermission();
  const { showConfirmation, ConfirmationDialog } = useConfirmation();

  const handleDeleteConfirm = () => {
    showConfirmation(
      `Are you sure you want to delete this appointment?`,
      () => {
        dispatch(deleteAppointmentByIds({ appointmentIds: id }))
          .unwrap()
          .then(() => navigate("/appointments"))
          .catch((err) => console.error("Error: ", err));
      },
      () => {}
    );
  };
  return (
    <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
      {hasPermission(PERMISSIONS.APPOINTMENTS.UPDATE) && (
        <Link to={`/appointments/${id}/edit`} className="btn btn-primary">
          <LiaPencilAltSolid size={16} className="me-2" />
          <span>Edit Appointment</span>
        </Link>
      )}
      {hasPermission(PERMISSIONS.APPOINTMENTS.DELETE) && (
        <button className="btn btn-danger" onClick={handleDeleteConfirm} disabled={deleteLoading}>
          {deleteLoading ? (
            <div
              className="spinner-border spinner-border-sm text-white me-2"
              role="status"
            />
          ) : (
            <FiX size={16} className="me-2" />
          )}
          <span>Delete Appointment</span>
        </button>
      )}
      <ConfirmationDialog />
    </div>
  );
};

export default AppointmentViewHeader;
