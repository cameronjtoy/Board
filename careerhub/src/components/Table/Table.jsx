import React, { useEffect, useRef, useState } from 'react';
import './table.css';
import axios from 'axios';


    // The table component
const Table = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/companies')
        .then((res) => {
            setCompanies(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);


    return (
        <table className="company-table">
        <thead className="table-header">
            <tr className="table-row">
            <th className="table-header-cell">#</th>
            <th className="table-header-cell">Company</th>
            <th className="table-header-cell">Applied</th>
            <th className="table-header-cell">Rejected</th>
            <th className="table-header-cell">OA</th>
            <th className="table-header-cell">Interview</th>
            <th className="table-header-cell">Final</th>
            <th className="table-header-cell">Offer</th>
            </tr>
        </thead>
        <tbody className="table-body">
            {companies.map((row, index) => (
            <tr key={index} className="table-row">
                <td className="table-cell">{row.company}</td>
                <td className="table-cell">{row.applied}</td>
                <td className="table-cell">{row.rejected}</td>
                <td className="table-cell">{row.oa}</td>
                <td className="table-cell">{row.interview}</td>
                <td className="table-cell">{row.final}</td>
                <td className="table-cell">{row.offer}</td>
            </tr>
            ))}
        </tbody>
        </table>
    );
    
};

export default Table;
