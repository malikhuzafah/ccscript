import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const New = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  return <>{props.children}</>;
};

export default New;
