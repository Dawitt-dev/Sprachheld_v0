// frontend/src/App.js
import React from 'react';
import UserExercises from './components/UserExercises';
import TrackExercise from './components/TrackExercise';



const App = () => {
  return (
    <div>
      <UserExercises />
      <TrackExercise exerciseId="664df8285b580fb81963d8f4" />
    </div>
  );
};

export default App;