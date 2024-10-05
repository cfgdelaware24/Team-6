import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './firstquiz.css';
import Results from './Results/Results';
import Resultshealthy from '.Results/Resultshealthy'

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
            const response = await axios.post('/api/questions', { userId, answers });
            setResult(response.data);
            renderResults()
        } catch (error) {
            console.error('Error submitting assessment:', error);
        }
    };

    const renderResults = () => {
        if (!result) return null;

        if (result.assessment === "good") {
            return <Resultshealthy result={result} />;
        } else {
            return <Results result={result} />;
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
        </div>
    );
};

export default HealthQuiz;
