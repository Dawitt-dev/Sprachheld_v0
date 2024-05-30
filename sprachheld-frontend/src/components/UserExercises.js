import React, { useEffect, useState, useContext } from 'react';
import axios from '../axiosConfig';
import { AuthContext } from '../AuthContext';

const UserExercises = () => {
    const { user } = useContext(AuthContext);
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const res = await axios.get('/userExercises', {
                    params: {
                        userId: user._id,
                    },
                });
                setExercises(res.data);
            }   catch (err) {
                console.error('Error fetching exercises', err);
            }
        };

        if (user) {
            fetchExercises();
        }
    }, [user]);

    return (
        <div>
            <h2>My Exercises</h2>
            <ul>
                {exercises.map((exercise) => (
                    <li key={exercise._id}>{exercise.exerciseId ? exercise.exerciseId.title : 'N/A'} - {exercise.status}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserExercises;