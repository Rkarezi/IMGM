import React from "react";
import SpinnerNote from "../resrc/imgs/NOTE1-removebg-preview.png";

function Loading() {
  return (
    <div className="vh-100 loader">
      <div className="loading">
        <div className="spinner_container">
          <img src={SpinnerNote} className="loading_spinner"></img>
        </div>
      </div>
    </div>
  );
}

export default Loading;
