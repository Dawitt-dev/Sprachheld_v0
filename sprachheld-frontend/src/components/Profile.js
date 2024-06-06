import React, { useContext, useEffect, useState, useCallback } from 'react';
import { AuthContext } from '../AuthContext';
import axios from '../axiosConfig';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [userExercises, setUserExercises] = useState([]);

    const fetchUserExercises = useCallback(async () => {
        try {
            const userId = user?._id || localStorage.getItem('userId');
            if (!userId) {
                console.error('User ID is undefined');
                return;
            }
            const res = await axios.get(`/userExercises?userId=${userId}`);
            setUserExercises(res.data);
        } catch (err) {
            console.error('Error fetching user exercises', err);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchUserExercises();
        }
    }, [user, fetchUserExercises]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            <div>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <h3>My Exercises</h3>
                <ul>
                    {userExercises.map((exercise) => (
                        <li key={exercise._id}>
                            {exercise.exerciseId?.title || 'Title not found'} - {exercise.status}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Profile;
