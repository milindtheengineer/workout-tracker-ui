import React, { useState, useEffect } from "react";
import axios from "./axiosConfig";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState(null);
  const [err, setError] = useState(null);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    const options = { hour: "numeric", hour12: true };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  const addSession = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://workout-tracker-server.13059596.xyz/sessions",
        {
          UserID: 1,
        }
      );
      if (response.status === 200) {
        fetchData();
      } else if (response.status === 401) {
        setError(
          `You don't seem to be authenticated. Please use the login link about to login to your account`
        );
      } else {
        setError(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status && error.response.status === "401") {
          setError(
            `You don't seem to be authenticated. Please use the login link about to login to your account`
          );
          return;
        }
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
      const response = await axios.get(
        "https://workout-tracker-server.13059596.xyz/sessions/1"
      );
      console.log("yay", response);
      if (response.status === 200) {
        setData(response.data);
      } else {
        setError(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      if (error.response) {
        console.log("error", error.response);
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status && error.response.status === 401) {
          setError(
            `You don't seem to be authenticated. Please use the login link above to login to your account`
          );
          return;
        }
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
  if (err) return <div>{err}</div>;
  return (
    <div className="home">
      <button className="add-session" onClick={(e) => addSession(e)}>
        New Workout Session
      </button>
      {data != null ? (
        data.map((session) => (
          <Link
            className="session-item"
            key={session.Id}
            to={`/session/${session.Id}?userId=1`}
          >
            <h2>{formatDate(session.DateTime)}</h2>
            <h2>{formatTime(session.DateTime)}</h2>
          </Link>
        ))
      ) : (
        <h2></h2>
      )}
    </div>
  );
};

export default Home;
