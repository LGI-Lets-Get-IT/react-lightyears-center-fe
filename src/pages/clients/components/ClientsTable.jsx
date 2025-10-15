import React, { memo, useEffect, useState } from "react";
import Table from "@/components/shared/table/Table";
import { FiEdit3, FiEye, FiMoreHorizontal, FiTrash2 } from "react-icons/fi";
import Dropdown from "@/components/shared/Dropdown";
import SelectDropdown from "@/components/shared/SelectDropdown";
import { Link, useNavigate } from "react-router-dom";
import useFilterByPermission from "@/hooks/useFilterByPermission";
import useConfirmation from "@/hooks/useConfirmation";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteClientByUuids,
  fetchAllClients,
} from "@/store/slice/clientSlice";
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

const ClientsTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { filterItemsByPermission } = useFilterByPermission();
  const { showConfirmation, ConfirmationDialog } = useConfirmation();

  const { clients, isLoading: fetchLoading } = useSelector(
    (state) => state.clients
  );

  useEffect(() => {
    dispatch(fetchAllClients());
  }, []);

  const getActions = ({ uuid, fullName }) => {
    return [
      {
        label: "Edit",
        icon: <FiEdit3 />,
        link: `/clients/${uuid}/edit`,
        permission: PERMISSIONS.CLIENTS.UPDATE,
      },
      {
        label: "Delete",
        icon: <FiTrash2 />,
        onClick: () => handleConfirmDelete(uuid, fullName),
        permission: PERMISSIONS.CLIENTS.DELETE,
      },
    ];
  };

  const handleConfirmDelete = (uuid, fullName) => {
    showConfirmation(
      <>
        Are you sure you want to delete client <strong>{fullName}</strong> data?
      </>,
      () => {
        dispatch(deleteClientByUuids({ clientIds: [uuid] }))
          .unwrap()
          .then(() => navigate("/clients"))
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
      accessorKey: "fullName",
      header: () => "Client Name",
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
          <Link to={`/clients/${row.original.uuid}`}>{clientName}</Link>
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
      cell: (info) => (
        <a href={`mailto:${info.getValue()}`}>{info.getValue()}</a>
      ),
    },
    // {
    //     accessorKey: 'group',
    //     header: () => 'Group',
    //     cell: (info) => {
    //         const x = info.getValue()
    //         return (
    //             <Select
    //                 defaultValue={x.defaultSelect}
    //                 isMulti
    //                 name="tags"
    //                 options={x.tags}
    //                 className="basic-multi-select"
    //                 classNamePrefix="select"
    //                 hideSelectedOptions={false}
    //                 isSearchable={false}
    //                 // onChange={(e) => console.log(e)}
    //                 formatOptionLabel={tags => (
    //                     <div className="user-option d-flex align-items-center gap-2">
    //                         <span style={{ marginTop: "1px", backgroundColor: `${tags.color}` }} className={`wd-7 ht-7 rounded-circle`}></span>
    //                         <span>{tags.label}</span>
    //                     </div>
    //                 )}
    //             />
    //         )
    //     }
    // },
    {
      accessorKey: "guardianPhone",
      header: () => "Guardian Phone",
      cell: (info) => <a href={`tel:${info.getValue()}`}>{info.getValue()}</a>,
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
              to={`/clients/${row.original.uuid}`}
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
      <Table data={clients} columns={columns} loading={fetchLoading} />
      <ConfirmationDialog />
    </div>
  );
};

export default ClientsTable;
