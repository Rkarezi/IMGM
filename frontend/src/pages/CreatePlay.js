import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import THEME1 from "../resrc/imgs/THEME1.jpeg";
import THEME2 from "../resrc/imgs/THEME2.jpeg";
import THEME3 from "../resrc/imgs/THEME3.jpeg";
import THEME4 from "../resrc/imgs/THEME4.jpeg";
import THEME5 from "../resrc/imgs/THEME5.jpeg";
import THEME6 from "../resrc/imgs/THEME6.jpeg";
import THEME7 from "../resrc/imgs/THEME7.jpeg";
import THEME8 from "../resrc/imgs/THEME8.jpeg";

function CreatePlay() {
  const imgRef = useRef();
  const imgFile = [
    THEME1,
    THEME2,
    THEME3,
    THEME4,
    THEME5,
    THEME6,
    THEME7,
    THEME8,
  ];
  const [imgD, setImgD] = useState([]);
  const [counter, setCounter] = useState(0);
  const [toggle, isToggle] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(
    Math.floor(Math.random() * imgFile.length)
  );
  const [currentImageIndex1, setCurrentImageIndex1] = useState(
    Math.floor(Math.random() * imgFile.length)
  );
  const initialImage = () => {
    setCurrentImageIndex(currentImageIndex);
    setCurrentImageIndex1(currentImageIndex1);
  };

  const randomizeImage = () => {
    if (counter < 4 && !toggle) {
      setCurrentImageIndex(Math.floor(Math.random() * imgFile.length));
      setCurrentImageIndex1(Math.floor(Math.random() * imgFile.length));

      setImgD([...imgD, currentImageIndex1]);
    } else {
      isToggle(!toggle);
      imgRef.current.style.display = "none";

      fetch("http://localhost:8081/musicData", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imgD,
        }),
      });
    }
  };
  useEffect(() => {
    initialImage();
  }, []);
  const imgClick = () => {
    setCounter(counter + 1);
    randomizeImage();
  };
  const imgClick1 = () => {
    setCounter(counter + 1);
    randomizeImage();
  };

  if (currentImageIndex === currentImageIndex1) {
    setCurrentImageIndex(Math.floor(Math.random() * imgFile.length));
    setCurrentImageIndex1(Math.floor(Math.random() * imgFile.length));
  }

  return (
    <div className="container-fluid">
      <div className="main-cent">
        <div className="float-wrapper" ref={imgRef}>
          <div className="th-img">
            <img
              onClick={imgClick}
              on
              src={imgFile[currentImageIndex]}
              className="img-responsive chosen"
            ></img>
          </div>
          <div className="th-img">
            <img
              onClick={imgClick1}
              src={imgFile[currentImageIndex1]}
              className="img-responsive chosen"
            ></img>
          </div>
        </div>
        <div className="desc-container">
          {counter < 5 ? (
            <div className="desc-wrapper">
              <span className="desc">{counter}/5</span>
            </div>
          ) : (
            <div className="desc-wrapper button-container">
              <Link to="/recommendedPlaylist">
                <button className="create-button">Create</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreatePlay;
