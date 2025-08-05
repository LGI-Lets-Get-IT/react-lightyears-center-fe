// import React, { useEffect } from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AssessmentViewHeader from "./components/AssessmentViewHeader";
import { fetchAssessmentById } from "@/store/slice/assessmentSlice";
import AssessmentViewTabItems from "./components/AssessmentViewTabItems";
import TabAssessmentOverview from "./components/TabAssessmentOverview";

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
      {/* <AssessmentViewTabItems /> */}
      <div className="main-content">
        <div className="tab-content">
          <TabAssessmentOverview assessmentData={currentAssessment} />
        </div>
      </div>
    </>
  );
};

export default AssessmentsView;
