import React, { useEffect, useState, useContext } from 'react';
import axios from '../axiosConfig';
import { AuthContext } from '../AuthContext';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        const fetchUserExercises = async () => {
            if (!user) return; // Ensure the user is logged in

            try {
                const res = await axios.get('/userExercises');
                setExercises(res.data.filter(exercise => exercise.userId === user.id));
            } catch (err) {
                console.error('Error fetching user exercises', err);
            }
        };

        fetchUserExercises();
    }, [user]);

    return (
        <div>
            <h2>User Profile</h2>
            {user && (
                <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            )}
            <h3>My Exercises</h3>
            <ul>
                {exercises.map((exercise) => (
                    <li key={exercise._id}>
                        {exercise.exerciseId.title} - {exercise.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Profile;
