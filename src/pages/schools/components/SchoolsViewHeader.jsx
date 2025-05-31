import useConfirmation from "@/hooks/useConfirmation";
import useFilterByPermission from "@/hooks/useFilterByPermission";
import { PERMISSIONS } from "@/shared/permissionsConstant";
import { deleteSchoolByIds } from "@/store/slice/schoolSlice";
import React from "react";
import {FiX } from "react-icons/fi";
import { LiaPencilAltSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SchoolsViewHeader = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading: deleteLoading } = useSelector(state => state.schools);
  const { hasPermission } = useFilterByPermission();
  const { showConfirmation, ConfirmationDialog } = useConfirmation();

  const handleConfirmDelete = () => {
    showConfirmation(
      'Are you sure you want to delete this school data?',
      () => {
        dispatch(deleteSchoolByIds({ schoolIds: [id] }))
        .unwrap()
        .then(() => navigate('/schools'))
        .catch((err) => console.error('Error: ', err))
      },
      () => {}
    )
  }
  
  return (
    <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
      <div className="filter-dropdown"></div>
      {/* <Dropdown
        dropdownItems={options}
        dropdownAutoClose={"outside"}
        triggerPosition={"0, 10"}
        triggerClass="btn btn-icon btn-light-brand"
        triggerIcon={<FiMoreHorizontal size={16} />}
      /> */}
      {hasPermission(PERMISSIONS.SCHOOLS.UPDATE) &&
        <a href={`/schools/${id}/edit`} className="btn btn-primary">
          <LiaPencilAltSolid size={16} className="me-2" />
          <span>Edit School</span>
        </a>
      }
      {hasPermission(PERMISSIONS.SCHOOLS.DELETE) &&
        <button className="btn btn-danger" onClick={handleConfirmDelete} disabled={deleteLoading}>
          {deleteLoading ? (
            <div
              className="spinner-border spinner-border-sm text-white me-2"
              role="status"
            />
          ) : (
            <FiX size={16} className="me-2" />
          )}
          <span>Delete School</span>
        </button>
      }
      <ConfirmationDialog/>
    </div>
  );
};

export default SchoolsViewHeader;
