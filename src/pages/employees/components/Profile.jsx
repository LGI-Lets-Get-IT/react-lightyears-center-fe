import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FiEdit, FiMail, FiPhone, FiTrash2 } from "react-icons/fi";
import { PERMISSIONS } from "@/shared/permissionsConstant";
import { deleteEmployeeByIds } from "@/store/slice/employeeSlice";
import useConfirmation from "@/hooks/useConfirmation";
import useFilterByPermission from "@/hooks/useFilterByPermission";

const Profile = ({ id, fullName, phoneNumber, email }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { hasPermission } = useFilterByPermission();
  const { showConfirmation, ConfirmationDialog } = useConfirmation();

  const handleConfirmDelete = () => {
    showConfirmation(
      'Are you sure you want to delete this employee?',
      () => {
        dispatch(deleteEmployeeByIds({ employeeIds: [id] }))
        .unwrap()
        .then(() => navigate('/employees'))
        .catch((err) => console.error('Error: ', err))
      },
      () => {}
    )
  };

  return (
    <div className="card stretch stretch-full">
      <div className="card-body">
        <div className="mb-4 text-center">
          <div className="mb-4">
            <span className="fs-14 fw-bold d-block">{fullName}</span>
          </div>
        </div>
        <ul className="list-unstyled mb-4">
          <li className="hstack justify-content-between mb-4">
            <span className="text-muted fw-medium hstack gap-3">
              <FiPhone size={16} />
              Phone Number
            </span>
            <a href={`tel:${phoneNumber}`} className="float-end">
              {phoneNumber}
            </a>
          </li>
          <li className="hstack justify-content-between mb-0">
            <span className="text-muted fw-medium hstack gap-3">
              <FiMail size={16} />
              Guardian Email
            </span>
            <a href={`mailto:${email}`} className="float-end">
              {email}
            </a>
          </li>
        </ul>
        <div className="d-flex gap-2 text-center pt-4">
          {hasPermission(PERMISSIONS.CLIENTS.DELETE) && (
            <button
              onClick={handleConfirmDelete}
              className="w-50 btn btn-light-brand"
            >
              <FiTrash2 size={16} className="me-2" />
              <span>Delete</span>
            </button>
          )}
          {hasPermission(PERMISSIONS.CLIENTS.UPDATE) && (
            <Link to={`/employees/${id}/edit`} className="w-50 btn btn-primary">
              <FiEdit size={16} className="me-2" />
              <span>Edit Profile</span>
            </Link>
          )}
        </div>
      </div>
      <ConfirmationDialog/>
    </div>
  );
};

export default Profile;
