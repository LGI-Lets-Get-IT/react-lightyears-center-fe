// import React from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
// import AppointmentCreateHeader from "@/components/AppointmentCreateHeader";
import AssessmentsCreateContent from "./components/AssessmentsCreateContent";
import { useDispatch, useSelector } from "react-redux";
import AssessmentsEditContent from "./components/AssesmentsEditContent";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchAssessmentById } from "@/store/slice/assessmentSlice";

const AssessmentsEdit = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentAssessment } = useSelector(state => state.assessments)

  useEffect(() => {
    dispatch(fetchAssessmentById(id))
  }, [])
  return (
    <>
      <PageHeader>
        {/* <AppointmentCreateHeader /> */}
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <AssessmentsEditContent assessmentData={currentAssessment} />
        </div>
      </div>
    </>
  );
};

export default AssessmentsEdit;
