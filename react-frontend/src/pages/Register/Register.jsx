import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import Auth from "../../components/Auth";
import axios from "axios";

const Register = (props) => {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <Auth>
      <div className="registerBackground">
        <div className="mainDiv">
          <h1 className="title">Register</h1>
          <div className="inputItem">
            <input
              className="form-control"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
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
                  .post("http://localhost:3000/api/users/register", {
                    email,
                    name,
                    password,
                  })
                  .then((res) => {
                    console.log(res);
                    localStorage.setItem("token", res.data);
                    window.location = "/home";
                  })
                  .catch((err) => {
                    alert(err.response.data);
                    console.log(err);
                  });
              }}
            >
              Register
            </button>
          </div>
          <div className="bottom-text">
            <p>
              Already have an account?{" "}
              <Link className="bottom-text" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Auth>
  );
};

export default Register;
