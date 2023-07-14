import './App.css';
import React from 'react';
import Table from './components/Table/Table';
import NavBar from './components/NavBar/NavBar';
import Form from './components/Form/Form';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Table/>
      <Form/>
    </div>
  );
}

export default App;
