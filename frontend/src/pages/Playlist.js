import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import PLAYLISTIMG from "../resrc/imgs/playlist4-removebg-preview1.png";
import PlaylistInfo from "../components/PlaylistInfo";
import PlaylistCard from "../components/PlaylistCard";
import TrackInfo from "../components/TrackInfo";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import Loading from "../components/Loading";

function playlist() {
  const overflowRef = useRef();
  const [toggleEdit, setToggleEdit] = useState(true);
  const [itemIndex, setItemIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [remountComponent, setRemountComponent] = useState(0);

  const editClick = () => {
    setToggleEdit((current) => !current);

    if (!toggleEdit) {
      overflowRef.current.style.overflow = "hidden";
    } else {
      overflowRef.current.style.overflow = "scroll";
    }
  };
  const getPlaylist = async () => {
    const items = await axios.get("http://localhost:8081/userPlaylists");

    setItems(items.data);
  };
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
    getPlaylist();
  }, []);

  const currentPlaylist = async (index) => {
    setIsShown((prevCheck) => !prevCheck);
    setToggleEdit((current) => !current);

    setItemIndex(items.indexOf(index));
  };

  const closeModal = () => {
    setIsShown((current) => !current);
    setToggleEdit(true);
  };
  const deletePlaylist = async () => {
    axios
      .delete(
        "http://localhost:8081/delPlaylist/" + items[itemIndex].playlistURI
      )
      .then(() => {
        setIsShown((prevCheck) => !prevCheck);
        setToggleEdit((prevToggle) => !prevToggle);

        setItems((itemsTrack) =>
          itemsTrack.filter((_, i) => i !== items.indexOf(items[itemIndex]))
        );
        window.location.reload(false);
      });
  };

  return (
    <div className="main-div">
      {loading ? (
        <Loading />
      ) : (
        <div
          className="playlistWrapper"
          style={{ overFlow: isShown ? "hidden" : "scroll" }}
        >
          {isShown && (
            <div className="playcardWrapper user-playlist">
              <div className="bgBlock"></div>
              <div className="playcard infocontainer" ref={overflowRef}>
                <div className="img-wrap container">
                  <CloseIcon
                    classNameName="eventIcon"
                    onClick={closeModal}
                  ></CloseIcon>
                  <div className="d-flex justify-content-center align-items-center">
                    <img src={PLAYLISTIMG} className="playlist-img"></img>
                  </div>
                  <div className="d-flex justify-content-center align-items-center icon-container">
                    <EditIcon
                      className="eventIcon"
                      onClick={editClick}
                    ></EditIcon>
                    <DeleteOutlineIcon
                      onClick={deletePlaylist}
                      className="eventIcon"
                    ></DeleteOutlineIcon>
                  </div>

                  <div className="row title-header">
                    <h7 className="col-md-4">Artist</h7>
                    <h7 className="col-md-4 song-title">Song</h7>
                    <h7 className="col-md-4">Album</h7>
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  {toggleEdit ? (
                    <PlaylistInfo
                      items={items[itemIndex]}
                      setitems={setItems}
                      toggleEdit={toggleEdit}
                      setToggleEdit={setToggleEdit}
                      onClick={editClick}
                      icon={"Edit"}
                    ></PlaylistInfo>
                  ) : (
                    ""
                  )}{" "}
                </div>

                <div className="main-contain">
                  {items[itemIndex].track.map((track) => (
                    <TrackInfo trackItem={track}></TrackInfo>
                  ))}
                </div>
              </div>
            </div>
          )}
          {items.length > 0 && (
            <div key={remountComponent} className="row m-2">
              {items.map((item) => (
                <PlaylistCard
                  item={item}
                  onClick={() => currentPlaylist(item)}
                ></PlaylistCard>
              ))}
            </div>
          )}

          <div className="d-flex justify-content-center align-items-center p-3">
            <h3 style={{ display: items.length == 0 ? "block" : "none" }}>
              You have no playlists
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default playlist;
