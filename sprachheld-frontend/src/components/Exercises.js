import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { Link } from 'react-router-dom';

const Exercises = () => {
    const [exercises, setExercises] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const res = await axios.get('/exercises');
                setExercises(res.data);
            } catch (err) {
                console.error('Error fetching exercises', err);
            }
        };

        const fetchCategories = async () => {
            try {
                const res = await axios.get('/categories');
                setCategories(res.data);
            } catch (err) {
                console.error('Error fetching categories', err);
            }
        };

        fetchCategories();
        fetchExercises();
    }, []);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const filteredExercises = exercises.filter(exercise => 
      !selectedCategory || exercise.category?.name === selectedCategory
    );

    return (
      <div>
          <h1>Exercises</h1>
          <label htmlFor="category">Filter by Category: </label>
          <select id="category" onChange={handleCategoryChange}>
              <option value="">All</option>
              {categories.map(category => (
                  <option key={category._id} value={category.name}>
                      {category.name}
                  </option>
              ))}
          </select>
          <ul>
              {filteredExercises.map((exercise) => (
                  <li key={exercise._id}>
                      <Link to={`/exercises/${exercise._id}`}>
                          {exercise.title}
                      </Link>
                  </li>
              ))}
          </ul>
      </div>
  );
};

export default Exercises;