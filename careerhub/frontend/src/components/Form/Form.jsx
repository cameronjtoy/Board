import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

const MyForm = () => {
  const [form, setForm] = useState({
    company_name: '',
    company_position: '',
    status: '',
    next_deadline: '',
    links: '',
  });

  const [user, setUser] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/profile', form)
      .then((res) => {
        setUser(res.data);
        console.log("Working", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company Name: </label>
          <input 
            type="text" 
            name="company_name"
            value={form.company_name} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Position: </label>
          <input 
            type="text" 
            name="company_position"
            value={form.company_position} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Status: </label>
          <select 
            name="status"
            value={form.status} 
            onChange={handleChange}
          >
            <option value="">--Please choose an option--</option>
            <option value="process1">Process 1</option>
            <option value="process2">Process 2</option>
            <option value="process3">Process 3</option>
          </select>
        </div>
        <div>
          <label>Next Deadline: </label>
          <input 
            type="text" 
            name="next_deadline"
            value={form.next_deadline} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Link: </label>
          <input 
            type="text" 
            name="links"
            value={form.links} 
            onChange={handleChange} 
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MyForm;
