import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import { AuthContext } from '../AuthContext';

const ExerciseDetail = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [exercise, setExercise] = useState({});
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchExercise = async () => {
            try {
                const res = await axios.get(`/exercises/${id}`);
                setExercise(res.data);
                const savedAnswers = await fetchSavedAnswers(id);
                setAnswers(savedAnswers);
            } catch (err) {
                console.error('Error fetching exercise', err);
            }
        };
        fetchExercise();
    }, [id, user, navigate]);

    const fetchSavedAnswers = async (exerciseId) => {
        try {
            const res = await axios.get(`/userExercises/${exerciseId}`);
            if (res.data && res.data.answers) {
                return res.data.answers;
            }
        } catch (err) {
            console.error('Error fetching saved answers', err);
        }
        return {};
    };

    const handleChange = (questionId, value) => {
        setAnswers(prevAnswers => {
            const newAnswers = { ...prevAnswers, [questionId]: value };
            saveProgress(newAnswers);
            return newAnswers;
        });
    };

    const saveProgress = async (newAnswers) => {
        try {
            await axios.post(`/userExercises/${id}/save`, {
                userId: user._id,
                exerciseId: id,
                answers: newAnswers,
            });
        } catch (err) {
            console.error('Error saving progress', err);
        }
    };

    const handleSubmit = async () => {
        let allCorrect = true;
        const newFeedback = {};

        exercise.questions.forEach((question) => {
            if (answers[question._id] === question.correctOption) {
                newFeedback[question._id] = 'Correct';
            } else {
                newFeedback[question._id] = 'Try again';
                allCorrect = false;
            }
        });

        setFeedback(newFeedback);

        if (allCorrect) {
            setMessage('Exercise completed successfully');
            await updateExerciseStatus('completed');
        } else {
            setMessage('Exercise in progress. Please correct the wrong answers.');
            await updateExerciseStatus('in-progress');
        }
    };

    const updateExerciseStatus = async (status) => {
        try {
            await axios.post(`/exercises/${id}/submit`, {
                userId: user._id,
                exerciseId: id,
                status,
            });
        } catch (err) {
            console.error('Error updating exercise status', err);
        }
    };

    return (
        <div>
            <h2>{exercise.title}</h2>
            <p>{exercise.description}</p>
            {exercise.questions && exercise.questions.map((question) => (
                <div key={question._id}>
                    <p>{question.text}</p>
                    {question.options.map((option, index) => (
                        <div key={index}>
                            <input
                                type="radio"
                                name={question._id}
                                value={option}
                                checked={answers[question._id] === option}
                                onChange={(e) => handleChange(question._id, e.target.value)}
                            />
                            {option}
                        </div>
                    ))}
                    {feedback[question._id] && <p>{feedback[question._id]}</p>}
                </div>
            ))}
            <button onClick={handleSubmit}>Submit</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ExerciseDetail;
