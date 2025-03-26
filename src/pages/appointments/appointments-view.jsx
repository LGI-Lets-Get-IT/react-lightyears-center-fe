// import React, { useEffect } from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import LeadsEmptyCard from "@/components/leadsViewCreate/LeadsEmptyCard";
import AppointmentViewHeader from "./components/AppointmentViewHeader";
import AppointmentViewTabItems from "./components/AppointmentViewTabItems";
import TabAppointmentOverview from "./components/TabAppointmentOverview";
const AppointmentsView = () => {
  //   const dispatch = useDispatch();
  //   const { id } = useParams();
  //   const currentAppointment = useSelector((state) => state.appointment);

  //   useEffect(() => {
  //     dispatch(fetchSchoolById(id));
  //   }, [dispatch, id]);

  return (
    <>
      <PageHeader>
        <AppointmentViewHeader />
      </PageHeader>
      <AppointmentViewTabItems />
      <div className="main-content">
        <div className="tab-content">
          <TabAppointmentOverview />
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
          <div className="tab-pane fade" id="milestonesTab">
            <LeadsEmptyCard
              title="No milestones yet!"
              description="There is no milestones on this project"
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
