import PageHeader from "@/components/shared/pageHeader/PageHeader";
import TestTypesHeader from "./components/TestTypesHeader";
import TestTypesTable from "./components/TestTypesTable";

const TestTypesList = () => {
  return (
    <>
      <PageHeader>
        <TestTypesHeader />
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <TestTypesTable />
        </div>
      </div>
    </>
  );
};

export default TestTypesList;
