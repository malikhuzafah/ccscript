import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../components/Auth";
import axios from "axios";

const Login = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <Auth>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div style={{ width: "60%" }}>
          <div style={{ padding: 10 }}>
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
          <div style={{ padding: 10 }}>
            <input
              className="form-control"
              style={{ borderRadius: 25 }}
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div style={{ padding: 10, textAlign: "center" }}>
            <button
              className="btn my-btn"
              style={{ borderRadius: 25 }}
              onClick={(e) => {
                axios
                  .post("http://localhost:3000/api/users/login", {
                    email,
                    password,
                  })
                  .then((res) => {
                    console.log(res);
                    localStorage.setItem("token", res.data);
                    window.location = "/home";
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Register
            </button>
          </div>
          <div style={{ textAlign: "center" }}>
            <p>
              Already have an account? <Link to="/">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </Auth>
  );
};

export default Login;
