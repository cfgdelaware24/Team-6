import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';
import CreateAccount from './create-acc/CreateAccount';

const Registration = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    
        try {
            if (isLogin) {
                // Login
                const response = await axios.post('http://localhost:3000/api/auth/login', { username, password });
                console.log('Login successful', response.data);
                localStorage.setItem('userId', response.data.userId); // Save userId to local storage
                if (response.data.role === 'participant') {
                    navigate('/firstquiz');
                } else if (response.data.role === 'volunteer') {
                    navigate('/events-dashboard');
                }
            } else {
                // Register
                if (!role) {
                    setError('Role is required to create an account');
                    return;
                }
                await axios.post('http://localhost:3000/api/auth/register', { username, email, password, role, name, age: parseInt(age), phone });
                console.log('Registration successful');
                setIsLogin(true);
            }
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
        }
    };
    
    

    return (
        <div className="container">
            <div className="content">
                <div className="login">
                    <h2 className="section-title">{isLogin ? 'Login' : 'Create Account'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        {!isLogin && (
                            <>
                                <div className="input-group">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-input"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label className="form-label">Age</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label className="form-label">Phone</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label className="form-label">Role</label>
                                    <select
                                        className="form-input"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Role</option>
                                        <option value="participant">Participant</option>
                                        <option value="volunteer">Volunteer</option>
                                    </select>
                                </div>
                            </>
                        )}
                        <div className="input-group">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit" className={isLogin ? "btn-login" : "btn-create-account"}>
                            {isLogin ? 'Log in' : 'Create Account'}
                        </button>
                        <button
                        onClick={() => setIsLogin(!isLogin)}
                        className={isLogin ? "btn-create-account" : "btn-login"}
                    >
                        {isLogin ? 'Create Account' : 'Log in'}
                    </button>
                    </form>  
                </div>
                <div className="mission-statement">
                    <h2 className="section-title">Mission Statement</h2>
                    <p>One in 300 youth has an undetected heart condition that puts them at risk for SCA. By providing screenings, we aim to improve survival from sudden cardiac arrest by educating the community on the importance and simplicity of bystander CPR.</p>
                </div>
            </div>
        </div>
    );
};

export default Registration;