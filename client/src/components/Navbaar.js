import React from "react";
import mern from "../Images/mern.jpeg";

const Navbaar = () => {
  return (
    <header className="md-15">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand text-primary " href="http://localhost:3000/">
          MERN CRUD OPERATIONS
        </a>
        <div >
          <img src={mern} alt="mern stack image" height={80} />
        </div>
      </nav>
    </header>
  );
};

export default Navbaar;
