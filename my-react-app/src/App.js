import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Registration from './Registration';
import HealthQuiz from './firstQuiz';
import EventsDashboard from './events-dashboard/eventsdash';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Registration />} />
            <Route path="/firstquiz" element={<HealthQuiz />} />
            <Route path="/events-dashboard" element={<EventsDashboard />} />
        </Routes>
    );
}

export default App;
