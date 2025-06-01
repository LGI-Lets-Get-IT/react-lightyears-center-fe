import PageHeader from "@/components/shared/pageHeader/PageHeader";
import EmployeesHeader from "./components/EmployeesHeader";
import EmployeesTable from "./components/EmployeesTable";

const EmployeesList = () => {
  return (
    <>
      <PageHeader>
        <EmployeesHeader />
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <EmployeesTable />
        </div>
      </div>
    </>
  );
};

export default EmployeesList;
