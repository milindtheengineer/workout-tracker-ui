import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import Workout from "./Workout";
import "./workout.css";

const Session = () => {
  const { sessionId } = useParams();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const [data, setData] = useState(null);
  const [err, setError] = useState(null);
  const [workoutValue, setWorkoutValue] = useState("");
  console.log(userId);
  const handleInputChange = (event) => {
    setWorkoutValue(event.target.value);
  };

  const addWorkout = async (e, workoutName, sessionId, userId) => {
    console.log(e, workoutName, sessionId);
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://workout-tracker-server.13059596.xyz/workouts",
        {
          SessionID: parseInt(sessionId, 10),
          WorkoutName: workoutName,
          UserID: parseInt(userId, 10),
        }
      );
      console.log("yoyo", response.status);
      if (response.status === 200) {
        fetchData(sessionId);
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

  const fetchData = async (sessionId) => {
    try {
      const response = await axios.get(
        "https://workout-tracker-server.13059596.xyz/workouts/" + sessionId
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
    fetchData(sessionId);
  }, []);

  if (err) return <div>Error: {err}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="workout-list">
      <form onSubmit={(e) => addWorkout(e, workoutValue, sessionId, userId)}>
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
          userId={userId}
        />
      ))}
    </div>
  );
};

export default Session;
