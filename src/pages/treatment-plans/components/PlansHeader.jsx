import React from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import useFilterByPermission from "@/hooks/useFilterByPermission";
import { PERMISSIONS } from "@/shared/permissionsConstant";

const PlansHeader = () => {
  const { hasPermission } = useFilterByPermission();
  return (
    <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
      {hasPermission(PERMISSIONS.TREATMENT_PLANS.CREATE) && (
        <Link to="/treatment-plans/create" className="btn btn-primary">
          <FiPlus size={16} className="me-2" />
          <span>Create New Plan</span>
        </Link>
      )}
    </div>
  );
};

export default PlansHeader;
