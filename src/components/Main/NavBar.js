import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar">
      <h1>T M D B</h1>
      <Link className="link" to="/">
        Home
      </Link>
      <Link className="link" to="/about">
        About
      </Link>
    </nav>
  );
};

export default NavBar;
