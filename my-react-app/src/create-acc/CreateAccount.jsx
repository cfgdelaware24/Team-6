import React from 'react';
import './create.css';

function CreateAccount() {
    return (
        <div className="container">
            <header>
                <img src="image1.jpeg" alt="Heart in the Game" className="logo" />
            </header>
            <div className="content">
                <div className="create-account">
                    <h2 className="section-title">Create Account</h2>
                    <form>
                        <div className="input-group">
                            <label htmlFor="phone" className="form-label">Enter Phone Number</label>
                            <input type="text" id="phone" className="form-input" placeholder="Enter phone number" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="birthday" className="form-label">Enter Birthday (MM/DD/YYYY)</label>
                            <input type="text" id="birthday" className="form-input" placeholder="MM/DD/YYYY" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password" className="form-label">Create Password</label>
                            <input type="password" id="password" className="form-input" placeholder="Create password" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                            <input type="password" id="confirm-password" className="form-input" placeholder="Confirm password" required />
                        </div>
                        <div className="input-group">
                            <label>Volunteer or Participant</label>
                            <label htmlFor="volunteer">
                                <input type="radio" id="volunteer" name="role" value="volunteer" /> Volunteer
                            </label>
                            <label htmlFor="participant">
                                <input type="radio" id="participant" name="role" value="participant" /> Participant
                            </label>
                        </div>
                        <button type="submit" className="btn-create-account">Create Account</button>
                        <p className="or-text">or</p>
                        <button type="button" className="btn-login">Log in</button>
                    </form>
                </div>
                <div className="mission-statement">
                    <h2 className="section-title">Mission Statement</h2>
                    <p>One in 300 youth has an undetected heart condition that puts them at risk for SCA. By providing screenings, we aim to improve survival from sudden cardiac arrest by educating the community on the importance and simplicity of bystander CPR.</p>
                    <svg
                        className="heart-icon"
                        width="50"
                        height="50"
                        viewBox="0 0 150 150"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M125 106.25C128.583 106.25 131.604 107.5 134.062 110C136.521 112.5 137.729 115.417 137.687 118.75L87.4999 137.5L43.7499 125V68.75H55.9374L101.375 85.5625C104.625 86.8542 106.25 89.1875 106.25 92.5625C106.25 94.5208 105.542 96.2292 104.125 97.6875C102.708 99.1458 100.917 99.9167 98.7499 100H81.2499L70.3124 95.8125L68.2499 101.687L81.2499 106.25H125ZM99.9999 20.1875C104.417 15.0625 110.042 12.5 116.875 12.5C122.542 12.5 127.333 14.5833 131.25 18.75C135.167 22.9167 137.25 27.7083 137.5 33.125C137.5 37.4167 135.417 42.5417 131.25 48.5C127.083 54.4583 122.979 59.4375 118.937 63.4375C114.896 67.4375 108.583 73.375 99.9999 81.25C91.3332 733750-84-9582-67-43750-80-8749-63-43750-76-7916-59-43750-72-6874-54-45830-68-5624-48-50C64-4374-42-54170-62-4166-37-41670-62-4999-33-125C62-4999-27-45830-64-5207-22-66670-68-5624Z"
                            fill="#000"
                        ></path>
                    </svg>
                    <div className='video-container'>
                      <iframe
                          width='100%'
                          height='315'
                          src='https://www.youtube.com/embed/9hW0EfqQpm4?si=gtS9mWnqlFOyjuRD'
                          title='YouTube video player'
                          frameBorder='0'
                          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                          referrerPolicy='strict-origin-when-cross-origin'
                          allowFullScreen
                      ></iframe>
                  </div>  
                </div>
            </div>
        </div>
    );
}

export default CreateAccount;