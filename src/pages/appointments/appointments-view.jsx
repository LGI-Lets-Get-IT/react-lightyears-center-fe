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
import TabAppointmentFiles from "./components/TabAppointmentFiles";

const AppointmentsView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentAppointment } = useSelector((state) => state.appointments);

  // console.log("Current appointment data: ", appointment);

  useEffect(() => {
    dispatch(fetchAppointmentById(id));
  }, [dispatch, id]);

  return (
    <>
      <PageHeader>
        <AppointmentViewHeader />
      </PageHeader>
      <AppointmentViewTabItems />
      <div className="main-content">
        <div className="tab-content">
          <TabAppointmentOverview appointmentData={currentAppointment} />
          <div className="tab-pane fade" id="ReportsTab">
            <LeadsEmptyCard
              title="No reports yet!"
              description="There are no reports to be viewed"
            />
          </div>
          <div className="tab-pane fade" id="filesTab">
            <TabAppointmentFiles/>
            {/* <LeadsEmptyCard
              title="No files yet!"
              description="There is no files on this appointment"
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentsView;
