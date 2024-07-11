import React, { useState, useEffect } from "react";
import axios from "axios";
import Workout from "./Workout";

const Session = () => {
  const [data, setData] = useState(null);
  const [err, setError] = useState(null);
  const [workoutValue, setWorkoutValue] = useState("");

  const handleInputChange = (event) => {
    setWorkoutValue(event.target.value);
  };

  const addWorkout = async (e, workoutName) => {
    console.log(e, workoutName);
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://workout-tracker.13059596.xyz/workouts",
        {
          SessionId: 1,
          WorkoutName: workoutName,
        }
      );
      console.log("yoyo", response.status);
      if (response.status === 200) {
        setData(response.data);
      } else {
        setError(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(
          `Error ${error.response.status}: ${
            error.response.data.message || "Unknown error"
          }`
        );
      } else if (error.request) {
        // The request was made but no response was received
        setError("No response received from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError(`Error: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://workout-tracker.13059596.xyz/workouts/1"
        );
        console.log("yoyo", response.status);
        if (response.status === 200) {
          setData(response.data);
        } else {
          setError(`Unexpected status code: ${response.status}`);
        }
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setError(
            `Error ${error.response.status}: ${
              error.response.data.message || "Unknown error"
            }`
          );
        } else if (error.request) {
          // The request was made but no response was received
          setError("No response received from server");
        } else {
          // Something happened in setting up the request that triggered an Error
          setError(`Error: ${error.message}`);
        }
      }
    };
    fetchData();
  }, []);

  if (err) return <div>Error: {err}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="workout-list">
      <form onSubmit={(e) => addWorkout(e, workoutValue)}>
        <input
          type="text"
          value={workoutValue}
          onChange={handleInputChange}
          placeholder="Enter workout"
          // style={{ marginRight: '10px' }} // Optional: Add some styling
        />
        <button type="submit">Submit</button>
      </form>
      {data.map((workout) => (
        <Workout
          key={workout.Id}
          workoutId={workout.Id}
          workoutName={workout.WorkoutName}
          numberOfSets={workout.Sets.length}
          sets={workout.Sets}
        />
      ))}
    </div>
  );
};

export default Session;
