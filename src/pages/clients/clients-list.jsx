import { useEffect } from "react";
import ClientsTable from "./components/ClientsTable";
import ClientsHeader from "./components/ClientsHeader";
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
          <ClientsTable clients={clients} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CustomersList;
