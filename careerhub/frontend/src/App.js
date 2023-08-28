import React, {Component} from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Table from './components/Table/Table';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Form from './components/Form/Form';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import axios from 'axios';
import './App.css';

axios.defaults.withCredentials = true;

export default class App extends Component {
  render() {
      return (
          <BrowserRouter>
              <NavBar />
              <div className = "container-fluid">
                  <Routes>
                      {/* <Route exact path="/" element={<Home/>} /> */}
                      <Route exact path="/login" element={<Login/>} />
                      <Route exact path="/register" element={<Register/>} />
                      <Route exact path="/profile" element={<Profile />} /> 
                      <Route exact path="/form" element={<Form />} />
                  </Routes>
              </div>
          </BrowserRouter>
      );
  }
}
