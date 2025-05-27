import React, { memo, useEffect, useState } from "react";
import Table from "@/components/shared/table/Table";
import { FiEdit3, FiEye, FiMoreHorizontal, FiTrash2 } from "react-icons/fi";
import Dropdown from "@/components/shared/Dropdown";
import SelectDropdown from "@/components/shared/SelectDropdown";
import useFilterByPermission from "@/hooks/useFilterByPermission";
import { format } from "date-fns";
import useConfirmation from "@/hooks/useConfirmation";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTestTypeByIds } from "@/store/slice/testTypeSlice";

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

const TestTypesTable = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { filterItemsByPermission } = useFilterByPermission();
  const { showConfirmation, ConfirmationDialog } = useConfirmation();

  const getActions = ({ id, name }) => [
    { label: "Edit", icon: <FiEdit3 />, link: `/test-types/${id}/edit` },
    {
      label: "Delete",
      icon: <FiTrash2 />,
      onClick: () => handleConfirmDelete(id, name),
    },
  ];

  const handleConfirmDelete = (id, testName) => {
    showConfirmation(
      <>
        Are you sure you want to delete <strong>{testName}</strong> data?
      </>,
      () => {
        dispatch(deleteTestTypeByIds({ testIds: [id]}))
        .unwrap()
        .then(() => navigate('/test-types'))
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
      header: () => "Test Name",
      cell: (info) => <a className="text-wrap">{info.getValue()}</a>,
    },
    {
      accessorKey: "description",
      header: () => "Description",
      cell: (info) => {
        return <a className="text-wrap">{info.getValue()}</a>;
      },
    },
    {
      accessorKey: "updatedAt",
      header: () => "Last Edited",
      cell: (info) => {
        return <a>{format(info.getValue(), "dd MMM yyyy, HH:mm aa")}</a>;
      },
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
            {/* <Link
              to={`/settings/test-types/${row.original.id}`}
              className="avatar-text avatar-md"
            >
              <FiEye />
            </Link> */}
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
      <Table data={data} columns={columns} />
      <ConfirmationDialog />
    </div>
  );
};

export default TestTypesTable;
