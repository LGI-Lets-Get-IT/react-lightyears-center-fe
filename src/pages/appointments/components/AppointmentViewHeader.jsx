import React from "react";
import useConfirmation from "@/hooks/useConfirmation";
import useFilterByPermission from "@/hooks/useFilterByPermission";
import { PERMISSIONS } from "@/shared/permissionsConstant";
import { ROLES } from "@/shared/rolesConstant";
import { confirmPicAttendanceById, deleteAppointmentByIds } from "@/store/slice/appointmentSlice";
import { FiCheck, FiX } from "react-icons/fi";
import { LiaPencilAltSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const AppointmentViewHeader = ({ id, currentAppointment }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.profile)
  const { isLoading: updateLoading, isLoading: deleteLoading } = useSelector(state => state.appointments);
  const { hasPermission } = useFilterByPermission();
  const { showConfirmation, ConfirmationDialog } = useConfirmation();

  const handleConfirmAttendance = () => {
    showConfirmation(
    'Are you sure you want to confirm attendance?',
    () => {
      dispatch(confirmPicAttendanceById(id))
        .unwrap()
        .then(() => navigate(`/appointments/${id}`))
        .catch(error => console.log('Error', error));
    })
  }

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

  const renderConfirmAttendance = () => {
    if(!currentAppointment || !user) return false;

    const appointmentPic = currentAppointment?.picId
    const picType = currentAppointment?.picType?.toLowerCase();
    const userRole = user?.role?.name;

    if(userRole === ROLES.SUPER_ADMIN.label) return true
    if(picType === userRole && appointmentPic === user?.id) return true
    return false;
  }
  return (
    <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
      {!currentAppointment?.isConfirmed && renderConfirmAttendance() && (
        <button className="btn btn-success" onClick={handleConfirmAttendance} disabled={updateLoading}>
          {updateLoading ? (
            <div
            className="spinner-border spinner-border-sm text-white me-2"
            role="status"
            />
          ) : (
            <FiCheck size={16} className="me-2" />
          )}
          <span>Confirm Attendance</span>
        </button>
      )}
      {!currentAppointment?.isConfirmed && 
        hasPermission(PERMISSIONS.APPOINTMENTS.UPDATE) && (
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
