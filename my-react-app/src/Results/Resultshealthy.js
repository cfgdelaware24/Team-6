import React from 'react';
import './results.css'; 
import { useNavigate } from 'react-router-dom';

function Results() {
    const navigate = useNavigate(); 

    return (
        <div className="container">
            <div className="results-box">
                <h2>Results</h2>
                <p className="result-status">
                    Based on your results, you are <span className="at-risk">AT RISK</span>
                </p>
                <img src="image1.jpeg" alt="Heart in the Game" className="logo" />
                <p className="suggestion">We suggest you take an <strong>EKG</strong> test based on your results</p>
                <p className="suggestion">We suggest you volunteer or take more action</p>
                <button className="volunteer-button">Click here to volunteer and help others get tested</button>
                
                <button className="info-button" onClick={() => navigate('/events-dashboard')}>Personal Profile</button>

               
            </div>
        </div>
    );
}

export default Results;
