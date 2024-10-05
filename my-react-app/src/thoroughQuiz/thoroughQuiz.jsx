import React from 'react';
import './thorough.css';
import axios from 'axios';

const QuizComponent = () => {
    return (
        <div className="container">
            <h1>Take Quiz Here</h1>
            <div className="quiz-grid">
                <div className="question-box">
                    <p>1. Have you ever had your blood pressure measured, and do you know if it was high or low?</p>
                    <input type="text" placeholder="Your answer here..." />

                    <p>2. When was the last time your diastolic blood pressure (the bottom number) was checked?</p>
                    <input type="text" placeholder="Your answer here..." />

                    <p>3. Do you ever feel like your heart is racing or beating irregularly?</p>
                    <input type="text" placeholder="Your answer here..." />

                    <p>4. Do you ever find yourself breathing faster or slower than normal?</p>
                    <input type="text" placeholder="Your answer here..." />

                    <p>5. Have you ever experienced feeling very cold or having chills after a medical event, like chest pain or a heart problem?</p>
                    <input type="text" placeholder="Your answer here..." />

                    <p>6. Have you ever had your oxygen levels measured?</p>
                    <input type="text" placeholder="Your answer here..." />

                    <p>7. Has your doctor discussed how your age might affect your heart health or recovery after a heart event?</p>
                    <input type="text" placeholder="Your answer here..." />

                    <p>8. Did your doctor mention if your symptoms could differ because of your gender, especially related to heart problems?</p>
                    <input type="text" placeholder="Your answer here..." />

                    <p>9. After any medical treatment, did your doctor talk about how they checked your awareness and brain function?</p>
                    <input type="text" placeholder="Your answer here..." />

                    <p>10. Have your sodium levels been checked recently, especially if you’ve been in the hospital for heart-related problems?</p>
                    <input type="text" placeholder="Your answer here..." />
                </div>
                
                <div className="question-box">
                    <p>11. Have you ever been told that your potassium levels were too high or low?</p>
                    <input type="text" placeholder="Your answer here..." />

                    <p>12. Have you ever been told that your chloride levels were abnormal during any of your medical visits?</p>
                    <input type="text" placeholder="Your answer here..." />

                    <p>13. Has your doctor ever discussed your urea levels with you?</p>
                    <input type="text" placeholder="Your answer here..." />

                    <p>14. Have you had your creatinine levels checked, especially after experiencing a heart problem?</p>
                    <input type="text" placeholder="Your answer here..." />

                    <p>15. How often do you drink alcohol, and has your doctor advised you about how this might affect your heart health?</p>
                    <input type="text" placeholder="Your answer here..." />

                    <p>16. Do you currently smoke, or have you smoked in the past?</p>
                    <input type="text" placeholder="Your answer here..." />

                    <p>17. Do you have any close family members who have had heart attacks or other heart problems?</p>
                    <input type="text" placeholder="Your answer here..." />

                    <p>18. When you arrived at the hospital, did the doctors explain how they determined the urgency of your condition?</p>
                    <input type="text" placeholder="Your answer here..." />

                    <p>19. After receiving care for your heart problem, did your doctor discuss your recovery and what you should expect in the coming weeks or months?</p>
                    <input type="text" placeholder="Your answer here..." />
                </div>
            </div>
            <button className="submit-button">Submit</button>
        </div>
    );
};

export default QuizComponent;
