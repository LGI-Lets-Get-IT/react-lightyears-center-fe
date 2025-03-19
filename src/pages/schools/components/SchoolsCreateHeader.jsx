import topTost from "@/utils/topTost";
import React from "react";
import { FiLayers, FiUserPlus } from "react-icons/fi";

const SchoolsCreateHeader = () => {
  const handleClick = () => {
    topTost();
  };
  return (
    <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper"></div>
  );
};

export default SchoolsCreateHeader;
