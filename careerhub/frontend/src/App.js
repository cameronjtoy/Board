import './App.css';
import React from 'react';
import Table from './components/Table/Table';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Form from './components/Form/Form';
import axios from 'axios';

axios.defaults.withCredentials = true;



function App() {
  return (
    <div className="App">
      <NavBar/>

    </div>
  );
}

export default App;
