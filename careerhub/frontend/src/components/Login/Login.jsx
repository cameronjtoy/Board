import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './login.css'
import axios from 'axios'
import NavBar from '../NavBar/NavBar'

const Login = () => {

    const axiosInstance = axios.create({
        withCredentials: true
    });
    const [user, setUser] = useState({
        username:'', password: ''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const submitHandler = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', { ...user });
            // You can now use response.data to get the user data from the response
            setUser(response.data); // assuming setUser is defined in your component
        
            // localStorage.setItem('firstLogin', true);
            window.location.href = "/";
            } catch (err) {
            alert(err.response.data.msg);
            }
        };
        


    return (
        <div className="login-page">
            <form onSubmit={submitHandler}>
                <h2>Login</h2>
                <input type="username" name="username" 
                placeholder="Username" value={user.username} onChange={onChangeInput} />
                <br/>
                <input type="password" name="password"
                placeholder="Password" value={user.password}  onChange={onChangeInput} />

                <div className="Login-Button">
                    <button type="submit">Login</button>
                    <label>Don't have an account? <Link to="/register">Register</Link></label>
                </div>
            </form>
        </div>
    )
}

export default Login;