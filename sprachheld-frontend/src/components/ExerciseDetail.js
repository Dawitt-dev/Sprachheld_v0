import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axiosConfig';
import { AuthContext } from '../AuthContext';

const ExerciseDetail = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [exercise, setExercise] = useState(null);
    const [answers, setAnswers] = useState({});
    const [message, setMessage] = useState('');

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

    const handleChange = (e, questionId) => {
        setAnswers({ ...answers, [questionId]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting answers:', answers); // Debugging
        try {
            const res = await axios.post(`/exercises/${id}/submit`, { answers });
            setMessage(res.data.message);
        } catch (err) {
            console.error('Error submitting exercise', err);
            setMessage('Failed to submit exercise.');
        }
    };

    if (!exercise) return <div>Loading...</div>;

    return (
        <div>
            <h1>{exercise.title}</h1>
            <p>{exercise.description}</p>
            <p>Difficulty: {exercise.difficulty}</p>
            <p>Category: {exercise.category ? exercise.category.name : 'Unknown'}</p>
            <p>Created by: {exercise.createdBy ? exercise.createdBy.name : 'Unknown'}</p>
            <form onSubmit={handleSubmit}>
                {exercise.questions && exercise.questions.map((question, index) => (
                    <div key={question._id}>
                        <p>Question {index + 1}: {question.text}</p>
                        {question.options.map((option) => (
                            <div key={option}>
                                <label>
                                    <input
                                        type="radio"
                                        name={question._id}
                                        value={option}
                                        onChange={(e) => handleChange(e, question._id)}
                                    />
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ExerciseDetail;
