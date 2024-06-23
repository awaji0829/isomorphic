import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <header
        style={{
          position: "fixed",
          width: "100vw",
          top: 0,
          backgroundColor: "yellowgreen",
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/news">News</Link>
      </header>
      <div style={{ height: 60 }} />
    </>
  );
};
