import React, { useEffect, useState } from "react";
import PLAYLISTIMG from "../resrc/imgs/playlist4-removebg-preview1.png";
import axios from "axios";
import { Link } from "react-router-dom";
import PlaylistAdd from "@mui/icons-material/PlaylistAdd";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Loading2 from "../components/Loading";

import TrackInfo from "../components/TrackInfo";
import PlaylistInfo from "../components/PlaylistInfo";
function Recommendations() {
  const [tracks, setTracks] = useState([]);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);

    const getSongData = async () => {
      const tracks = await axios.get("http://localhost:8081/recommend");

      if (tracks.data.status == 400) {
        setVisibility(false);
        setTracks("");
      } else {
        setVisibility(true);
        setTracks(tracks.data);
      }
    };
    getSongData();
  }, []);

  const editClick = () => {
    setToggleEdit((current) => !current);
  };

  return (
    <div className="rec">
      {loading ? (
        <Loading2 />
      ) : (
        <div className="d-flex vh-100">
          <div className="d-flex vw-100 justify-content-center align-items-center">
            <div className="playcard">
              <div className="img-wrap container">
                <Link to="/create" className="backIcon">
                  <ArrowBackIosNewIcon className="mt-3"></ArrowBackIosNewIcon>
                </Link>
                <div className="d-flex justify-content-center align-items-center">
                  <img src={PLAYLISTIMG} className="playlist-img"></img>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <PlaylistAdd
                    onClick={editClick}
                    fontSize="xx-large"
                    style={{ display: visibility ? "block" : "none" }}
                    className="eventIcon"
                  ></PlaylistAdd>
                </div>
                <div className="row title-header">
                  <h7 className="col-4">Artist</h7>
                  <h7 className="col-4">Song</h7>
                  <h7 className="col-4">Album</h7>
                </div>
              </div>
              <div className="container main-contain">
                <div className="d-flex justify-content-center align-items-center">
                  {toggleEdit ? (
                    <PlaylistInfo
                      onClick={editClick}
                      icon={"Add"}
                    ></PlaylistInfo>
                  ) : (
                    ""
                  )}
                </div>

                {tracks.length == 0 ? (
                  <div className="d-flex justify-content-center align-items-center w-100 h-50">
                    <h3 className="d-flex justify-content-center align-items-center position-fixed">
                      No Playlist created
                    </h3>
                  </div>
                ) : (
                  <div>
                    {tracks.map((item) => (
                      <TrackInfo trackItem={item}></TrackInfo>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Recommendations;
