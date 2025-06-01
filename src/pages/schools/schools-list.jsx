import PageHeader from "@/components/shared/pageHeader/PageHeader";
import SchoolsHeader from "./components/SchoolsHeader";
import SchoolsTable from "./components/SchoolsTable";

const SchoolsList = () => {
  return (
    <>
      <PageHeader>
        <SchoolsHeader />
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <SchoolsTable />
        </div>
      </div>
    </>
  );
};

export default SchoolsList;
