import { useEffect } from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchEmployeeById } from "@/store/slice/employeeSlice";
import EmployeesViewHeader from "./components/EmployeesViewHeader";
import EmployeeDetailContent from "./components/EmployeeDetailContent";

const EmployeesView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { employee } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployeeById(id));
  }, []);

  return (
    <>
      <PageHeader>
        <EmployeesViewHeader />
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <EmployeeDetailContent employeeData={employee} />
        </div>
      </div>
    </>
  );
};

export default EmployeesView;
