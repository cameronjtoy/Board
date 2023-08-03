import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Register = () => {

    const axiosInstance = axios.create({
        withCredentials: true
    });

    const [user, setUser] = useState({
        username:'', email:'', password: '', university: ''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const registerSubmit = async e =>{
        e.preventDefault()
        try {
            await axiosInstance.post('http://localhost:8080/register', {...user})

            localStorage.setItem('firstLogin', true)
            
            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="login-page">
            <form onSubmit={registerSubmit}>
                <h2>Register</h2>
                <input type="text" name="username" 
                placeholder="Name" value={user.username} onChange={onChangeInput} />

                <input type="email" name="email" 
                placeholder="Email" value={user.email} onChange={onChangeInput} />

                <input type="password" name="password" required autoComplete="on"
                placeholder="Password" value={user.password} onChange={onChangeInput} />

                <div className="row">
                    <button type="submit">Register</button>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register;