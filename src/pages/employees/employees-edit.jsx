// import React from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import EmployeesEditHeader from "./components/EmployeesEditHeader";
import EmployeesEditContent from "./components/EmployeesEditContent";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchEmployeeById } from "@/store/slice/employeeSlice";

const EmployeesEdit = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { employee } = useSelector((state) => state.employees);

  useEffect(() => {
    // console.log("PARAMS", uuid);
    dispatch(fetchEmployeeById(id));
  }, []);
  return (
    <>
      <PageHeader>
        <EmployeesEditHeader />
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <EmployeesEditContent employeeData={employee} />
        </div>
      </div>
    </>
  );
};

export default EmployeesEdit;
