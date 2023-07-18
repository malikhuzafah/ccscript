import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="loginBackground">
      <div className="mainDiv">
        <h1 className="title">Page not found!</h1>
        <div className="bottom-text">
          <p>
            Go back to{" "}
            <Link className="bottom-text" to="/home">
              HomeScreen
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
