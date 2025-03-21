import { useEffect } from "react";
import AppointmentsTable from "./components/AppointmentsTable";
import ClientsHeader from "./components/AppointmentsHeader";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import Footer from "@/components/shared/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllClients } from "../../store/slice/clientSlice";

const CustomersList = () => {
  const dispatch = useDispatch();

  const { clients } = useSelector((state) => state.clients);

  useEffect(() => {
    dispatch(fetchAllClients());
  }, []);
  return (
    <>
      <PageHeader>
        <ClientsHeader />
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <AppointmentsTable clients={clients} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CustomersList;
