// import React from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
// import AppointmentCreateHeader from "@/components/AppointmentCreateHeader";
import AssessmentsCreateContent from "./components/PICScheduleCreateContent";
import { useDispatch, useSelector } from "react-redux";
import PICSchedulesListContent from "./components/PICScheduleEditContent";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchPicScheduleByEmployeeId } from "@/store/slice/picScheduleSlice";

const PICSchedulesEdit = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { schedule } = useSelector((state) => state.picSchedules);

  useEffect(() => {
    dispatch(fetchPicScheduleByEmployeeId(id));
  }, []);
  return (
    <>
      <PageHeader>{/* <AppointmentCreateHeader /> */}</PageHeader>
      <div className="main-content">
        <div className="row">
          <PICSchedulesListContent scheduleData={schedule} />
        </div>
      </div>
    </>
  );
};

export default PICSchedulesEdit;
