import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { Link } from 'react-router-dom';

const Exercises = () => {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const res = await axios.get('/exercises');
                setExercises(res.data);
            } catch (err) {
                console.error('Error fetching exercises', err);
            }
        };

        fetchExercises();
    }, []);

    return (
        <div>
          <h2>Exercises</h2>
          <ul>
            {exercises.map((exercise) => (
              <li key={exercise._id}>
                <Link to={`/exercises/${exercise._id}`}>
                  <strong>{exercise.title}</strong>
                </Link>
                <p>{exercise.description}</p>
                <p>Difficulty: {exercise.difficulty}</p>
                <p>Category: {exercise.category ? exercise.category.name : 'Unknown'}</p>
                <p>Created by: {exercise.createdBy ? exercise.createdBy.name : 'Unknown'}</p>
              </li>
            ))}
          </ul>
        </div>
      );
    };
    
    export default Exercises;