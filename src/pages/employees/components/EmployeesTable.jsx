import React, { memo, useEffect, useState } from "react";
import Table from "@/components/shared/table/Table";
import { FiEdit3, FiEye, FiMoreHorizontal, FiTrash2 } from "react-icons/fi";
import Dropdown from "@/components/shared/Dropdown";
import SelectDropdown from "@/components/shared/SelectDropdown";
import { Link, useNavigate } from "react-router-dom";
import useFilterByPermission from "@/hooks/useFilterByPermission";
import useConfirmation from "@/hooks/useConfirmation";
import { useDispatch } from "react-redux";
import { deleteEmployeeByIds } from "@/store/slice/employeeSlice";
import { PERMISSIONS } from "@/shared/permissionsConstant";

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

const EmployeesTable = ({ employees }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { filterItemsByPermission } = useFilterByPermission();
  const { showConfirmation, ConfirmationDialog } = useConfirmation();

  const getActions = ({ id, fullName }) => [
    { label: "Edit", icon: <FiEdit3 />, link: `/employees/${id}/edit`, permission: PERMISSIONS.EMPLOYEES.UPDATE },
    {
      label: "Delete",
      icon: <FiTrash2 />,
      onClick: () => handleConfirmDelete(id, fullName),
      permission: PERMISSIONS.EMPLOYEES.DELETE,
    },
  ];

  const handleConfirmDelete = (id, fullName) => {
    showConfirmation(
      <>
        Are you sure you want to delete <strong>{fullName}</strong> employee
        data?
      </>,
      () => {
        dispatch(deleteEmployeeByIds({ employeeIds: [id] }))
        .unwrap()
        .then(() => navigate('/employees'))
        .catch((err) => console.error('Error: ', err))
      },
      () => {}
    );
  };

  const columns = [
    {
      accessorKey: "id",
      header: ({ table }) => {
        const checkboxRef = React.useRef(null);

        useEffect(() => {
          if (checkboxRef.current) {
            checkboxRef.current.indeterminate = table.getIsSomeRowsSelected();
          }
        }, [table.getIsSomeRowsSelected()]);

        return (
          <input
            type="checkbox"
            className="custom-table-checkbox"
            ref={checkboxRef}
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        );
      },
      cell: ({ row }) => (
        <input
          type="checkbox"
          className="custom-table-checkbox"
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
      meta: {
        headerClassName: "width-30",
      },
    },

    {
      accessorKey: "fullName",
      header: () => "Employee Name",
      cell: ({ row }) => {
        const clientName = row.original.fullName;
        return (
          // <a className="hstack gap-3">
          //   {/* {roles?.img ? (
          //     <div className="avatar-image avatar-md">
          //       <img src={roles?.img} alt="" className="img-fluid" />
          //     </div>
          //   ) : (
          //     <div className="text-white avatar-text user-avatar-text avatar-md">
          //       {roles?.name.substring(0, 1)}
          //     </div>
          //   )} */}
          //   <div>
          //     <span className="text-truncate-1-line">{clientName}</span>
          //   </div>
          // </a>
          <Link to={`/employees/${row.original.id}`}>{clientName}</Link>
        );
      },
    },
    {
      accessorKey: "email",
      header: () => "Email",
      cell: (info) => (
        <a href={`mailto:${info.getValue()}`}>{info.getValue()}</a>
      ),
    },
    {
      accessorKey: "phoneNumber",
      header: () => "Phone Number",
      cell: (info) => <a href={`tel:${info.getValue()}`}>{info.getValue()}</a>,
      // meta: {
      //     className: "fw-bold text-dark"
      // }
    },
    {
      accessorKey: "roleName",
      header: () => "Role",
      cell: (info) => (
        <span className="badge bg-primary">{info.getValue()}</span>
      ),
    },
    {
      accessorKey: "isActive",
      header: () => "Is Active",
      cell: (info) => {
        const status =
          info.getValue() === true
            ? { text: "Active", color: "success" }
            : { text: "Inactive", color: "danger" };
        return (
          <span
            className={`badge bg-soft-${status.color} text-${status.color}`}
          >
            {status.text}
          </span>
        );
      },
    },
    {
      accessorKey: "actions",
      header: () => "Actions",
      enableSorting: false,
      cell: ({ row }) => {
        const permittedActions = filterItemsByPermission(
          getActions(row.original)
        );

        return (
          <div className="hstack gap-2 justify-content-end">
            <Link
              to={`/employees/${row.original.id}`}
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
      meta: {
        headerClassName: "text-end",
      },
    },
  ];

  return (
    <div>
      <Table data={employees} columns={columns} />
      <ConfirmationDialog />
    </div>
  );
};

export default EmployeesTable;
