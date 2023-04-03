import React from "react";
import PLAYLISTIMG from "../resrc/imgs/playlist4-removebg-preview1.png";
function PlaylistCard(props) {
  return (
    <div
      className="col-xs-12 col-sm-6 col-md-4 card-main"
      onClick={() => props.onClick(props.item)}
    >
      <div className="card shadow-sm card-container">
        <div className="card-body">
          <i className="fa fa-user mr-2"></i>{" "}
          <figure>
            {<img src={PLAYLISTIMG} className="playlistIMG"></img>}
            <figcaption className="caption">
              <h7 className="playlistNAME track-desc">
                {props.item.playlistName}
              </h7>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}

export default PlaylistCard;
