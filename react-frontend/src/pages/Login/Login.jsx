import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import Auth from "../../components/Auth";
import axios from "axios";

const Login = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <Auth>
      <div className="loginBackground">
        <div className="mainDiv">
          <h1 className="title">Login</h1>
          <div className="inputItem">
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="inputItem">
            <input
              className="form-control"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="btn-container">
            <button
              className="btn btn-lg my-btn"
              onClick={(e) => {
                axios
                  .post("https://nice-gear-worm.cyclic.app/api/users/login", {
                    email,
                    password,
                  })
                  .then((res) => {
                    console.log(res);
                    localStorage.setItem("token", res.data);
                    window.location = "/";
                  })
                  .catch((err) => {
                    alert(err.response.data);
                    console.log(err);
                  });
              }}
            >
              Login
            </button>
          </div>
          <div className="bottom-text">
            <p>
              Already have an account?{" "}
              <Link className="bottom-text" to="/register">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Auth>
  );
};

export default Login;
