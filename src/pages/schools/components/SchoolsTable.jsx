import React, { memo, useEffect, useState } from "react";
import Table from "@/components/shared/table/Table";
import {
  FiAlertOctagon,
  FiArchive,
  FiClock,
  FiEdit3,
  FiEye,
  FiMoreHorizontal,
  FiMoreVertical,
  FiPrinter,
  FiSend,
  FiTrash2,
} from "react-icons/fi";
import Dropdown from "@/components/shared/Dropdown";
import SelectDropdown from "@/components/shared/SelectDropdown";
import Select from "react-select";
import { Link } from "react-router-dom";
import { clientStatusOptions } from "@/utils/options";
import { PERMISSIONS } from "@/shared/permissionsConstant";
import useFilterByPermission from "@/hooks/useFilterByPermission";

const actions = [
  { label: "Edit", icon: <FiEdit3 /> },
  // { label: "Print", icon: <FiPrinter /> },
  //   { label: "Remind", icon: <FiClock /> },
  // { type: "divider" },
  // { label: "Archive", icon: <FiArchive /> },
  // { label: "Report Spam", icon: <FiAlertOctagon />, },
  //   { type: "divider" },
  { label: "Delete", icon: <FiTrash2 /> },
];

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

const SchoolsTable = ({ data }) => {
  const { hasPermission } = useFilterByPermission()
  
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
      cell: (info) => <a className="text-wrap">{info.getValue()}</a>
    },
    {
      accessorKey: "pic.full_name",
      header: () => "PIC Name",
      cell: (info) => <a className="text-wrap">{info.getValue()}</a>
    },
    {
      accessorKey: "pic.email",
      header: () => "PIC Email",
      cell: (info) => <a href={`mailto:${info.getValue()}`} className="text-wrap">{info.getValue()}</a>,
    },
    {
      accessorKey: "pic.phoneNumber",
      header: () => "PIC Phone Number",
      cell: (info) => <a href={`tel:${info.getValue()}`} className="text-wrap">{info.getValue()}</a>,
    },
    {
      accessorKey: "isActive",
      header: () => "Is Active",
      cell: (info) => {
        const status = info.getValue() === true ? { text: 'Active', color: 'success' } : { text: 'Inactive', color: 'danger'};
        return <span className={`badge bg-soft-${status.color} text-${status.color}`}>{status.text}</span>
      }
    },
    {
      accessorKey: "actions",
      header: () => "Actions",
      cell: ({ row }) => (
        <div className="hstack gap-2 justify-content-end">
          <Link
            to={`/schools/${row.original.id}`}
            className="avatar-text avatar-md"
          >
            <FiEye />
          </Link>
          <Dropdown
            dropdownItems={actions}
            triggerClass="avatar-md"
            triggerPosition={"0,21"}
            triggerIcon={<FiMoreHorizontal />}
          />
        </div>
      ),
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

export default SchoolsTable;
