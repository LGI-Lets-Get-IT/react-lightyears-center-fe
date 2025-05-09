import React from "react";
import { useSelector } from "react-redux";

const AppointmentViewTabItems = () => {
  const { currentAppointment } = useSelector(
    (state) => state.appointments
  );
  return (
    <div className="bg-white py-3 border-bottom rounded-0 p-md-0 mb-0">
      <div className="d-md-none d-flex align-items-center justify-content-between">
        <a href="#" className="page-content-left-open-toggle">
          <i className="feather-align-left fs-20"></i>
        </a>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <div className="nav-tabs-wrapper page-content-left-sidebar-wrapper">
          <ul
            className="nav nav-tabs nav-tabs-custom-style"
            id="appointmentTab"
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
                data-bs-target="#ReportsTab"
              >
                Reports
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#filesTab"
              >
                Files
              </button>
            </li>
            {currentAppointment?.appointmentType?.toLowerCase() === "assessment" && (
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#assessmentsTab"
                  >
                  Result
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AppointmentViewTabItems;
