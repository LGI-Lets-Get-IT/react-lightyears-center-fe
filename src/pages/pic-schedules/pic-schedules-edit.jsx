// import React from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
// import AppointmentCreateHeader from "@/components/AppointmentCreateHeader";
import AssessmentsCreateContent from "./components/PICScheduleCreateContent";
import { useDispatch, useSelector } from "react-redux";
import PICSchedulesListContent from "./components/PICScheduleEditContent";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchAssessmentById } from "@/store/slice/assessmentSlice";

const PICSchedulesEdit = () => {
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
          <PICSchedulesListContent assessmentData={currentAssessment} />
        </div>
      </div>
    </>
  );
};

export default PICSchedulesEdit;
