import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './firstquiz.css';
import Results from './Results/Results';
import ResultsHealthy from './Results/Resultshealthy';

const HealthQuiz = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [result, setResult] = useState(null);
    const userId = localStorage.getItem('userId'); // Fetch user ID from local storage to include in submissions

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/risk-assessment/questions');
            setQuestions(response.data);
            setAnswers(new Array(response.data.length).fill(false)); // Initialize all answers to false (No)
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value === 'yes'; // Save answer as true if 'yes' is selected
        setAnswers(newAnswers);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Ensure userId is fetched correctly before submission
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error('User ID is not available in local storage');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:3000/api/risk-assessment/submit', {
                userId: parseInt(userId),  // Convert to integer if it's stored as a string
                answers,
            });
            setResult(response.data); // Store the risk assessment result and advice
        } catch (error) {
            console.error('Error submitting assessment:', error);
        }
    };
    
    

    const renderResults = () => {
        if (!result) return null;

        if (result.assessment === 'good') {
            return <ResultsHealthy />;
        } else {
            return (
                <div className="result-container">
                    <h2>Your Risk Assessment Result</h2>
                    <p><strong>Risk Level:</strong> {result.assessment}</p>
                    <p><strong>Risk Percentage:</strong> {result.riskPercentage}%</p>
                    <div dangerouslySetInnerHTML={{ __html: result.advice }}></div>
                </div>
            );
        }
    };

    return (
        <div className="quiz-container">
            <h1>Heart Health Risk Assessment</h1>
            <form onSubmit={handleSubmit}>
                {questions.map((question, index) => (
                    <div className="question-block" key={index}>
                        <label>{index + 1}. {question.question}</label>
                        <div>
                            <input 
                                type="radio" 
                                id={`q${index}_yes`} 
                                name={`q${index}`} 
                                value="yes" 
                                checked={answers[index] === true}
                                onChange={() => handleChange(index, 'yes')}
                            />
                            <label htmlFor={`q${index}_yes`}>Yes</label>
                            <input 
                                type="radio" 
                                id={`q${index}_no`} 
                                name={`q${index}`} 
                                value="no" 
                                checked={answers[index] === false}
                                onChange={() => handleChange(index, 'no')}
                            />
                            <label htmlFor={`q${index}_no`}>No</label>
                        </div>
                    </div>
                ))}
                <button type="submit" className="submit-btn">Submit</button>
            </form>
            {renderResults()}
        </div>
    );
};

export default HealthQuiz;
