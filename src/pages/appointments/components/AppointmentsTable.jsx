import React, { memo, useEffect, useState } from "react";
import Table from "@/components/shared/table/Table";
import { FiEdit3, FiEye, FiMoreHorizontal, FiTrash2 } from "react-icons/fi";
import Dropdown from "@/components/shared/Dropdown";
import SelectDropdown from "@/components/shared/SelectDropdown";
import { Link } from "react-router-dom";
import { clientStatusOptions } from "@/utils/options";
import { useDispatch, useSelector } from "react-redux";
import { PERMISSIONS } from "../../../shared/permissionsConstant";

const actions = [
  { label: "Edit", icon: <FiEdit3 />, permission: PERMISSIONS.APPOINTMENTS.UPDATE },
  // { label: "Print", icon: <FiPrinter /> },
  //   { label: "Remind", icon: <FiClock /> },
  // { type: "divider" },
  // { label: "Archive", icon: <FiArchive /> },
  // { label: "Report Spam", icon: <FiAlertOctagon />, },
  //   { type: "divider" },
  { label: "Delete", icon: <FiTrash2 />, permission: PERMISSIONS.APPOINTMENTS.DELETE },
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

const AppointmentsTable = ({ appointments }) => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.auth)

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
      accessorKey: "clientName",
      header: () => "Client Name",
      cell: (info) => {
        const appointmentId = info.row.original.id;
        const clientName = info.getValue();
        return (
          <Link to={`/appointments/${appointmentId}`}>{clientName}</Link>
          // <a href={`/appointments/${appointmentId}`} className="hstack gap-3">
          //   <div>
          //     <span className="text-truncate-1-line">{clientName}</span>
          //   </div>
          // </a>
        );
      },
    },
    {
      accessorKey: "psychologistName",
      header: () => "Psychologist Name",
      cell: (info) => <a>{info.getValue()}</a>,
    },
    {
      accessorKey: "title",
      header: () => "Appointment Title",
      cell: (info) => <a>{info.getValue()}</a>,
    },
    {
      accessorKey: "appointmentDate",
      header: () => "Appointment Date",
      cell: (info) => <a>{info.getValue()}</a>,
    },
    {
      accessorKey: "appointmentTime",
      header: () => "Appointment Time",
      cell: (info) => <a>{info.getValue()}</a>,
    },
    {
      accessorKey: "status",
      header: () => "Status",
      cell: (info) => {
        const statusColor = info.getValue() == 'Upcoming' ? 'warning' : info.getValue() == 'Ongoing' ? 'primary' : "success"
        return <span className={`badge bg-soft-${statusColor} text-${statusColor}`}>{info.getValue()}</span>
      }
    },
    {
      accessorKey: "actions",
      header: () => "Actions",
      cell: ({ row }) => {
        const permittedActions = actions.filter(action =>
          currentUser.permissions?.includes(action.permission)
        )

        return (
          <div className="hstack gap-2 justify-content-end">
            <Link
              to={`/appointments/${row.original.id}`}
              className="avatar-text avatar-md"
            >
              <FiEye />
            </Link>
            {currentUser.permissions?.includes(PERMISSIONS.APPOINTMENTS.UPDATE || PERMISSIONS.APPOINTMENTS.DELETE) &&
              <Dropdown
                dropdownItems={permittedActions}
                triggerClass="avatar-md"
                triggerPosition={"0,21"}
                triggerIcon={<FiMoreHorizontal />}
              />
            }
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
      <Table data={appointments} columns={columns} />
    </div>
  );
};

export default AppointmentsTable;
