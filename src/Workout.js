import Set from "./Set";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Workout = (props) => {
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);
  const [numberOfSets, setNumberOfSets] = useState(props.numberOfSets);
  const [err, setError] = useState(null);
  const [data, setData] = useState(props.sets);
  const [lastSessionData, setLastSessionData] = useState([]);

  const workoutName = props.workoutName;
  const workoutId = props.workoutId;
  const userId = props.userId;

  const fetchData = async (wktID) => {
    try {
      const response = await axios.get("http://localhost:8080/sets/" + wktID);
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
    getLastWorkoutId(userId, workoutName);
  }, [userId, workoutName]);

  const getLastWorkoutId = async (userId, workoutName) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/lastworkout/" + userId + "/" + workoutName
      );
      console.log("yoyo", response.status);
      if (response.status === 200) {
        setLastSessionData(response.data);
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
      const response = await axios.post("http://localhost:8080/sets", {
        WorkoutID: workoutId,
        NumberOfReps: parseInt(reps, 10),
        Weight: parseFloat(weight),
      });
      console.log("yoyo", response.status);
      if (response.status === 200) {
        console.log("Successful");
        fetchData(workoutId);
        setNumberOfSets(data.length);
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
      <table className="set-list">
        <tr>
          <th>Weight</th>
          <th>Number of Reps</th>
        </tr>
        {data.map((set) => (
          <tr key={set.Id}>
            <td>{set.Weight}</td>
            <td>{set.NumberOfReps}</td>
          </tr>
        ))}
      </table>
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
      {lastSessionData != null ? (
        <div className="last-session">
          <h2>Last session</h2>
          <p>Number of Sets {lastSessionData.length}</p>
          <div className="set-list">
            {lastSessionData.map((set) => (
              <Set className="setView" key={set.Id} set={set} />
            ))}
          </div>
        </div>
      ) : (
        <p>No last session</p>
      )}
    </div>
  );
};

export default Workout;
