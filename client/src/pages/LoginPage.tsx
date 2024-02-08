import axios, { AxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      console.log(res);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        console.log("Your token", res.data.token);
        navigate("/home");
      }
    } catch (err: AxiosError) {
      console.log(err.response.data);
      setError(err.response.data);
    }
  };

  return (
    <div className="loginContainer">
      <div className="imageBackground" />
      <div className="formContainer">
        <h1 className="siteName">Site Name</h1>
        <h2 className="titlePageContext">Sign In</h2>
        <form onSubmit={handleSubmit} className="loginForm">
          {error && (
            <div className="errorContainer">
              <p>{error}</p>
            </div>
          )}
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
            Sign In
          </button>
        </form>

        <Link to="/register">
          <p className="loginRegisterLink">
            You don't have an account ? Click here !
          </p>
        </Link>
      </div>
    </div>
  );
};
