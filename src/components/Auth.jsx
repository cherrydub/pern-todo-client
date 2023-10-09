import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const serverURL = import.meta.env.VITE_SERVERURL;

export default function Auth() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isLogIn, setIsLogIn] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  // console.log("cookies:", cookies);

  const viewLogin = (status) => {
    setError(null);
    setIsLogIn(status);
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogIn && password !== confirmPassword) {
      setError("Make sure passwords match");
      return;
    }

    const response = await axios.post(`${serverURL}/${endpoint}`, {
      email,
      password,
    });

    const data = response.data;

    if (data.detail) {
      setError(data.detail);
    } else {
      setCookie("Email", data.email);
      setCookie("AuthToken", data.token);

      window.location.reload();
    }

    console.log("password login data:", data);
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form action="">
          <h2>{isLogIn ? "Please login" : "Please sign up!"}</h2>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
          {!isLogIn && (
            <input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="confirm password"
            />
          )}
          <input
            onClick={(e) => handleSubmit(e, isLogIn ? "login" : "signup")}
            type="submit"
            className="create"
          />
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button
            style={{ backgroundColor: !isLogIn ? "white" : "gray" }}
            onClick={() => viewLogin(false)}
          >
            Sign Up
          </button>
          <button
            style={{ backgroundColor: isLogIn ? "white" : "gray" }}
            onClick={() => viewLogin(true)}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
