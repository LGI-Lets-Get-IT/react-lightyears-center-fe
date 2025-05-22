// import React from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import AppointmentsEditContent from "./components/AppointmentsEditContent";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAppointmentById } from "@/store/slice/appointmentSlice";

const AppointmentsEdit = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentAppointment } = useSelector((state) => state.appointments);

  useEffect(() => {
    dispatch(fetchAppointmentById(id));
  }, [id]);

  return (
    <>
      <PageHeader>
        {/* <AppointmentCreateHeader /> */}
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <AppointmentsEditContent appointmentData={currentAppointment} />
        </div>
      </div>
    </>
  );
};

export default AppointmentsEdit;
