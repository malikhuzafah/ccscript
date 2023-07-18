import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  return (
    <div className="logoutDiv">
      <button
        className="btn btn-lg my-btn2"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
