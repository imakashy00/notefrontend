import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as AddIcon } from "../assets/add.svg";

const Addbutton = () => {
  return (
    <Link to="/note/new" className="floating-button">
      <AddIcon />
    </Link>
  );
};

export default Addbutton;
