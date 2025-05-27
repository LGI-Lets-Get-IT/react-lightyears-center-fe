// import React from "react";
import {
  FiBriefcase,
  FiDollarSign,
  FiEye,
  FiFlag,
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
import { Link } from "react-router-dom";
import CustomersStatistics from "../../../components/widgetsStatistics/CustomersStatistics";
import { PERMISSIONS } from "../../../shared/permissionsConstant";
import useFilterByPermission from "@/hooks/useFilterByPermission";

const CustomersHeader = () => {
  const { hasPermission } = useFilterByPermission()
  return (
    <>
      <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
        {hasPermission(PERMISSIONS.CLIENTS.CREATE) &&
        <Link to="/clients/create" className="btn btn-primary">
          <FiPlus size={16} className="me-2" />
          <span>Create New Client</span>
        </Link>
        }
      </div>

      <div id="collapseOne" className="accordion-collapse collapse page-header-collapse"
      >
        <div className="accordion-body pb-2">
          <div className="row">
            <CustomersStatistics />
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomersHeader;
