import "./Home.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import New from "../../components/New";
import TasksList from "../../components/TasksList";
import TaskType from "../../components/TaskType";
import LogoutButton from "../../components/LogoutButton";
import AddTask from "../../components/AddTask";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [type, setType] = useState("all");

  const getTasks = () => {
    axios
      .get("https://nice-gear-worm.cyclic.app/api/tasks", {
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
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <New>
      <div className="background"></div>
      <LogoutButton />
      <div className="inner-div">
        <div className="profilePicture"></div>
        <AddTask />
        <TaskType setType={setType} />
        <TasksList tasks={tasks} type={type} />
      </div>
    </New>
  );
};

export default Home;
