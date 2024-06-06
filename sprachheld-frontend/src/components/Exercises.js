import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axiosConfig';
import { AuthContext } from '../AuthContext';

const Exercises = () => {
    const [exercises, setExercises] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchExercises();
    }, []);

    const fetchExercises = async () => {
        try {
            const res = await axios.get('/exercises');
            setExercises(res.data);
        } catch (err) {
            console.error('Error fetching exercises', err);
        }
    };

    const getAccessibleExercises = () => {
        if (!user || !user.exercises) return exercises;
        const completedExercises = user.exercises.filter(ex => ex.status === 'completed').map(ex => ex.exerciseId);
        return exercises.filter(ex => completedExercises.includes(ex._id));
    };

    return (
        <div>
            <h2>Available Exercises</h2>
            <ul>
                {getAccessibleExercises().map((exercise) => (
                    <li key={exercise._id}>
                        <Link to={`/exercises/${exercise._id}`}>{exercise.title}</Link>
                        <p>{exercise.description}</p>
                        <p>Level: {exercise.difficulty}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Exercises;
