import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './firstquiz.css';

const HealthQuiz = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [result, setResult] = useState(null);
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get('/api/risk-assessment/questions');
            setQuestions(response.data);
            setAnswers(new Array(response.data.length).fill(false));
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value === 'yes';
        setAnswers(newAnswers);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/risk-assessment', { userId, answers });
            setResult(response.data);
        } catch (error) {
            console.error('Error submitting assessment:', error);
        }
    };

    return (
        <div className="quiz-container">
            <h1>Heart Health Risk Assessment</h1>
            <form onSubmit={handleSubmit}>
                {questions.map((question, index) => (
                    <div className="question-block" key={index}>
                        <label>{index + 1}. {question.text}</label>
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
            {/* {result && (
                <div className="result">
                    <h2>Assessment Result</h2>
                    <p>Risk Level: {result.assessment}</p>
                    <p>Risk Percentage: {result.riskPercentage}%</p>
                    <p>EKG Recommendation: {result.ekgRecommendation}</p>
                    <div dangerouslySetInnerHTML={{ __html: result.advice }} />
                </div>
            )} */}
        </div>
    );
};

export default HealthQuiz;
