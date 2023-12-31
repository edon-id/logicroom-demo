import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="start-app">
      <div className="start-app-container">
        <Link className="button-animation" href={"/login"}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Start app
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
