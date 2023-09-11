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

    const onSelectChange = async (e) => {
        setValue(e.target.value);
        tableMeta?.updateData(row.index, column.id, e.target.value);
    
        // Send a POST request with the updated value when an item is selected from the dropdown
        try {
            const payload = {
                rowIndex: row.index,
                columnId: column.id,
                companyName: row.original.company_name,
                initialValues: initialValue,
                updatedValue: e.target.value, // Note: using e.target.value here directly
            };
            const res = await axios.post("http://localhost:8080/api/profile/update", payload);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    const onDateChange = async (e) => {
        setValue(e.target.value);
        tableMeta?.updateData(row.index, column.id, e.target.value);
        
        // Send a POST request with the selected date
        try {
            const payload = {
                rowIndex: row.index,
                columnId: column.id,
                companyName: row.original.company_name,
                initialValues: initialValue,
                updatedValue: e.target.value, 
            };
            const res = await axios.post("http://localhost:8080/api/profile/update", payload);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    

    const handleKeyDown = async (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onBlur();
            // Send a POST request with the updated value
            try {
                const payload = {
                    rowIndex: row.index,
                    columnId: column.id,
                    companyName: row.original.company_name,
                    initialValues: initialValue,
                    updatedValue: value,
                    
                };
                const res = await axios.post("http://localhost:8080/api/profile/update", payload);
                console.log(res);

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
    ) : columnMeta?.type === "date" ? (
        <input
            type="date"
            value={value}
            onChange={onDateChange}
        />
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