// import React from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import ClientsCreateContent from "./components/ClientsCreateContent";
import ClientsCreateHeader from "./components/ClientsCreateHeader";

const ClientsCreate = () => {
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

export default ClientsCreate;
