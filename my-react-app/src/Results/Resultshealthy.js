import React from 'react';
import './resultshealthy.css';
import image1 from './image1.jpeg'; 

const ResultsHealthy = () => {
  return (
    <div className="container">
      <div className="results-box">
        <h2>Results</h2>
        <p className="result-status">
          Based on your results, you are <span className="healthy">HEALTHY</span>
        </p>
        <img src={image1} alt="Heart in the Game" className="logo" />
        <p className="suggestion">
          We suggest you take an <strong>EKG</strong> test based on your results
        </p>
        <p className="volunteer-link">
          <a href="#" className="volunteer-button">
            Click here to volunteer and help others get tested <br /> and see if they have a healthy heart
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResultsHealthy;
