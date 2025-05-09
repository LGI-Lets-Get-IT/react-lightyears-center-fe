// import React, { useEffect } from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPlanById } from "@/store/slice/treatmentPlanSlice";
import PlanViewHeader from "./components/PlanViewHeader";
import PlanViewTabItems from "./components/PlanViewTabItems";
import TabPlanProgress from "./components/TabPlanProgress";
import TabPlanOverview from "./components/TabPlanOverview";

const PlansView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

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
          <TabPlanOverview/>
          <div className="tab-pane fade" id="progressTab">
            <TabPlanProgress/>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlansView;