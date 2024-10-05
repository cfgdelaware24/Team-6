import React from 'react';
import './volunteer-info.css';
import axios from 'axios';

const userId = localStorage.getItem('userId')

function InformationDashboard() {
    return (
        <div className="container">
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
                    <p>Volunteer ID: {userId}</p>
                    <p>Last Event Attended: N/A</p>
                    <p>Upcoming Event: <a href="#" className="link">Insert to Link Description</a></p>
                </div>
            </div>
        </div>
    );
}

export default InformationDashboard;