import React, { useState } from "react";
import CheckCircleIcon from "./CheckCircleIcon";
import DotIcon from "./DotIcon";
import axios from "axios";

const Collapsible = ({ task }) => {
  const [expanded, setExpanded] = useState(false);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <div className="row taskDiv">
        <div
          className="col-1"
          onClick={() => {
            axios
              .put(
                "http://localhost:3000/api/tasks/" + task._id,
                {
                  isCompleted: !isCompleted,
                },
                { headers: { "x-auth-token": localStorage.getItem("token") } }
              )
              .then((res) => {
                setIsCompleted(!isCompleted);
                window.location.reload();
              })
              .catch((err) => {
                alert(err.response.data);
              });
          }}
        >
          <CheckCircleIcon
            height="30"
            fill={isCompleted ? "rgb(169, 143, 117)" : "black"}
          />
        </div>
        <div className="col-9 taskTitle">{task.title}</div>
        <div className="col-1" onClick={handleClick}>
          <DotIcon height="30" />
        </div>
      </div>
      {expanded && (
        <div
          style={{
            width: "100%",
            backgroundColor: "#e5dad3",
            textAlign: "start",
            padding: "20px",
          }}
        >
          <span style={{ fontWeight: "bold" }}>Completed:</span>{" "}
          {task.isCompleted ? "Completed" : "Not Completed"}
          <br />
          <span style={{ fontWeight: "bold" }}>Created At:</span>{" "}
          {task.createdAt}
          <br />
          <div style={{ textAlign: "center" }}>
            <button
              className="btn delete-btn"
              onClick={() => {
                axios
                  .delete("http://localhost:3000/api/tasks/" + task._id, {
                    headers: { "x-auth-token": localStorage.getItem("token") },
                  })
                  .then((res) => {
                    console.log(res);
                    window.location.reload();
                  })
                  .catch((err) => {
                    alert(err.response.data);
                    console.log(err);
                  });
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collapsible;
