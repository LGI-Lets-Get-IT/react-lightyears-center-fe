// import React from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import SchoolsCreateHeader from "./components/SchoolsCreateHeader";
import SchoolsCreateContent from "./components/SchoolsCreateContent";

const SchoolsCreate = () => {
  return (
    <>
      <PageHeader>
        <SchoolsCreateHeader />
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <SchoolsCreateContent />
        </div>
      </div>
    </>
  );
};

export default SchoolsCreate;
