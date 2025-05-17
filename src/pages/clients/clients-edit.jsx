// import React from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import ClientsEditContent from "./components/ClientsEditContent";
import ClientsEditHeader from "./components/ClientsEditHeader";
const ClientsEdit = () => {
  return (
    <>
      <PageHeader>
        {/* <ClientsEditHeader /> */}
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <ClientsEditContent />
        </div>
      </div>
    </>
  );
};

export default ClientsEdit;
