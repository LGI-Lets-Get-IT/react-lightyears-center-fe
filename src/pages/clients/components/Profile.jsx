import React, { memo, useState } from "react";
import { FaMars, FaVenus } from "react-icons/fa6";
import { FiEdit, FiMail, FiPhone, FiTrash2, FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { PERMISSIONS } from "../../../shared/permissionsConstant";
import useFilterByPermission from "@/hooks/useFilterByPermission";
import { deleteClientByUuids } from "@/store/slice/clientSlice";
import useConfirmation from "@/hooks/useConfirmation";

const Profile = ({
  fullName,
  gender,
  guardianEmail,
  guardianPhone,
  psychologistInCharge,
  therapistInCharge,
  totalAppointments,
  totalAssessments,
  totalTreatmentPlans,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading: deleteLoading } = useSelector((state) => state.clients);
  const { hasPermission } = useFilterByPermission();
  const { showConfirmation, ConfirmationDialog } = useConfirmation();
  const { uuid } = useParams();
  // const { currentUser } = useSelector((state) => state.auth);

  // Actual delete function which will be called on confirmation
  const handleDeleteConfirmed = () => {
    showConfirmation(
      <>
        Are you sure you want to delete client <strong>{fullName}</strong> data?
      </>,
      () => {
        dispatch(deleteClientByUuids({ clientIds: [uuid] }))
          .unwrap()
          .then(() => navigate("/clients"))
          .catch((err) => console.error("Error: ", err));
      },
      () => {}
    );
  };
  // };

  return (
    <div className="card stretch stretch-full">
      <div className="card-body">
        <div className="mb-4 text-center">
          <div className="mb-4">
            <span className="fs-14 fw-bold d-block">{fullName}</span>
            <div className="d-flex justify-content-center gap-1 align-items-center">
              {gender === "Male" ? (
                <FaMars color="blue" />
              ) : (
                <FaVenus color="pink" />
              )}
              <span className="fs-12 fw-normal text-muted">{gender}</span>
            </div>
          </div>
          <div className="fs-12 fw-normal text-muted text-center d-flex flex-wrap gap-3 mb-4">
            <div className="flex-fill py-3 px-4 rounded-1 d-none d-sm-block border border-dashed border-gray-5">
              <h6 className="fs-15 fw-bolder">{totalAppointments}</h6>
              <p className="fs-12 text-muted mb-0">Total Appointments</p>
            </div>
            <div className="flex-fill py-3 px-4 rounded-1 d-none d-sm-block border border-dashed border-gray-5">
              <h6 className="fs-15 fw-bolder">{totalAssessments}</h6>
              <p className="fs-12 text-muted mb-0">Total Assessments</p>
            </div>
            <div className="flex-fill py-3 px-4 rounded-1 d-none d-sm-block border border-dashed border-gray-5">
              <h6 className="fs-15 fw-bolder">{totalTreatmentPlans}</h6>
              <p className="fs-12 text-muted mb-0">Total Treament Plans</p>
            </div>
          </div>
        </div>
        <ul className="list-unstyled mb-4">
          <li className="hstack justify-content-between mb-4">
            <span className="text-muted fw-medium hstack gap-3">
              <FiPhone size={16} />
              Guardian Phone Number
            </span>
            <a href={`tel:${guardianPhone}`} className="float-end">
              {guardianPhone}
            </a>
          </li>
          <li className="hstack justify-content-between mb-4">
            <span className="text-muted fw-medium hstack gap-3">
              <FiMail size={16} />
              Guardian Email
            </span>
            <a href={`mailto:${guardianEmail}`} className="float-end">
              {guardianEmail || "-"}
            </a>
          </li>
          <li className="hstack justify-content-between mb-4">
            <span className="text-muted fw-medium hstack gap-3">
              <FiUser size={16} />
              Psychologist In Charge
            </span>
            <a className="float-end">{psychologistInCharge || "-"}</a>
          </li>
          <li className="hstack justify-content-between mb-0">
            <span className="text-muted fw-medium hstack gap-3">
              <FiUser size={16} />
              Therapist In Charge
            </span>
            <a className="float-end">{therapistInCharge || "-"}</a>
          </li>
        </ul>
        <div className="d-flex gap-2 text-center pt-4">
          {hasPermission(PERMISSIONS.CLIENTS.DELETE) && (
            <button
              onClick={handleDeleteConfirmed}
              className="w-50 btn btn-light-brand"
              disabled={deleteLoading}
            >
              {deleteLoading ? (
                <div
                  className="spinner-border spinner-border-sm text-primary me-2"
                  role="status"
                />
              ) : (
                <FiTrash2 size={16} className="me-2" />
              )}
              <span>Delete</span>
            </button>
          )}
          {hasPermission(PERMISSIONS.CLIENTS.UPDATE) && (
            <Link to={`/clients/${uuid}/edit`} className="w-50 btn btn-primary">
              <FiEdit size={16} className="me-2" />
              <span>Edit Profile</span>
            </Link>
          )}
        </div>
      </div>
      <ConfirmationDialog />
    </div>
  );
};

export default Profile;
