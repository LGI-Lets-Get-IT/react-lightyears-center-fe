import React, { memo, useEffect, useState } from "react";
import Table from "@/components/shared/table/Table";
import { FiEdit3, FiEye, FiMoreHorizontal, FiTrash2 } from "react-icons/fi";
import Dropdown from "@/components/shared/Dropdown";
import SelectDropdown from "@/components/shared/SelectDropdown";
import { Link, useNavigate } from "react-router-dom";
import useFilterByPermission from "@/hooks/useFilterByPermission";
import { PERMISSIONS } from "@/shared/permissionsConstant";
import useConfirmation from "@/hooks/useConfirmation";
import { useDispatch, useSelector } from "react-redux";
import { deleteAppointmentByIds, fetchAllAppointments } from "@/store/slice/appointmentSlice";
import format from "date-fns/format";

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

const AppointmentsTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { filterItemsByPermission } = useFilterByPermission();
  const { showConfirmation, ConfirmationDialog } = useConfirmation();

  const { appointments, isLoading: fetchLoading } = useSelector((state) => state.appointments);

  useEffect(() => {
    dispatch(fetchAllAppointments());
  }, []);

  const getActions = ({ id, title }) => [
    {
      label: "Edit",
      icon: <FiEdit3 />,
      link: `/appointments/${id}/edit`,
      permission: PERMISSIONS.APPOINTMENTS.DELETE,
    },
    {
      label: "Delete",
      icon: <FiTrash2 />,
      onClick: () => handleDeleteConfirm(id, title),
      permission: PERMISSIONS.APPOINTMENTS.DELETE,
    },
  ];

  const handleDeleteConfirm = (id, title) => {
    showConfirmation(
      <>
        Are you sure you want to delete <strong>{title}</strong> appointment?
      </>,
      () => {
        dispatch(deleteAppointmentByIds({ appointmentIds: [id] }))
          .unwrap()
          .then(() => navigate("/appointments"))
          .catch((err) => console.error("Error: ", err));
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
      accessorKey: "clientName",
      header: () => "Client Name",
      cell: (info) => {
        const { clientId } = info.row.original;
        const clientName = info.getValue();
        return (
          <Link to={`/clients/${clientId}`}>{clientName}</Link>
          // <a href={`/appointments/${appointmentId}`} className="hstack gap-3">
          //   <div>
          //     <span className="text-truncate-1-line">{clientName}</span>
          //   </div>
          // </a>
        );
      },
    },
    {
      accessorKey: "picName",
      header: () => "PIC Name",
      cell: (info) => <a>{info.getValue()}</a>,
    },
    {
      accessorKey: "picType",
      header: () => "PIC Type",
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
      cell: (info) => <a>{info?.getValue() && format(info.getValue(), 'dd MMM yyyy')}</a>,
    },
    {
      accessorKey: "appointmentTime",
      header: () => "Appointment Time",
      cell: (info) => <a>{info.getValue()}</a>,
    },
    {
      accessorKey: "appointmentType",
      header: () => "Type",
      cell: (info) => {
        return (
          <span className="text-capitalize badge bg-primary">
            {info.getValue()}
          </span>
        );
      },
    },
    {
      accessorKey: 'isConfirmed',
      header: () => 'Confirmed by PIC',
      cell: (info) => {
        const text = info.getValue() ? 'Confirmed' : 'Not Confirmed';
        const color = info.getValue() ? 'success' : 'danger';
        return (
          <span className={`badge bg-soft-${color} text-${color}`}>
            {text}
          </span>
        )
      }
    },
    {
      accessorKey: "status",
      header: () => "Status",
      cell: (info) => {
        const statusText = info.getValue();
        const statusColor =
          statusText == "Upcoming"
            ? "warning"
            : statusText == "Ongoing"
            ? "primary"
            : "success";
        return (
          <span className={`badge bg-soft-${statusColor} text-${statusColor}`}>
            {statusText}
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
              to={`/appointments/${row.original.id}`}
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
      <Table data={appointments} columns={columns} loading={fetchLoading} />
      <ConfirmationDialog />
    </div>
  );
};

export default AppointmentsTable;
