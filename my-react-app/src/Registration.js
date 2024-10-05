import React, { useState } from 'react';
import './style.css';

const Registration = () => {
    return (
        <div className="container">
        <header>
            <img src={'./image1.jpeg'} alt="Heart in the Game" className="logo"/>
        </header>
        <div className="content">
            <div className="login">
                <h2 className="section-title">Login</h2>
                <form>
                    <div className="input-group">
                        <label for="email" className="form-label">Enter Email</label>
                        <input type="email" id="email" className="form-input" required/>
                    </div>
                    <div className="input-group">
                        <label for="password" className="form-label">Password</label>
                        <input type="password" id="password" className="form-input" required/>
                    </div>
                    <button type="submit" className="btn-login">Log in</button>
                </form>
                <p className="or-text">OR</p>
                <button className="btn-create-account">Create Account</button>
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