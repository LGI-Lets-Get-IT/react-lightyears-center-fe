// import React, { useEffect } from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import LeadsEmptyCard from "@/components/leadsViewCreate/LeadsEmptyCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPlanById } from "@/store/slice/treatmentPlanSlice";
import PlanViewHeader from "./components/PlanViewHeader";
import PlanViewTabItems from "./components/PlanViewTabItems";

const PlansView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { plan } = useSelector((state) => state.treatmentPlans);

  // console.log("Current appointment data: ", appointment);

  useEffect(() => {
    dispatch(fetchPlanById(id));
  }, [id]);

  return (
    <>
      <PageHeader>
        <PlanViewHeader />
      </PageHeader>
      <PlanViewTabItems />
      <div className="main-content">
        <div className="tab-content">
          {/* <TabAppointmentOverview appointmentData={appointment} /> */}
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
      </div>
    </>
  );
};

export default PlansView;