import React, { useEffect } from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import CustomersViewHeader from "@/components/customersView/CustomersViewHeader";
import CustomerContent from "@/components/customersView/CustomerContent";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientById } from "../store/slice/clientSlice";
import { useParams } from "react-router-dom";

const CustomersView = () => {
  const dispatch = useDispatch();
  const { uuid } = useParams();
  const { currentClient } = useSelector((state) => state.clients);

  useEffect(() => {
    console.log("PARAMS", uuid);
    dispatch(fetchClientById(uuid));
  }, []);

  return (
    <>
      <PageHeader>
        <CustomersViewHeader />
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <CustomerContent userData={currentClient} />
        </div>
      </div>
    </>
  );
};

export default CustomersView;
