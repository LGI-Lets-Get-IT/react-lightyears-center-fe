import React, { memo, useEffect, useState } from "react";
import Table from "@/components/shared/table/Table";
import { FiEdit3, FiEye, FiMoreHorizontal, FiTrash2 } from "react-icons/fi";
import Dropdown from "@/components/shared/Dropdown";
import SelectDropdown from "@/components/shared/SelectDropdown";
import { Link } from "react-router-dom";
import { clientStatusOptions } from "@/utils/options";
import { useSelector } from "react-redux";
import { PERMISSIONS } from "../../../shared/permissionsConstant";
import useFilterByPermission from "@/hooks/useFilterByPermission";
import { O } from "../../../../dist/assets/format-Dl4kvTJg";

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
  const { filterItemsByPermission } = useFilterByPermission()

  const getActions = (id) => [
    { label: "Edit", icon: <FiEdit3 />, link: `/settings/test-types/${id}/edit` },
    { label: "Delete", icon: <FiTrash2 />, OnClick: console.log("Delete") },
  ];

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
      cell: (info) => <a>{info.getValue()}</a>
    },
    {
      accessorKey: 'description',
      header: () => "Description",
      cell: (info) => {
        return (
          <a>{info.getValue()}</a>
        )
      }
    },
    {
      accessorKey: "actions",
      header: () => "Actions",
      cell: ({ row }) => {
        const permittedActions = filterItemsByPermission(getActions(row.original.id))

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
        )
      },
      meta: {
        headerClassName: "text-end",
      },
    },
  ];

  return (
    <div>
      <Table data={data} columns={columns} />
    </div>
  );
};

export default TestTypesTable;
