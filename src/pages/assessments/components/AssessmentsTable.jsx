import React, { memo, useEffect, useState } from "react";
import Table from "@/components/shared/table/Table";
import { FiEdit3, FiEye, FiMoreHorizontal, FiTrash2 } from "react-icons/fi";
import Dropdown from "@/components/shared/Dropdown";
import SelectDropdown from "@/components/shared/SelectDropdown";
import { Link, useNavigate } from "react-router-dom";
import { PERMISSIONS } from "../../../shared/permissionsConstant";
import useFilterByPermission from "@/hooks/useFilterByPermission";
import useConfirmation from "@/hooks/useConfirmation";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAssessmentByIds,
  fetchAllAssessments,
} from "@/store/slice/assessmentSlice";

const TableCell = memo(({ options, defaultSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <SelectDropdown
      options={options}
      defaultSelect={defaultSelect}
      selectedOption={selectedOption}
      onSelectOption={(option) => setSelectedOption(option)}
    />
  );
});

TableCell.displayName = "TableCell";

const AssessmentsTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { filterItemsByPermission } = useFilterByPermission();
  const { showConfirmation, ConfirmationDialog } = useConfirmation();

  const { assessments, isLoading: fetchLoading } = useSelector(
    (state) => state.assessments
  );

  useEffect(() => {
    dispatch(fetchAllAssessments());
  }, []);

  const getActions = ({ id, clientName, testName }) => [
    {
      label: "Edit",
      icon: <FiEdit3 />,
      link: `/assessments/${id}/edit`,
      permission: PERMISSIONS.ASSESSMENTS.UPDATE,
    },
    {
      label: "Delete",
      icon: <FiTrash2 />,
      onClick: () => handleConfirmDelete(id, clientName, testName),
      permission: PERMISSIONS.ASSESSMENTS.DELETE,
    },
  ];

  const handleConfirmDelete = (id, clientName, testName) => {
    showConfirmation(
      <>
        Are you sure you want to delete <strong>{clientName}</strong> assessment
        for <strong>{testName}</strong>?
      </>,
      () => {
        dispatch(deleteAssessmentByIds({ assessmentIds: [id] }))
          .unwrap()
          .then(() => navigate("/assessments"))
          .catch((err) => console.error("Error: ", err));
      },
      () => {}
    );
  };

  const columns = [
    {
      accessorKey: "id",
      // header: ({ table }) => {
      //   const checkboxRef = React.useRef(null);

      //   useEffect(() => {
      //     if (checkboxRef.current) {
      //       checkboxRef.current.indeterminate = table.getIsSomeRowsSelected();
      //     }
      //   }, [table.getIsSomeRowsSelected()]);

      //   return (
      //     <input
      //       type="checkbox"
      //       className="custom-table-checkbox"
      //       ref={checkboxRef}
      //       checked={table.getIsAllRowsSelected()}
      //       onChange={table.getToggleAllRowsSelectedHandler()}
      //     />
      //   );
      // },
      // cell: ({ row }) => (
      //   <input
      //     type="checkbox"
      //     className="custom-table-checkbox"
      //     checked={row.getIsSelected()}
      //     disabled={!row.getCanSelect()}
      //     onChange={row.getToggleSelectedHandler()}
      //   />
      // ),
      header: () => "ID",
      cell: (info) => <a>{info.getValue()}</a>,
      meta: {
        headerClassName: "width-30",
      },
    },

    {
      accessorKey: "clientName",
      header: () => "Client Name",
      cell: (info) => {
        const { clientId } = info.row.original;
        const clientName = info.getValue();
        return <Link to={`/clients/${clientId}`}>{clientName}</Link>;
      },
    },
    {
      accessorKey: "testName",
      header: () => "Test Name",
      cell: (info) => {
        return <a>{info.getValue()}</a>;
      },
    },
    {
      accessorKey: "assessedBy",
      header: () => "Assessed By",
      cell: (info) => <a>{info.getValue()}</a>,
    },
    {
      accessorKey: "assessmentDate",
      header: () => "Done on",
      cell: (info) => <a>{info.getValue()}</a>,
    },
    {
      accessorKey: "actions",
      header: () => "Actions",
      cell: ({ row }) => {
        const permittedActions = filterItemsByPermission(
          getActions(row.original)
        );

        return (
          <div className="hstack gap-2 justify-content-end">
            <Link
              to={`/assessments/${row.original.id}`}
              className="avatar-text avatar-md"
            >
              <FiEye />
            </Link>
            {permittedActions.length > 0 && (
              <Dropdown
                dropdownItems={permittedActions}
                triggerClass="avatar-md"
                triggerPosition={"0,21"}
                triggerIcon={<FiMoreHorizontal />}
              />
            )}
          </div>
        );
      },
      // meta: {
      //   headerClassName: "text-end",
      // },
    },
  ];

  return (
    <div>
      <Table data={assessments} columns={columns} loading={fetchLoading} />
      <ConfirmationDialog />
    </div>
  );
};

export default AssessmentsTable;
