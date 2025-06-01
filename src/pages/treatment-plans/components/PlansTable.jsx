import React, { memo, useEffect, useState } from "react";
import Table from "@/components/shared/table/Table";
import { FiEdit3, FiEye, FiMoreHorizontal, FiTrash2 } from "react-icons/fi";
import Dropdown from "@/components/shared/Dropdown";
import SelectDropdown from "@/components/shared/SelectDropdown";
import { Link, useNavigate } from "react-router-dom";
import { PERMISSIONS } from "@/shared/permissionsConstant";
import useFilterByPermission from "@/hooks/useFilterByPermission";
import useConfirmation from "@/hooks/useConfirmation";
import { useDispatch, useSelector } from "react-redux";
import { deletePlanByIds, fetchAllPlans } from "@/store/slice/treatmentPlanSlice";

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

const PlansTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { filterItemsByPermission } = useFilterByPermission();
  const { showConfirmation, ConfirmationDialog } = useConfirmation();

  const { plans, isLoading: fetchLoading } = useSelector((state) => state.treatmentPlans);

  useEffect(() => {
    dispatch(fetchAllPlans());
  }, []);

  const getActions = ({ id, clientName }) => [
    {
      label: "Edit",
      icon: <FiEdit3 />,
      link: `/treatment-plans/${id}/edit`,
      permission: PERMISSIONS.TREATMENT_PLANS.UPDATE,
    },
    {
      label: "Delete",
      icon: <FiTrash2 />,
      permission: PERMISSIONS.TREATMENT_PLANS.DELETE,
      onClick: () => handleConfirmDelete(id, clientName),
    },
  ];

  const handleConfirmDelete = (id, clientName) => {
    showConfirmation(
      <>
        Are you sure you want to delete <strong>{clientName}</strong> treatment
        plans?
      </>,
      () => {
        dispatch(deletePlanByIds({ planIds: [id] }))
        .unwrap()
        .then(() => navigate('/treatment-plans'))
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
      accessorKey: "clientName",
      header: () => "Client Name",
      cell: (info) => {
        const { clientId } = info.row.original;
        const clientName = info.getValue();
        return (
          <Link to={`/clients/${clientId}`} className="text-wrap">
            {clientName}
          </Link>
        );
      },
    },
    {
      accessorKey: "plannedBy",
      header: () => "Planned By",
      cell: (info) => <a className="text-wrap">{info.getValue()}</a>,
    },
    {
      accessorKey: "totalTreatments",
      header: () => "Total Treatments",
      cell: (info) => <a className="text-wrap">{info.getValue()} Programs</a>,
    },
    {
      accessorKey: "totalTargetedBehaviors",
      header: () => "Total Target Behaviors",
      cell: (info) => <a className="text-wrap">{info.getValue()} Targets</a>,
    },
    {
      accessorKey: "consultDate",
      header: () => "Consultation Date",
      cell: (info) => {
        const date = new Date(info.getValue());
        return <a>{date.toLocaleDateString()}</a>;
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
              to={`/treatment-plans/${row.original.id}`}
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
      <Table data={plans} columns={columns} loading={fetchLoading} />
      <ConfirmationDialog />
    </div>
  );
};

export default PlansTable;
