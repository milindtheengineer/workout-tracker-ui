import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "./axiosConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const responseMessage = async (req) => {
    try {
      const response = await axios.post(
        "https://workout-tracker-server.milindjuttiga.com/login",
        req,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log("good");
        navigate("/");
      } else {
        console.log("totally screwed 1");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        console.log("totally screwed 2");
      } else if (error.response) {
        console.log("totally screwed 3");
      } else if (error.request) {
        // The request was made but no response was received
        console.log("totally screwed 4");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("totally screwed 5", error);
      }
    }
  };
  const errorMessage = (error) => {
    return <div>Login failed</div>;
  };
  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    </div>
  );
};

export default Login;
