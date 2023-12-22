import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('localhost/api/companies')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Industry</th>
                </tr>
            </thead>
            <tbody>
                {data.map(company => (
                    <tr key={company.id}>
                        <td>{company.name}</td>
                        <td>{company.location}</td>
                        <td>{company.industry}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Dashboard;
