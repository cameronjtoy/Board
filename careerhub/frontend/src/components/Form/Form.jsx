import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyForm = () => {
  const [form, setForm] = useState({
    name: '',
    position: '',
    process: '',
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/user')
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  }

  return (
    <div>
      <h1>Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input 
            type="text" 
            name="name"
            value={form.name} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Position: </label>
          <input 
            type="text" 
            name="position"
            value={form.position} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Process: </label>
          <select 
            name="process"
            value={form.process} 
            onChange={handleChange}
          >
            <option value="">--Please choose an option--</option>
            <option value="process1">Process 1</option>
            <option value="process2">Process 2</option>
            <option value="process3">Process 3</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MyForm;
