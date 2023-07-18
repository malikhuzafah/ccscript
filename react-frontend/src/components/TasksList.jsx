import React from "react";
import Collapsible from "./Collapsible";

const TasksList = ({ tasks, type }) => {
  return (
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
        <div className="emptyTasks">No task today</div>
      )}
    </div>
  );
};

export default TasksList;
