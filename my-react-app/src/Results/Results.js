// Results.js

import React from 'react';
import './results.css'; // Import your CSS file

function Results(result) {
    return (
        <div className="container">
            <div className="results-box">
                <h2>Results</h2>
                <p className="result-status">
                    Based on your results, you are <span className="at-risk">{result}</span>
                </p>
                <img src="image1.jpeg" alt="Heart in the Game" className="logo" />
                <p className="suggestion">We suggest you take an <strong>EKG</strong> test based on your results</p>
                <p className="suggestion">We suggest you volunteer or take more action</p>
                <button className="volunteer-button">Click here to volunteer and help others get tested</button>
            </div>
        </div>
    );
}

export default Results;
