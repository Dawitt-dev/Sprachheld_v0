import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axiosConfig';

const ExerciseDetail = () => {
    const { id } = useParams();
    const [exercise, setExercise] = useState(null);
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});
    const [allcorrect, setAllcorrect] = useState(false);

    const fetchExercise = async () => {
        try {
            const res = await axios.get(`/exercises/${id}`);
            setExercise(res.data);
        } catch (err) {
            console.error('Error fetching exercise', err);
        }
    };

    const handleAnswerChange = (questionId, answer) => {
        setAnswers({
            ...answers,
            [questionId]: answer,
        });
    };

    const handleSave = async () => {
        try {
            const userId = localStorage.getItem('userId'); // Assume userId is stored in localStorage
            await axios.post('/userExercises', {
                userId,
                exerciseId: id,
                answers,
                status: 'in-progress',
            });
            alert('Answers saved successfully!');
        } catch (err) {
            console.error('Error saving answers', err);
            alert('Failed to save answers.');
        }
    };

    const handleSubmit = async () => {
        let newFeedback = {};
        let allAnswerscorrect = true;

        exercise.questions.forEach((question) => {
            const isCorrect = answers[question._id] === question.correctOption;
            newFeedback[question._id] = isCorrect ? 'correct' : 'incorrect';
            if (!isCorrect) {
                allAnswerscorrect = false;
            }
        });
        setFeedback(newFeedback);
        setAllcorrect(allAnswerscorrect);

        try {
            const userId = localStorage.getItem('userId'); // Assume userId is stored in localStorage
            await axios.post('/userExercises', {
                userId,
                exerciseId: id,
                answers,
                status: allAnswerscorrect ? 'completed' : 'in-progress',
            });
            alert('Answers submitted successfully!');
        } catch (err) {
            console.error('Error submitting answers', err);
            alert('Failed to submit answers.');
        }
    };

    useEffect(() => {
        fetchExercise();
    }, [id]);

    return (
        <div className="exercise-container">
            <div className="exercise-content">
                {exercise && (
                    <div>
                        <h2>{exercise.title}</h2>
                        <p>{exercise.description}</p>
                        {exercise.questions.map((question) => (
                            <div key={question._id}>
                                <p>{question.text}</p>
                                {question.options.map((option) => (
                                    <div key={option}>
                                        <input
                                            type="radio"
                                            name={question._id}
                                            value={option}
                                            checked={answers[question._id] === option}
                                            onChange={() => handleAnswerChange(question._id, option)}
                                        />
                                        {option}
                                    </div>
                                ))}
                                {feedback[question._id] !== undefined && (
                                    <p>
                                        {feedback[question._id] ? 'Correct!' : 'Try again.'}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="exercise-buttons">
                <button onClick={handleSave}>Save</button>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default ExerciseDetail;
