import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import axios from '../axiosConfig';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get('/profile');
                setProfile(res.data);
            } catch (err) {
                console.error('Error fetching profile', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>User Profile</h1>
            {profile && (
                <div>
                    <p>Name: {profile.name}</p>
                    <p>Email: {profile.email}</p>
                    <h2>My Exercises</h2>
                    <ul>
                        {profile.completedExercises.map((exercise) => (
                            <li key={exercise._id}>{exercise.title}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Profile;
