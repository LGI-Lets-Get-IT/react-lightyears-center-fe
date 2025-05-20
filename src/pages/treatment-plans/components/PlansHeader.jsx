import React from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import useFilterByPermission from "@/hooks/useFilterByPermission";
import { PERMISSIONS } from "@/shared/permissionsConstant";

const PlansHeader = () => {
  const { hasPermission } = useFilterByPermission();
  return (
    <>
      <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
        {/* <a
          href="#"
          className="btn btn-icon btn-light-brand"
          data-bs-toggle="collapse"
          data-bs-target="#collapseOne"
        >
          <FiBarChart size={16} strokeWidth={1.6} />
        </a> */}
        {/* <Dropdown
          dropdownItems={filterAction}
          triggerPosition={"0, 12"}
          triggerIcon={<FiFilter size={16} strokeWidth={1.6} />}
          triggerClass="btn btn-icon btn-light-brand"
          isAvatar={false}
        /> */}
        {/* <Dropdown
          dropdownItems={fileType}
          triggerPosition={"0, 12"}
          triggerIcon={<FiPaperclip size={16} strokeWidth={1.6} />}
          triggerClass="btn btn-icon btn-light-brand"
          iconStrokeWidth={0}
          isAvatar={false}
        /> */}
        {hasPermission(PERMISSIONS.TREATMENT_PLANS.CREATE) && (
          <Link to="/treatment-plans/create" className="btn btn-primary">
            <FiPlus size={16} className="me-2" />
            <span>Create New Plan</span>
          </Link>
        )}
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

export default PlansHeader;
