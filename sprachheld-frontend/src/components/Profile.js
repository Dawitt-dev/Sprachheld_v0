import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import axios from '../axiosConfig';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [userExercises, setUserExercises] = useState([]);

    useEffect(() => {
        if (user) {
            fetchUserExercises();
        }
    }, [user]);

    const fetchUserExercises = async () => {
        try {
            const res = await axios.get(`/userExercises?userId=${user._id}`);
            setUserExercises(res.data);
        } catch (err) {
            console.error('Error fetching user exercises', err);
        }
    };

    return (
        <div>
            <h2>User Profile</h2>
            {user && (
                <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <h3>My Exercises</h3>
                    <ul>
                        {userExercises.map((exercise) => (
                            <li key={exercise._id}>
                                {exercise.exerciseId.title} - {exercise.status}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Profile;
