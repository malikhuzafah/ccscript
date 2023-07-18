import React from "react";
import ListIcon from "./ListIcon";

const TaskType = ({ setType }) => {
  return (
    <div className="row typeContainer">
      <div className="col-1">
        <ListIcon height="25" style={{ marginTop: "5px" }} />
      </div>
      <div className="col selectorContainer">
        <select
          name="type"
          className="form-select col-3 typeSelector"
          onChange={(e) => {
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
  );
};

export default TaskType;
