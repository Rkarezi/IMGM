import React from "react";

function TrackInfo(props) {
  return (
    <div className="row track-wrap">
      <i className="artist col-md-4 track-desc">
        {props.trackItem.artist_name}
      </i>

      <i className="song col-md-4 track-desc">{props.trackItem.song_name}</i>

      <i className="album col-md-4 track-desc">{props.trackItem.album_name}</i>
    </div>
  );
}

export default TrackInfo;
