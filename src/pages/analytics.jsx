import React, { useEffect } from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import PageHeaderDate from "@/components/shared/pageHeader/PageHeaderDate";
import EmailOverview from "@/components/EmailOverview";
import Browser from "@/components/widgetsList/Browser";
import Remainders from "@/components/widgetsTables/Remainders";
import GoalMiscellaneous from "@/components/widgetsMiscellaneous/GoalMiscellaneous";
import SiteOverviewChart from "@/components/widgetsCharts/SiteOverviewChart";
import VisitorsOverviewChart from "@/components/widgetsCharts/VisitorsOverviewChart";
import SocialMediaStatisticsChart from "@/components/widgetsCharts/SocialMediaStatisticsChart";
import MarketingChart from "@/components/widgetsCharts/MarketingChart";
import Footer from "@/components/shared/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAppointments } from "../store/slice/appointmentSlice";

const Analytics = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments.appointments);

  useEffect(() => {
    dispatch(fetchAllAppointments());
  }, []);
  return (
    <>
      <PageHeader>
        <PageHeaderDate />
      </PageHeader>
      <div className="main-content">
        <div className="row">
          {console.log("appointments", appointments)}
          {appointments.map((item) => {
            return <h1 key={item.id}>{item.name}</h1>;
          })}
          <EmailOverview />
          <VisitorsOverviewChart />
          <Browser title={"Browser States"} />
          <SiteOverviewChart />
          <GoalMiscellaneous />
          <MarketingChart />
          <Remainders title={"Project Remainders"} />
          <SocialMediaStatisticsChart />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Analytics;
