import React, {Component} from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Form from './components/Form/Form';
import Profile from './components/Profile/Profile';
import { Provider } from "react-redux";
import { store } from "./components/Redux/store";
import './App.css';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <NavBar />
                    <div className = "container-fluid">
                        <Routes>
                            <Route exact path="/" element={<Home/>} />
                            <Route exact path="/login" element={<Login/>} />
                            <Route exact path="/register" element={<Register/>} />
                            <Route exact path="/profile" element={<Profile />} /> 
                            <Route exact path="/form" element={<Form/>} />
                            <Route exact path="/dashboard" element={<Dashboard/>} />
                        </Routes>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}
