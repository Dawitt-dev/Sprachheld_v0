import React, { useState } from 'react';
import axios from '../axiosConfig';

const TrackExercise = ({ exerciseId }) => {
    const [status, setStatus] = useState('not-started');
    const [message, setMessage] = useState('');

    const updateProgress = async () => {
        try {
            await axios.post('/userExercises', {
                userId: 'your-user-id',  // Replace with actual user ID from your authentication context
                exerciseId,
                status,
            });
            setMessage('progress updated!');
        } catch (err) {
            setMessage('Failed to update progress');
            console.error('Error updating progress', err);
        }
    };

    return (
        <div>
            <h1>Track Exercise</h1>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="not-started">Not started</option>
                <option value="in-progress">In progress</option>
                <option value="completed">Completed</option>
            </select>
            <button onClick={updateProgress}>Update Progress</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default TrackExercise;

            