// import React, { useEffect } from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import { fetchAppointmentById } from "@/store/slice/appointmentSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AssessmentViewHeader from "./components/AssessmentViewHeader";
import AppointmentViewTabItems from "../appointments/components/AppointmentViewTabItems";
import { fetchAssessmentById } from "@/store/slice/assessmentSlice";

const AssessmentsView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentAssessment } = useSelector((state) => state.assessments);

  useEffect(() => {
    dispatch(fetchAssessmentById(id));
  }, [dispatch, id]);

  return (
    <>
      <PageHeader>
        <AssessmentViewHeader id={id} />
      </PageHeader>
      <AppointmentViewTabItems />
      {/* <div className="main-content">
        <div className="tab-content">
          <TabAppointmentOverview appointmentData={currentAppointment} />
          <div className="tab-pane fade" id="ReportsTab">
            <LeadsEmptyCard
              title="No reports yet!"
              description="There are no reports to be viewed"
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
      </div> */}
    </>
  );
};

export default AssessmentsView;
