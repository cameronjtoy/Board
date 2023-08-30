import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import Cell from "../Buttons/Cell";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";


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
        header: "Status",
        cell: Cell,
        meta : {
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
    const [data, setData] = useState([]);
    const [editedRows, setEditedRows] = useState({});
    
    useEffect(() => {
        axios.get("http://localhost:8080/api/profile", {withCredentials:true}).then((res) => {
            setData(res.data.userCompanies);
        });
    }, []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        meta: {
            editedRows,
            setEditedRows,
            updateData: (rowIndex, columnId, value) => {
                setData((old) =>
                old.map((row, index) => {
                    if (index === rowIndex) {
                    return {
                        ...old[rowIndex],
                        [columnId]: value,
                    };
                    }
                    return row;
                })
                );
            },
            },
        });


    return (
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
    );
}

export default Profile;
