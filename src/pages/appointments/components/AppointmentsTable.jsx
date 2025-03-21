import React, { memo, useEffect, useState } from "react";
import Table from "@/components/shared/table/Table";
import { FiEdit3, FiEye, FiMoreHorizontal, FiTrash2 } from "react-icons/fi";
import Dropdown from "@/components/shared/Dropdown";
import SelectDropdown from "@/components/shared/SelectDropdown";
import { Link } from "react-router-dom";
import { clientStatusOptions } from "@/utils/options";

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

const ClientsTable = ({ clients }) => {
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
      header: () => "Client Name",
      cell: (info) => {
        const clientName = info.getValue();
        return (
          <a className="hstack gap-3">
            <div>
              <span className="text-truncate-1-line">{clientName}</span>
            </div>
          </a>
        );
      },
    },
    {
      accessorKey: "guardianName",
      header: () => "Guardian Name",
      cell: (info) => <a>{info.getValue()}</a>,
    },
    {
      accessorKey: "guardianEmail",
      header: () => "Guardian Email",
      cell: (info) => <a href="apps-email.html">{info.getValue()}</a>,
    },
    {
      accessorKey: "guardianPhone",
      header: () => "Guardian Phone",
      cell: (info) => <a href="tel:">{info.getValue()}</a>,
      // meta: {
      //     className: "fw-bold text-dark"
      // }
    },
    {
      accessorKey: "guardianRelationship",
      header: () => "Guardian Relationship",
      cell: (info) => <a>{info.getValue()}</a>,
    },
    // {
    //     accessorKey: 'date',
    //     header: () => 'Date',
    // },
    {
      accessorKey: "isActive",
      header: () => "Is Active",
      cell: (info) => (
        <TableCell
          options={clientStatusOptions}
          defaultSelect={info?.getValue().toString()}
        />
      ),
    },
    {
      accessorKey: "actions",
      header: () => "Actions",
      cell: ({ row }) => (
        <div className="hstack gap-2 justify-content-end">
          <Link
            to={`/clients/${row.original.uuid}`}
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
      <Table data={clients} columns={columns} />
    </div>
  );
};

export default ClientsTable;
