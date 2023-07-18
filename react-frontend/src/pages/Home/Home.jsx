import "./Home.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ListIcon from "./ListIcon";
import Collapsible from "../../components/Collapsible";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("all");
  const [completed, setCompleted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/tasks", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setTasks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="background"></div>
      <div className="logoutDiv">
        <button
          className="btn btn-lg my-btn2"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
      <div className="inner-div">
        <div className="profilePicture"></div>
        <div className="row addTask">
          <div className="col-9 inputDiv">
            <input
              type="text"
              className="form-control titleInput"
              value={title}
              placeholder="Add new Task"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="col btnContainer">
            <button
              className="btn addBtn col"
              onClick={async () => {
                axios
                  .post(
                    "http://localhost:3000/api/tasks",
                    { title: title },
                    {
                      headers: {
                        "x-auth-token": localStorage.getItem("token"),
                      },
                    }
                  )
                  .then((res) => {
                    setTitle("");
                    window.location.reload();
                    console.log(res.data);
                  })
                  .catch((err) => {
                    alert(err.response.data);
                    console.log(err);
                  });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
                style={{ fill: "#5e5250" }}
              >
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="row typeContainer">
          <div className="col-1">
            <ListIcon height="25" style={{ marginTop: "5px" }} />
          </div>
          <div
            className="col"
            style={{
              margin: 0,
              padding: 0,
              marginLeft: "5px",
              fontWeight: "bold",
            }}
          >
            <select
              name="type"
              className="form-select col-3"
              style={{
                border: "none",
                outline: "none",
                color: "white",
                margin: 0,
                backgroundColor: "transparent",
                fontWeight: "bold",
              }}
              onChange={(e) => {
                console.log(e.target.value);
                setType(e.target.value);
              }}
            >
              <option value="uncompleted">Your todos</option>
              <option value="completed">Completed</option>
              <option selected value="all">
                All
              </option>
            </select>
          </div>
        </div>

        <div className="tasksList">
          {tasks.length > 0 ? (
            type === "all" ? (
              tasks.map((task) => {
                return <Collapsible task={task} />;
              })
            ) : type === "completed" ? (
              tasks.map((task) => {
                return task.isCompleted ? <Collapsible task={task} /> : null;
              })
            ) : (
              tasks.map((task) => {
                return !task.isCompleted ? <Collapsible task={task} /> : null;
              })
            )
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              No task today
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
