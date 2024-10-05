import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './style.css';
import firstQuiz from './firstQuiz.jsx'
import EventsDashboard from './events-dashboard/eventsdash';
import CreateAccount from './create-acc/CreateAccount';

const Registration = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (isLogin) {
                // Login
                const response = await axios.post('http://localhost:3000/api/auth/login', { username, password });
                console.log('Login successful', response.data);

                // Redirect based on role
                if (response.data.role === 'participant') {
                    return <firstQuiz/>;
                } else if (response.data.role === 'volunteer') {
                    return <EventsDashboard/>;
                }
            } else {
                // Register
                await axios.post('http://localhost:3000/api/auth/register', { username, email, password });
                console.log('Registration successful');
                return <CreateAccount/>;
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
                <div className="mission-statement">
                    <h2 className="section-title">Mission Statement</h2>
                    <p>One in 300 youth has an undetected heart condition that puts them at risk for SCA. By providing screenings, we aim to improve survival from sudden cardiac arrest by educating the community on the importance and simplicity of bystander CPR.</p>
                </div>
            </div>
        </div>
    );
}

export default Registration;
