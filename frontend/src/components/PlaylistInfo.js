import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

function PlaylistInfo(props) {
  const [getplaylistName, setPlaylistName] = useState("");
  const [playlistdesc, setPlaylistDesc] = useState("");
  const [error, setError] = useState(false);
  const handleErr = (e) => {
    if (error) {
      e.preventDefault();

      setError(true);
    } else {
      setError(false);
    }
  };
  const updateName = () => {
    document.querySelector(".sbmt").disabled = true;
    props.items = getplaylistName;
    props.setItems([...props.items], {
      playlistName: getplaylistName,
    });
  };
  const submissionHandle = error ? handleErr : updateName;

  const playlistNameValid = (event) => {
    setPlaylistName(event.target.value);

    if (getplaylistName.length > 100) {
      setError(true);
    } else if (getplaylistName.length <= 100) {
      setError(false);
    }
  };

  const playlistDescValid = (event) => {
    setPlaylistDesc(event.target.value);
    if (playlistdesc.length > 300) {
      setError(true);

      return error;
    } else if (playlistdesc.length <= 300) {
      setError(false);
      return error;
    }
  };
  const isValid = (e) => {
    if (
      getplaylistName.length == 0 ||
      getplaylistName.trim().length == 0 ||
      getplaylistName.length > 100 ||
      playlistdesc.length == 0 ||
      playlistdesc.trim().length == 0 ||
      playlistdesc.length > 300
    ) {
      e.preventDefault();
      setError(true);
    } else {
      setError(false);
    }
  };
  return (
    <div className="toggle-wrap rounded-3">
      <CloseIcon
        className="eventIcon"
        onClick={() => props.onClick()}
      ></CloseIcon>

      <div className="form outline form-white">
        <form
          method="POST"
          action={
            props.icon == "Edit"
              ? `http://localhost:8081/updatePlaylist/` +
                props.items.playlistURI
              : "http://localhost:8081/createPlaylist"
          }
          onSubmit={submissionHandle}
        >
          <>
            <div className="row input-container">
              <div className="col-xs-12">
                <div className="styled-input wide">
                  <input
                    type="text"
                    placeholder={
                      props.icon == "Edit"
                        ? props.items.playlistName
                        : "Playlist Name"
                    }
                    style={{
                      borderColor:
                        error || getplaylistName.length > 100 ? "red" : "white",
                    }}
                    onChange={(e) => playlistNameValid(e)}
                    name="nameInput"
                    value={getplaylistName}
                    className="form-control input-res"
                  ></input>

                  {getplaylistName.length > 100 ? (
                    <label style={{ color: "red" }}>
                      {" "}
                      {getplaylistName.length}/100
                    </label>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="col-xs-12">
                <div className="styled-input wide">
                  <textarea
                    placeholder={
                      props.icon == "Edit"
                        ? props.items.playlistDesc
                        : "Playlist Description"
                    }
                    style={{
                      display: "block",
                      marginTop: 10,
                      paddingTop: "0.375rem",
                      paddingLeft: "0.75rem",
                      zIndex: 1,
                      height: 100,
                      borderColor:
                        error || playlistdesc.length > 300 ? "red" : "white",
                    }}
                    onChange={(e) => playlistDescValid(e)}
                    name="descInput"
                    value={playlistdesc}
                    className="form-control"
                  ></textarea>

                  {playlistdesc.length > 300 ? (
                    <label style={{ color: "red" }}>
                      {" "}
                      {playlistdesc.length}/300
                    </label>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="button-container">
              <button
                type="submit"
                className="justify-content-center align-items-center sbmt"
                onClick={(e) => isValid(e)}
                disabled={false}
              >
                {props.icon}
              </button>
            </div>
          </>
        </form>
      </div>
    </div>
  );
}

export default PlaylistInfo;
