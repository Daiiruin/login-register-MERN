import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

export const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/register", { name, email, password })
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setError(err.response.data.message);
      });
  };

  return (
    <div className="loginContainer">
      <div className="imageBackground" />
      <div className="formContainer">
        <h1 className="siteName">Site Name</h1>
        <h2 className="titlePageContext">Sign Up</h2>
        <form onSubmit={handleSubmit} className="loginForm">
          {error && (
            <div className="errorContainer">
              <p>{error}</p>
            </div>
          )}
          <label htmlFor="username">
            Username:
            <input
              type="text"
              placeholder="Enter your name..."
              id="username"
              name="username"
              className="loginRegisterInput"
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label htmlFor="email">
            Email:
            <input
              placeholder="Enter your email..."
              type="email"
              id="email"
              name="email"
              className="loginRegisterInput"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            Password:
            <input
              placeholder="Enter your password..."
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              className="loginRegisterInput"
            />
          </label>

          <button type="submit" className="buttonLoginRegister">
            Sign Up
          </button>
        </form>

        <Link to="/login">
          <p className="loginRegisterLink">
            You already have an account ? Click here !
          </p>
        </Link>
      </div>
    </div>
  );
};
