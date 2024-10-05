// src/EventsDashboard.js
import React from 'react';
import './events.css';

const EventsDashboard = () => {
    return (
        <div className="container">
            <h1>Upcoming Events</h1>
            <div className="calendar-container">
                <div className="calendar">
                    <div className="calendar-header">
                        <button>&lt; Prev</button>
                        <h2>October</h2>
                        <button>Next &gt;</button>
                    </div>
                    <table className="calendar-table">
                        <thead>
                            <tr>
                                <th>Sun</th>
                                <th>Mon</th>
                                <th>Tue</th>
                                <th>Wed</th>
                                <th>Thu</th>
                                <th>Fri</th>
                                <th>Sat</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>6</td>
                                <td>7</td>
                                <td>8</td>
                                <td>9</td>
                                <td>10</td>
                                <td className="event-days">11</td>
                            </tr>
                            <tr>
                                <td>12</td>
                                <td>13</td>
                                <td>14</td>
                                <td>15</td>
                                <td>16</td>
                                <td>17</td>
                                <td>18</td>
                            </tr>
                            <tr>
                                <td>19</td>
                                <td className="event-days">20</td>
                                <td>21</td>
                                <td>22</td>
                                <td>23</td>
                                <td>24</td>
                                <td>25</td>
                            </tr>
                            <tr>
                                <td>26</td>
                                <td>27</td>
                                <td>28</td>
                                <td>29</td>
                                <td>30</td>
                                <td>31</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="event-details">
                    <div className="event-card">
                        <h3>October 12th - Valley High Elementary</h3>
                        <p>Time: 10:00am</p>
                        <p>Slots open: 7 out of 20</p>
                        <div className="event-actions">
                            <button className="register-button">Register</button>
                            <button className="cancel-button">Cancel</button>
                        </div>
                    </div>
                    <div className="event-card">
                        <h3>October 15th - Riverdale Elementary</h3>
                        <p>Time: 11:00am</p>
                        <p>Slots open: 3 out of 20</p>
                    </div>
                    <div className="event-card">
                        <h3>October 20th - Lakeside Middle School</h3>
                        <p>Time: 12:00pm</p>
                        <p>Slots open: 11 out of 20</p>
                    </div>
                    <div className="event-card">
                        <h3>October 22nd - Parkside Elementary</h3>
                        <p>Time: 1:00pm</p>
                        <p>Slots open: 11 out of 20</p>
                    </div>
                    <div className="event-card">
                        <h3>October 27th - Sparkway Elementary</h3>
                        <p>Time: 1:00pm</p>
                        <p>Slots open: 11 out of 20</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventsDashboard;
