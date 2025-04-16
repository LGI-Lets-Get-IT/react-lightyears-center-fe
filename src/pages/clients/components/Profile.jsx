import React, { memo, useState } from "react";
import { deleteClient } from "@/store/slice/clientSlice";
import { FaMars, FaVenus } from "react-icons/fa6";
import { FiEdit, FiMail, FiPhone, FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";

const Profile = ({ fullName, gender, guardianEmail, guardianPhone, totalAppointments }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uuid } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Actual delete function which will be called on confirmation
  const handleDeleteConfirmed = () => {
    if (!uuid) {
      console.error("UUID is undefined");
      return;
    }
    setIsDeleting(true);
    const payload = {
      clientIds: [uuid],
    };

    dispatch(deleteClient(payload))
      .unwrap()
      .then(() => {
        console.log("Client deleted successfully");
        navigate(`/clients`);
      })
      .catch((error) => console.error("Handle error:", error))
      .finally(() => {
        setIsDeleting(false);
        setShowModal(false);
      });
  };

  return (
    <div className="card stretch stretch-full">
      <div className="card-body">
        <div className="mb-4 text-center">
          <div className="mb-4">
            <span className="fs-14 fw-bold d-block">{fullName}</span>
            <span className="fs-12 fw-normal text-muted d-block">
              {gender === "Male" ? (
                <FaMars color="blue" />
              ) : (
                <FaVenus color="pink" />
              )}
              {gender}
            </span>
          </div>
          <div className="fs-12 fw-normal text-muted text-center d-flex flex-wrap gap-3 mb-4">
            <div className="flex-fill py-3 px-4 rounded-1 d-none d-sm-block border border-dashed border-gray-5">
              <h6 className="fs-15 fw-bolder">{totalAppointments ?? 0}</h6>
              <p className="fs-12 text-muted mb-0">Total Appointments</p>
            </div>
            <div className="flex-fill py-3 px-4 rounded-1 d-none d-sm-block border border-dashed border-gray-5">
              <h6 className="fs-15 fw-bolder">0</h6>
              <p className="fs-12 text-muted mb-0">Total Assessments</p>
            </div>
            <div className="flex-fill py-3 px-4 rounded-1 d-none d-sm-block border border-dashed border-gray-5">
              <h6 className="fs-15 fw-bolder">0</h6>
              <p className="fs-12 text-muted mb-0">Total Therapies</p>
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
          <li className="hstack justify-content-between mb-0">
            <span className="text-muted fw-medium hstack gap-3">
              <FiMail size={16} />
              Guardian Email
            </span>
            <a href={`mailto:${guardianEmail}`} className="float-end">
              {guardianEmail}
            </a>
          </li>
        </ul>
        <div className="d-flex gap-2 text-center pt-4">
          <button
            onClick={() => setShowModal(true)}
            className="w-50 btn btn-light-brand"
          >
            <FiTrash2 size={16} className="me-2" />
            <span>Delete</span>
          </button>
          <Link to={`/clients/${uuid}/edit`} className="w-50 btn btn-primary">
            <FiEdit size={16} className="me-2" />
            <span>Edit Profile</span>
          </Link>
        </div>
      </div>

      {/* Modal for delete confirmation */}
      {showModal && (
        <div className="modal-overlay" style={modalOverlayStyle}>
          <div className="modal-content" style={modalContentStyle}>
            <h3 className="mb-3">Confirm Deletion</h3>
            <p className="mb-4">
              Are you sure you want to delete the client profile for{" "}
              <strong>{fullName}</strong>? This action cannot be undone.
            </p>
            <div className="d-flex justify-content-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-secondary"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="btn btn-danger"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Example inline styles for the modal overlay and content
const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalContentStyle = {
  background: "#fff",
  padding: "2rem",
  borderRadius: "4px",
  maxWidth: "500px",
  width: "90%",
};

export default Profile;
