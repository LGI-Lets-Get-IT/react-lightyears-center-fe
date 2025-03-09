import React, { useEffect } from "react";
import CustomersTable from "@/components/customers/CustomersTable";
import CustomersHeader from "@/components/customers/CustomersHeader";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import Footer from "@/components/shared/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  createClient,
  fetchAllClients,
  fetchClientById,
} from "../store/slice/clientSlice";

const CustomersList = () => {
  const dispatch = useDispatch();

  const { clients } = useSelector((state) => state.clients);

  useEffect(() => {
    dispatch(fetchAllClients());
  }, []);
  return (
    <>
      <PageHeader>
        <CustomersHeader />
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <CustomersTable clients={clients} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CustomersList;
