  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import "./Profile.css";
  import Cell from "../Buttons/Cell";
  import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
  import { useSelector, useDispatch } from 'react-redux';
  import { setData, setEditedRows, updateData } from '../Redux/Table/tableSlice';
  import TableCellContext from "../Redux/Table/tableContext"
  import { addRow } from "../Redux/Table/tableSlice";
  import Plus from "../../assets/plus";
  import Form from "../Form/Form";


  const columnHelper = createColumnHelper();


  const columns = [
    columnHelper.accessor("company_name", {
      header: "Company Name",
      cell: Cell,
      meta: {
        type: "text",
      },

    }),
    columnHelper.accessor("status", {
      header: "Stage",
      cell: Cell,
      meta: {
        type: "select",
        options: [
          { label: "Applied", value: "Applied" },
          { label: "Interviewing", value: "Interviewing" },
          { label: "Offer", value: "Offer" },
          { label: "Rejected", value: "Rejected" },
        ],
      },
    }),
    columnHelper.accessor("next_deadline", {
      header: "Next Deadline",
      cell: Cell,
      meta: {
        type: "date",
      },
    }),
    columnHelper.accessor("links", {
      header: "Links",
      cell: Cell,
      meta: {
        type: "text",
      },
    }),
  ];

  const Profile = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.table.data);
    const editedRows = useSelector(state => state.table.editedRows);
    const [cellBeingEdited, setCellBeingEdited] = useState(null); // default to no cell being edited

    const startEditing = (rowIndex, columnId) => {
      setCellBeingEdited({ rowIndex, columnId });
    };

    const stopEditing = () => {
      setCellBeingEdited(null);
    };

    const isCellEditable = (rowIndex, columnId) => {
      // Allow editing if no cell is being edited OR if the cell being edited is the current cell.
      return !cellBeingEdited || (cellBeingEdited.rowIndex === rowIndex && cellBeingEdited.columnId === columnId);
    };

    useEffect(() => {
      axios.get("http://localhost:8080/api/profile", { withCredentials: true }).then((res) => {
        dispatch(setData(res.data.userCompanies));
      });
    }, [dispatch]);

    const [newRow , setNewRow] = useState({
      company_name: "",
      status: "",
      next_deadline: "",
      links: "",
    });

    const handleNewRowChange = (columnId, value) => {
      setNewRow({ ...newRow, [columnId]: value });
    };

    const addRowToTable = (newRowData) => {
      dispatch(addRow(newRowData)); // 'addRow' is an action creator
    };


    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      meta: {
        editedRows,
        setEditedRows: (rows) => dispatch(setEditedRows(rows)),
        updateData: (rowIndex, columnId, value) => {
          dispatch(updateData({ rowIndex, columnId, value }));
        },
      }
    });


    return (
      <div className="profile">
        <Form />
      <TableCellContext.Provider value={{
        isCellEditable,
        startEditing,
        stopEditing
      }}>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </TableCellContext.Provider>
      </div>
    );
  }

  export default Profile;
