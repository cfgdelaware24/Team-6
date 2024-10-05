import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './voluteer-info.css';

function InformationDashboard() {
    const [userInfo, setUserInfo] = useState(null);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (userId) {
            fetchUserDetails();
        }
    }, [userId]);

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`/api/auth/details/${userId}`);
            setUserInfo(response.data);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>Information</h1>
            <div className="info-grid">
                <div className="box personal-info">
                    <h2>Personal Information</h2>
                    <p>Name: {userInfo.name} <span className="edit">Edit</span></p>
                    <p>Email: {userInfo.email}</p>
                    <p>Phone Number: {userInfo.phone || 'Not provided'}</p>
                </div>
                <div className="box volunteer-info">
                    <h2>Volunteer Info</h2>
                    <p>Volunteer ID: {userInfo.Volunteer?.volunteer_id || 'Not assigned'}</p>
                </div>
            </div>
        </div>
    );
}

export default InformationDashboard;