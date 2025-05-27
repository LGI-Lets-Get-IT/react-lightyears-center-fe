// import React from "react";
import TabOverviewContent from "../../../components/customersView/TabOverviewContent";
import TabAppointmentContent from "../../../components/customersView/TabAppointmentContent";
import Profile from "./Profile";
import PropTypes from "prop-types";

const CustomerContent = ({ userData }) => {
  return (
    <>
      <div className="col-xxl-4 col-xl-6">
        <Profile
          uuid={userData?.uuid}
          fullName={userData?.fullName}
          gender={userData?.gender}
          address={userData?.address}
          guardianEmail={userData?.guardianEmail}
          guardianPhone={userData?.guardianPhone}
          appointments={userData?.appointments}
          assessments={userData?.appointments?.filter(appointment => appointment?.appointmentType?.toLowerCase() === 'assessment')}
          therapies={userData?.appointments?.filter(appointment => appointment?.appointmentType?.toLowerCase() === 'treatment')}
        />
      </div>
      <div className="col-xxl-8 col-xl-6">
        <div className="card border-top-0">
          <div className="card-header p-0">
            <ul
              className="nav nav-tabs flex-wrap w-100 text-center customers-nav-tabs"
              id="myTab"
              role="tablist"
            >
              <li className="nav-item flex-fill border-top" role="presentation">
                <a
                  href="#"
                  className="nav-link active"
                  data-bs-toggle="tab"
                  data-bs-target="#overviewTab"
                  role="tab"
                >
                  Overview
                </a>
              </li>
              <li className="nav-item flex-fill border-top" role="presentation">
                <a
                  href="#"
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#appointmentTab"
                  role="tab"
                >
                  Appointments
                </a>
              </li>
            </ul>
          </div>
          <div className="tab-content">
            <TabOverviewContent clientInformation={userData} />
            <TabAppointmentContent />
          </div>
        </div>
      </div>
    </>
  );
};

CustomerContent.propTypes = {
  userData: PropTypes.shape({
    fullName: PropTypes.string,
    gender: PropTypes.string,
    address: PropTypes.string,
    guardianEmail: PropTypes.string,
    guardianPhone: PropTypes.string,
  }).isRequired,
};

export default CustomerContent;
