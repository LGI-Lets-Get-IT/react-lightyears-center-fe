import React, { useEffect } from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import PlanEditContent from "./components/PICScheduleEditContent";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlanById } from "@/store/slice/treatmentPlanSlice";
import { useParams } from "react-router-dom";

const PICScheduleEdit = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { plan } = useSelector(state => state.treatmentPlans);

  useEffect(() => {
    dispatch(fetchPlanById(id))
  }, [])
  return (
    <>
      <PageHeader />
      <div className="main-content">
        <div className="row">
          <PlanEditContent planData={plan} />
        </div>
      </div>
    </>
  );
};

export default PICScheduleEdit;
