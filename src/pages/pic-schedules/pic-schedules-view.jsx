// import React, { useEffect } from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PICScheduleViewHeader from "./components/PICScheduleViewHeader";
import { fetchAssessmentById } from "@/store/slice/assessmentSlice";
import PICScheduleViewTabItems from "./components/PICScheduleViewTabItems";
import TabAssessmentOverview from "./components/TabAssessmentOverview";

const PICSchedulesView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentAssessment } = useSelector((state) => state.assessments);

  useEffect(() => {
    dispatch(fetchAssessmentById(id));
  }, [dispatch, id]);

  return (
    <>
      <PageHeader>
        <PICScheduleViewHeader id={id} />
      </PageHeader>
      <PICScheduleViewTabItems />
      <div className="main-content">
        <div className="tab-content">
          <TabAssessmentOverview assessmentData={currentAssessment} />
        </div>
      </div>
    </>
  );
};

export default PICSchedulesView;
