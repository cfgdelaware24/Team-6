import React from 'react';
import './both-information.css';

function InformationDashboard() {
    return (
        <div className="container" css={styles}>
            <h1>Information</h1>
            <div className="info-grid">
                <div className="box personal-info">
                    <h2>Personal Information</h2>
                    <p>Name: John Doe <span className="edit">Edit</span></p>
                    <p>Email: address@gmail.com</p>
                    <p>Phone Number: 000-000-0000</p>
                    <p>Address: 12345 Rock Street, MD, 20850</p>
                </div>
                <div className="box volunteer-info">
                    <h2>Volunteer Info</h2>
                    <p>Volunteer ID: 111-1111-1111</p>
                    <p>Last Event Attended: N/A</p>
                    <p>Upcoming Event: <a href="#" className="link">INSERT LINK TO EVENT DESCRIP</a></p>
                </div>
                <div className="box participant-info">
                    <h2>Participant Info</h2>
                    <p>EKG Report: <a href="#" className="link">file.pdf</a></p>
                    <p>Participant ID: 111-1111-1111</p>
                </div>
                <div className="box test-results">
                    <h2>Test Results</h2>
                    <div className="result-box">
                        <p className="status">Healthy</p>
                        <p className="note">If you would like a more accurate test, <a href="#" className="link">click here for another test</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InformationDashboard;