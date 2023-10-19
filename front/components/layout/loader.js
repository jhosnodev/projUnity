import React from "react";
import style from "../../styles/Loader.module.css";
function Loader() {
  return (
    <div className="indigo-light  w-full h-screen flex justify-center items-center bg-primary text-background">
      <span className={`${style.loader}`}></span>
    </div>
  );
}

export default Loader;
