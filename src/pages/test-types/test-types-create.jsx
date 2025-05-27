// import React from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import SchoolsCreateHeader from "./components/TestTypesCreateHeader";
import SchoolsCreateContent from "./components/TestTypesCreateContent";
import TestTypesCreateHeader from "./components/TestTypesCreateHeader";
import TestTypesCreateContent from "./components/TestTypesCreateContent";

const TestTypesCreate = () => {
  return (
    <>
      <PageHeader>
        <TestTypesCreateHeader />
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <TestTypesCreateContent />
        </div>
      </div>
    </>
  );
};

export default TestTypesCreate;
