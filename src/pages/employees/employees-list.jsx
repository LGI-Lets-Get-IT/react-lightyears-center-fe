import { useEffect } from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import Footer from "@/components/shared/Footer";
import { useDispatch, useSelector } from "react-redux";
import EmployeesHeader from "./components/EmployeesHeader";
import { fetchAllEmployees } from "@/store/slice/employeeSlice";
import EmployeesTable from "./components/EmployeesTable";

const EmployeesList = () => {
  const dispatch = useDispatch();

  const { employees } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, []);
  return (
    <>
      <PageHeader>
        <EmployeesHeader />
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <EmployeesTable employees={employees} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EmployeesList;
