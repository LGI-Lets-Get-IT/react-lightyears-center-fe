import React, { memo, useEffect, useState } from "react";
import Table from "@/components/shared/table/Table";
import { FiEdit3, FiEye, FiMoreHorizontal, FiTrash2 } from "react-icons/fi";
import Dropdown from "@/components/shared/Dropdown";
import SelectDropdown from "@/components/shared/SelectDropdown";
import { Link, useNavigate } from "react-router-dom";
import useFilterByPermission from "@/hooks/useFilterByPermission";
import useConfirmation from "@/hooks/useConfirmation";
import { useDispatch, useSelector } from "react-redux";
import { deleteSchoolByIds, fetchAllSchools } from "@/store/slice/schoolSlice";
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

const SchoolsTable = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { filterItemsByPermission } = useFilterByPermission();
  const { showConfirmation, ConfirmationDialog } = useConfirmation();

  const { schools, isLoading: fetchLoading } = useSelector((state) => state.schools);

  useEffect(() => {
    dispatch(fetchAllSchools());
  }, []);

  const getActions = ({ id, name }) => [
    { label: "Edit", icon: <FiEdit3 />, link: `/schools/${id}/edit`, permission: PERMISSIONS.SCHOOLS.UPDATE },
    {
      label: "Delete",
      icon: <FiTrash2 />,
      onClick: () => handleConfirmDelete(id, name),
      permission: PERMISSIONS.SCHOOLS.DELETE
    },
  ];

  const handleConfirmDelete = (id, schoolName) => {
    showConfirmation(
      <>
        Are you sure you want to delete <strong>{schoolName}</strong> school
        data?
      </>,
      () => {
        dispatch(deleteSchoolByIds({ schoolIds: [id] }))
        .unwrap()
        .then(() => navigate('/schools'))
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
      accessorKey: "name",
      header: () => "School Name",
      cell: (info) => <a className="text-wrap">{info.getValue() || '-'}</a>,
    },
    {
      accessorKey: "pic.full_name",
      header: () => "PIC Name",
      cell: (info) => <a className="text-wrap">{info.getValue() || '-'}</a>,
    },
    {
      accessorKey: "pic.email",
      header: () => "PIC Email",
      cell: (info) => (
        <a href={`mailto:${info.getValue()}`} className="text-wrap">
          {info.getValue() || '-'}
        </a>
      ),
    },
    {
      accessorKey: "pic.phoneNumber",
      header: () => "PIC Phone Number",
      cell: (info) => (
        <a href={`tel:${info.getValue()}`} className="text-wrap">
          {info.getValue() || '-'}
        </a>
      ),
    },
    // {
    //   accessorKey: "isActive",
    //   header: () => "Is Active",
    //   cell: (info) => {
    //     const status =
    //       info.getValue() === true
    //         ? { text: "Active", color: "success" }
    //         : { text: "Inactive", color: "danger" };
    //     return (
    //       <span
    //         className={`badge bg-soft-${status.color} text-${status.color}`}
    //       >
    //         {status.text}
    //       </span>
    //     );
    //   },
    // },
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
              to={`/schools/${row.original.id}`}
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
      <Table data={schools} columns={columns} loading={fetchLoading} />
      <ConfirmationDialog />
    </div>
  );
};

export default SchoolsTable;
