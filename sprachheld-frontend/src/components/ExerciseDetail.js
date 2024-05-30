import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axiosConfig';
import { AuthContext } from '../AuthContext';

const ExerciseDetail = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [exercise, setExercise] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [status, setStatus] = useState('not-started'); // Default status

    useEffect(() => {
        const fetchExercise = async () => {
            try {
                const res = await axios.get(`/exercises/${id}`);
                setExercise(res.data);
            } catch (err) {
                console.error('Error fetching exercise', err);
            }
        };

        fetchExercise();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/exercises/${id}/submit`, {
                userId: user._id,
                exerciseId: id,
                status: 'completed'
            });
            setStatus('completed'); // Update status
            alert('Exercise submitted successfully!');
        } catch (err) {
            console.error('Error submitting exercise', err);
            alert('Error submitting exercise');
        }
    };

    if (!exercise) return <div>Loading...</div>;

    return (
        <div>
            <h1>{exercise.title}</h1>
            <p>{exercise.description}</p>
            <p>Difficulty: {exercise.difficulty}</p>
            <p>Category: {exercise.category?.name || 'Unknown'}</p>
            <p>Created by: {exercise.createdBy?.name || 'Unknown'}</p>
            <form onSubmit={handleSubmit}>
                {exercise.questions && exercise.questions.map((question, index) => (
                    <div key={index}>
                        <p>{`Question ${index + 1}: ${question.text}`}</p>
                        {question.options.map((option, idx) => (
                            <label key={idx}>
                                <input
                                    type="radio"
                                    name={`question-${index}`}
                                    value={option}
                                    onChange={() => setSelectedOption(option)}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
            <p>Status: {status}</p> {/* Display exercise status */}
        </div>
    );
};

export default ExerciseDetail;
