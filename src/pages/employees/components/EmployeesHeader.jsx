// import React from "react";
import {
  FiBarChart,
  FiBriefcase,
  FiDollarSign,
  FiEye,
  FiFilter,
  FiFlag,
  FiPaperclip,
  FiPlus,
  FiUserCheck,
  FiUserMinus,
  FiUsers,
} from "react-icons/fi";
import {
  BsFiletypeCsv,
  BsFiletypeExe,
  BsFiletypePdf,
  BsFiletypeTsx,
  BsFiletypeXml,
  BsPrinter,
} from "react-icons/bs";
import Dropdown from "@/components/shared/Dropdown";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useFilterByPermission from "@/hooks/useFilterByPermission";
import { PERMISSIONS } from "@/shared/permissionsConstant";

const EmployeesHeader = () => {
  const { hasPermission } = useFilterByPermission()
  return (
    <>
      <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
        {hasPermission(PERMISSIONS.EMPLOYEES.CREATE) &&
        <Link to="/employees/create" className="btn btn-primary">
          <FiPlus size={16} className="me-2" />
          <span>Create New Employee</span>
        </Link>
        }
      </div>

      <div
        id="collapseOne"
        className="accordion-collapse collapse page-header-collapse"
      >
        {/* <div className="accordion-body pb-2">
          <div className="row">
            <CustomersStatistics />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default EmployeesHeader;
