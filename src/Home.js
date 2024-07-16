import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState(null);
  const [err, setError] = useState(null);

  const addSession = async (e) => {
    console.log(e);
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/sessions", {
        UserID: 1,
      });
      console.log("yoyo", response.status);
      if (response.status === 200) {
        console.log("Successful");
        fetchData();
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
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/sessions/1");
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
    fetchData();
  }, []);

  if (err) return <div>Error: {err}</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <div className="home">
      <button className="add-session" onClick={(e) => addSession(e)}>
        Add Session
      </button>
      {data.map((session) => (
        <div className="session-item" key={session.Id}>
          <Link to={`/session/${session.Id}?userId=1`}>
            <h2>{session.DateTime}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
