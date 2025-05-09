// import React from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import ClientsCreateContent from "./clients/components/ClientsCreateContent";
import ClientsCreateHeader from "./clients/components/ClientsCreateHeader";

const CustomersCreate = () => {
  return (
    <>
      <PageHeader>
        <ClientsCreateHeader />
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <ClientsCreateContent />
        </div>
      </div>
    </>
  );
};

export default CustomersCreate;
