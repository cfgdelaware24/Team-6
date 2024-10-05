import React from 'react';
import './firstquiz.css';

const HealthQuiz = () => {
    return (
        <div className="quiz-container">
            <h1>Take Quiz Here</h1>
            <form>
                <div className="questions-left">
                    <div className="question-block">
                        <label>1. Do you experience chest pain?</label>
                        <div>
                            <input type="radio" id="q1_yes" name="q1" value="yes" />
                            <label htmlFor="q1_yes">Yes</label>
                            <input type="radio" id="q1_no" name="q1" value="no" />
                            <label htmlFor="q1_no">No</label>
                        </div>
                    </div>
                    <div className="question-block">
                        <label>2. Do you have a rapid or irregular heartbeat?</label>
                        <div>
                            <input type="radio" id="q2_yes" name="q2" value="yes" />
                            <label htmlFor="q2_yes">Yes</label>
                            <input type="radio" id="q2_no" name="q2" value="no" />
                            <label htmlFor="q2_no">No</label>
                        </div>
                    </div>
                    <div className="question-block">
                        <label>3. Do you experience shortness of breath?</label>
                        <div>
                            <input type="radio" id="q3_yes" name="q3" value="yes" />
                            <label htmlFor="q3_yes">Yes</label>
                            <input type="radio" id="q3_no" name="q3" value="no" />
                            <label htmlFor="q3_no">No</label>
                        </div>
                    </div>
                    <div className="question-block">
                        <label>4. Do you often feel dizzy?</label>
                        <div>
                            <input type="radio" id="q4_yes" name="q4" value="yes" />
                            <label htmlFor="q4_yes">Yes</label>
                            <input type="radio" id="q4_no" name="q4" value="no" />
                            <label htmlFor="q4_no">No</label>
                        </div>
                    </div>
                    <div className="question-block question5">
                        <label>5. Do you experience unusual fatigue?</label>
                        <div>
                            <input type="radio" id="q5_yes" name="q5" value="yes" />
                            <label htmlFor="q5_yes">Yes</label>
                            <input type="radio" id="q5_no" name="q5" value="no" />
                            <label htmlFor="q5_no">No</label>
                        </div>
                    </div>
                </div>
                <div className="questions-right">
                    <div className="question-block">
                        <label>6. Has your ability to exercise decreased recently?</label>
                        <div>
                            <input type="radio" id="q6_yes" name="q6" value="yes" />
                            <label htmlFor="q6_yes">Yes</label>
                            <input type="radio" id="q6_no" name="q6" value="no" />
                            <label htmlFor="q6_no">No</label>
                        </div>
                    </div>
                    <div className="question-block">
                        <label>7. Do you have a family history of heart disease?</label>
                        <div>
                            <input type="radio" id="q7_yes" name="q7" value="yes" />
                            <label htmlFor="q7_yes">Yes</label>
                            <input type="radio" id="q7_no" name="q7" value="no" />
                            <label htmlFor="q7_no">No</label>
                        </div>
                    </div>
                    <div className="question-block">
                        <label>8. Do you have diabetes?</label>
                        <div>
                            <input type="radio" id="q8_yes" name="q8" value="yes" />
                            <label htmlFor="q8_yes">Yes</label>
                            <input type="radio" id="q8_no" name="q8" value="no" />
                            <label htmlFor="q8_no">No</label>
                        </div>
                    </div>
                    <div className="question-block">
                        <label>9. Are you over 60 years old?</label>
                        <div>
                            <input type="radio" id="q9_yes" name="q9" value="yes" />
                            <label htmlFor="q9_yes">Yes</label>
                            <input type="radio" id="q9_no" name="q9" value="no" />
                            <label htmlFor="q9_no">No</label>
                        </div>
                    </div>
                    <div className="question-block">
                        <label>10. Do you smoke?</label>
                        <div>
                            <input type="radio" id="q10_yes" name="q10" value="yes" />
                            <label htmlFor="q10_yes">Yes</label>
                            <input type="radio" id="q10_no" name="q10" value="no" />
                            <label htmlFor="q10_no">No</label>
                        </div>
                    </div>
                </div>
                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
};

export default HealthQuiz;
