import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './style.css';

const Registration = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (isLogin) {
                // Login
                const response = await axios.post('http://localhost:3000/api/auth/login', { username, password });
                const { token, userId, role } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);
                localStorage.setItem('role', role);
                // Redirect to quiz page after successful login
                navigate('/thorough-quiz');
            } else {
                // Register
                const response = await axios.post('http://localhost:3000/api/auth/register', { username, email, password });
                console.log('Registration successful', response.data);
                // Handle successful registration (e.g., show success message, switch to login)
                setIsLogin(true);
            }
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <div className="container">
            <header>
                <img src={'./image1.jpeg'} alt="Heart in the Game" className="logo"/>
            </header>
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
                    </form>
                    <p className="or-text">OR</p>
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className={isLogin ? "btn-create-account" : "btn-login"}
                    >
                        {isLogin ? 'Create Account' : 'Log in'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Registration;