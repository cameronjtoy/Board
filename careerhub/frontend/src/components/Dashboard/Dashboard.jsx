import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/companies');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
    
        fetchData();
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>Company Name</th>
                    <th>Total Applications</th>
                    <th>Applied</th>
                    <th>Interview</th>
                    <th>Offer</th>
                    <th>Rejected</th>
                </tr>
            </thead>
            <tbody>
                {data.map(company => (
                    <tr key={company._id}>
                        <td>{company._id}</td>
                        <td>{company.total}</td>
                        <td>{company.applied}</td>
                        <td>{company.interview}</td>
                        <td>{company.offer}</td>
                        <td>{company.rejected}</td>
                        

                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Dashboard;
