// import React, { useEffect } from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import LeadsEmptyCard from "@/components/leadsViewCreate/LeadsEmptyCard";
import AppointmentViewHeader from "./components/AppointmentViewHeader";
import AppointmentViewTabItems from "./components/AppointmentViewTabItems";
import TabAppointmentOverview from "./components/TabAppointmentOverview";
import { fetchAppointmentById } from "@/store/slice/appointmentSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TabAppointmentFiles from "./components/TabAppointmentFiles";
import TabAppointmentResult from "./components/TabAppointmentResult";

const AppointmentsView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentAppointment } = useSelector((state) => state.appointments);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    dispatch(fetchAppointmentById(id));
  }, [dispatch, id]);

  return (
    <>
      <PageHeader>
        <AppointmentViewHeader id={id} currentAppointment={currentAppointment}/>
      </PageHeader>
      <AppointmentViewTabItems activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="main-content">
        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="tab-pane fade show active" id="overviewTab">
              <TabAppointmentOverview appointmentData={currentAppointment} />
            </div>
          )}
          <div className="tab-pane fade show active" id="ReportsTab">
          </div>
          {activeTab === 'files' && (
            <div className="tab-pane fade show active" id="filesTab">
              <TabAppointmentFiles />
              {/* <LeadsEmptyCard
              title="No files yet!"
              description="There is no files on this appointment"
              /> */}
            </div>
          )}
          {activeTab === 'result' && (
            <div className="tab-pane fade show active">
              <TabAppointmentResult />
              {/* <LeadsEmptyCard
                title="No assessments yet!"
                description="There are no assessments on this appointment"
                link={'/assessments/create'}
                buttonText="Create Client Assessment"
              /> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AppointmentsView;
