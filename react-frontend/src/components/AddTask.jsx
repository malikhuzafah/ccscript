import React, { useState } from "react";
import axios from "axios";

const AddTask = () => {
  const [title, setTitle] = useState("");

  const handleAdd = async () => {
    axios
      .post(
        "https://nice-gear-worm.cyclic.app/api/tasks",
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
  };

  return (
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
        <button className="btn addBtn col" onClick={handleAdd}>
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
  );
};

export default AddTask;
