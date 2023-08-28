import React, { useState, useEffect } from "react"
import axios from "axios"
import "./Cell.css"



const TableCell = ({ getValue, row, column, table }) => {
    const initialValue = getValue()
    const columnMeta = column.columnDef.meta;
    const tableMeta = table.options.meta;
    const [value, setValue] = useState(initialValue)

    useEffect(() => 
    {setValue(initialValue)
    }, [initialValue])

    const onBlur = () => {
        table.options.meta?.updateData(row.index, column.id, value)
    }

    const onSelectChange = (e) => {
        setValue(e.target.value);
        tableMeta?.updateData(row.index, column.id, e.target.value);
    };

    const handleKeyDown = async (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onBlur();
            try{
                axios.post("http://localhost:8080/api/profile", tableMeta?.editedRows, {withCredentials:true}).then((res) => {
                    console.log(res.data);
                }
                );
            } catch (err) {
                console.log(err);
            }
        }
    };


    return columnMeta?.type === "select" ? (
        <select onChange={onSelectChange} value={initialValue}>
        {columnMeta?.options?.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
        ))}
        </select>
        ) : (
        <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
            onKeyDown={handleKeyDown}
            type={columnMeta?.type || "text"}
        />
    );
}

export default TableCell;