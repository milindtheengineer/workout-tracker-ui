import Set from "./Set";
import axios from "axios";
import React, { useState } from "react";

const Workout = (props) => {
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);
  const [err, setError] = useState(null);
  const [data, setData] = useState(props.sets);

  const workoutName = props.workoutName;
  const numberOfSets = props.numberOfSets;
  const workoutId = props.workoutId;

  const fetchData = async (wktID) => {
    try {
      const response = await axios.get(
        "https://workout-tracker.13059596.xyz/sets/" + wktID
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

  const addSet = async (e, weight, reps, workoutId) => {
    console.log(e, weight, reps, workoutId);
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://workout-tracker.13059596.xyz/sets",
        {
          WorkoutID: workoutId,
          NumberOfReps: parseInt(reps, 10),
          Weight: parseFloat(weight),
        }
      );
      console.log("yoyo", response.status);
      if (response.status === 200) {
        console.log("Successful");
        fetchData(workoutId);
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

  if (err) return <div>Error: {err}</div>;

  return (
    <div className="workout-tab">
      <h2>Workout name {workoutName}</h2>
      <p>Number of Sets {numberOfSets}</p>
      <div className="set-list">
        {data.map((set) => (
          <Set className="setView" key={set.Id} set={set} />
        ))}
      </div>
      <form onSubmit={(e) => addSet(e, weight, reps, workoutId)}>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter weight"
          // style={{ marginRight: '10px' }} // Optional: Add some styling
        />
        <input
          type="number"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          placeholder="Enter reps"
          // style={{ marginRight: '10px' }} // Optional: Add some styling
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Workout;
