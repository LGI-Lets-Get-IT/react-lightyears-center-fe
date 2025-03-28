import { useEffect } from "react";
import AppointmentsTable from "./components/AppointmentsTable";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import Footer from "@/components/shared/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAppointments } from "@/store/slice/appointmentSlice";
import AppointmentsHeader from "./components/AppointmentsHeader";

const AppointmentsList = () => {
  const dispatch = useDispatch();

  const { appointments } = useSelector((state) => state.appointment);

  useEffect(() => {
    dispatch(fetchAllAppointments());
  }, []);
  return (
    <>
      <PageHeader>
        <AppointmentsHeader />
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <AppointmentsTable appointments={appointments} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AppointmentsList;
