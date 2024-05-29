import React, { useEffect, useState} from 'react';
import axios from '../axiosConfig';

const UserExercises = () => {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const res = await axios.get('/userExercises:userId');
                setExercises(res.data);
            }   catch (err) {
                console.error('Error fetching exercises', err);
            }
        };

        fetchExercises();
    }, []);

    return (
        <div>
            <h2>User Exercises</h2>
            <ul>
                {exercises.map((exercise) => (
                    <li key={exercise._id}>{exercise.exerciseId ? exercise.exerciseId.title : 'N/A'} - {exercise.status}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserExercises;