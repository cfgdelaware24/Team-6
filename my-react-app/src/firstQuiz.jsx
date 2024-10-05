import React, { useState } from 'react';
import './firstquiz.css';

const HealthQuiz = () => {
    const [answers, setAnswers] = useState(Array(10).fill(''));

    const handleChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Answers:', answers);
        // send to first model
    };

    return (
        <div className="quiz-container">
            <h1>Take Quiz Here</h1>
            <form onSubmit={handleSubmit}>
                <div className="questions-left">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <div className="question-block" key={num}>
                            <label>{num}. {getQuestionText(num)}</label>
                            <div>
                                <input 
                                    type="radio" 
                                    id={`q${num}_yes`} 
                                    name={`q${num}`} 
                                    value="yes" 
                                    checked={answers[num-1] === 'yes'}
                                    onChange={() => handleChange(num-1, 'yes')}
                                />
                                <label htmlFor={`q${num}_yes`}>Yes</label>
                                <input 
                                    type="radio" 
                                    id={`q${num}_no`} 
                                    name={`q${num}`} 
                                    value="no" 
                                    checked={answers[num-1] === 'no'}
                                    onChange={() => handleChange(num-1, 'no')}
                                />
                                <label htmlFor={`q${num}_no`}>No</label>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="questions-right">
                    {[6, 7, 8, 9, 10].map((num) => (
                        <div className="question-block" key={num}>
                            <label>{num}. {getQuestionText(num)}</label>
                            <div>
                                <input 
                                    type="radio" 
                                    id={`q${num}_yes`} 
                                    name={`q${num}`} 
                                    value="yes" 
                                    checked={answers[num-1] === 'yes'}
                                    onChange={() => handleChange(num-1, 'yes')}
                                />
                                <label htmlFor={`q${num}_yes`}>Yes</label>
                                <input 
                                    type="radio" 
                                    id={`q${num}_no`} 
                                    name={`q${num}`} 
                                    value="no" 
                                    checked={answers[num-1] === 'no'}
                                    onChange={() => handleChange(num-1, 'no')}
                                />
                                <label htmlFor={`q${num}_no`}>No</label>
                            </div>
                        </div>
                    ))}
                </div>
                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
};

function getQuestionText(num) {
    const questions = [
        "Do you experience chest pain?",
        "Do you have a rapid or irregular heartbeat?",
        "Do you experience shortness of breath?",
        "Do you often feel dizzy?",
        "Do you experience unusual fatigue?",
        "Has your ability to exercise decreased recently?",
        "Do you have a family history of heart disease?",
        "Do you have diabetes?",
        "Are you over 60 years old?",
        "Do you smoke?"
    ];
    return questions[num - 1];
}

export default HealthQuiz;
