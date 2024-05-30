import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axiosConfig';

const ExerciseDetail = () => {
  const { id } = useParams();
  const [exercise, setExercise] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const res = await axios.get(`/exercises/${id}`);
        setExercise(res.data);
      } catch (err) {
        console.error('Error fetching exercise', err);
      }
    };

    fetchExercise();
  }, [id]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting answers:', { answers, token: localStorage.getItem('token') });
    try {
      const res = await axios.post(`/exercises/${id}/submit`, { answers });
      console.log('Submission response:', res.data);
      setResult(res.data);
    } catch (err) {
      console.error('Error submitting exercise:', err.response ? err.response.data : err);
    }
  };

  if (!exercise) return <div>Loading...</div>;

  return (
    <div>
      <h2>{exercise.title}</h2>
      <p>{exercise.description}</p>
      <p>Difficulty: {exercise.difficulty}</p>
      <p>Category: {exercise.category ? exercise.category.name : 'Unknown'}</p>
      <p>Created by: {exercise.createdBy ? exercise.createdBy.name : 'Unknown'}</p>

      {result ? (
        <div>
          <h3>Result</h3>
          <p>{result.message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {exercise.questions && exercise.questions.length > 0 ? (
            exercise.questions.map((question, index) => (
              <div key={question._id}>
                <p>
                  <strong>Question {index + 1}:</strong> {question.text}
                </p>
                {question.options.map((option) => (
                  <label key={option}>
                    <input
                      type="radio"
                      name={`question-${question._id}`}
                      value={option}
                      checked={answers[question._id] === option}
                      onChange={() => handleAnswerChange(question._id, option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            ))
          ) : (
            <p>No questions available for this exercise.</p>
          )}
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default ExerciseDetail;
