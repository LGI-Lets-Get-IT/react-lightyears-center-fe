// import React, { useEffect } from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PICScheduleViewHeader from "./components/PICScheduleViewHeader";
import PICScheduleViewContent from "./components/PICScheduleViewContent";
import { fetchPicScheduleByEmployeeId } from "@/store/slice/picScheduleSlice";

const PICSchedulesView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { schedule } = useSelector((state) => state.picSchedules);

  useEffect(() => {
    dispatch(fetchPicScheduleByEmployeeId(id));
  }, [dispatch, id]);

  return (
    <>
      <PageHeader>
        <PICScheduleViewHeader id={id} />
      </PageHeader>
      <div className="main-content">
        <div className="tab-content">
          <PICScheduleViewContent scheduleData={schedule} />
          {/* <TabAssessmentOverview assessmentData={currentAssessment} /> */}
        </div>
      </div>
    </>
  );
};

export default PICSchedulesView;
