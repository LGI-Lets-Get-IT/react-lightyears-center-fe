import { useEffect } from "react";
import AppointmentsTable from "./components/AppointmentsTable";
import ClientsHeader from "./components/AppointmentsHeader";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import Footer from "@/components/shared/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAppointments } from "@/store/slice/appointmentSlice";

const CustomersList = () => {
  const dispatch = useDispatch();

  const { appointments } = useSelector((state) => state.appointments);

  useEffect(() => {
    dispatch(fetchAllAppointments());
  }, []);
  return (
    <>
      <PageHeader>
        <ClientsHeader />
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

export default CustomersList;
