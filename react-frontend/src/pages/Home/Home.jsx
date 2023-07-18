import "./Home.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CheckCircleIcon from "./CheckCircleIcon";
import ChevronIcon from "./ChevronIcon";
import DotIcon from "./DotIcon";
import ListIcon from "./ListIcon";
import PlusIcon from "./PlusIcon";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

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
    // axios.get("http://localhost:3000/api/tasks", {
    //   headers: {
    //     "x-auth-token": localStorage.getItem("token"),
    //   },
    // });
  }, []);

  return (
    <>
      <div className="background"></div>
      <div className="logoutDiv">
        <button
          className="btn btn-lg my-btn"
          style={{ zIndex: 1000 }}
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
      <div className="inner-div" style={{ zIndex: 1000 }}>
        <div className="profilePicture"></div>
        <div className="row addTask">
          <div className="col-9 inputDiv">
            <input
              type="text"
              className="form-control"
              value={title}
              placeholder="Add new Task"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="col">
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
                    console.log(res.data);
                  })
                  .catch((err) => {
                    alert(err.response.data);
                    console.log(err);
                  });
              }}
            >
              +{/* <PlusIcon /> */}
            </button>
          </div>
        </div>

        <div
          className="row"
          style={{
            backdropFilter: "blur(5px)",
            border: "1px solid black",
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: 5,
          }}
        >
          <div className="col-1">
            <ListIcon height="25" />
          </div>
          <div className="col" style={{ margin: 0, padding: 0 }}>
            <select
              name=""
              className="form-select col-3"
              style={{
                border: "none",
                outline: "none",
                color: "white",
                margin: 0,
                backgroundColor: "transparent",
              }}
            >
              <option value="">Your todos</option>
              <option value="">Completed</option>
              <option value="">Uncompleted</option>
            </select>
          </div>
          {/* <div className="col-1" style={{ width: 25, height: 25 }}>
            <ChevronIcon height="25px" />
          </div> */}
        </div>

        <div className="tasksList">
          {tasks.map((task) => {
            return <div>{task.title}</div>;
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
