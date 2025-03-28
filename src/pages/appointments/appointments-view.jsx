// import React, { useEffect } from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import LeadsEmptyCard from "@/components/leadsViewCreate/LeadsEmptyCard";
import AppointmentViewHeader from "./components/AppointmentViewHeader";
import AppointmentViewTabItems from "./components/AppointmentViewTabItems";
import TabAppointmentOverview from "./components/TabAppointmentOverview";
import { fetchAppointmentById } from "@/store/slice/appointmentSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const AppointmentsView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { appointment, isLoading, error } = useSelector((state) => ({
    appointment: state.appointment.currentAppointment,
    isLoading: state.appointment.isLoading,
    error: state.appointment.error,
  }));

  console.log("Current appointment data: ", appointment);

  useEffect(() => {
    dispatch(fetchAppointmentById(id));
  }, [dispatch, id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <PageHeader>
        <AppointmentViewHeader />
      </PageHeader>
      <AppointmentViewTabItems />
      <div className="main-content">
        <div className="tab-content">
          <TabAppointmentOverview appointmentData={appointment} />
          <div className="tab-pane fade" id="ReportsTab">
            <LeadsEmptyCard
              title="No milestones yet!"
              description="There is no milestones on this project"
            />
          </div>
          <div className="tab-pane fade" id="activityTab">
            <LeadsEmptyCard
              title="No activity yet!"
              description="There is no activity on this project"
            />
          </div>
          <div className="tab-pane fade" id="timesheetsTab">
            <LeadsEmptyCard
              title="No timesheets yet!"
              description="There is no timesheets on this project"
            />
          </div>
          <div className="tab-pane fade" id="discussionsTab">
            <LeadsEmptyCard
              title="No discussions yet!"
              description="There is no discussions on this project"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentsView;
