import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Loading from "../components/Loading";

function Profile() {
  const [loading, setLoading] = useState(false);
  const user = useOutletContext();
  const image = useOutletContext();
  const topArt = useOutletContext();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="main-div">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="userName d-flex justify-content-center align-items-center">
            <div>
              <img
                src={image.image}
                className="rounded-circle d-flex pro-img"
              ></img>
              <h1 className="d-flex justify-content-center align-items-center">
                {user.user.display_name}
              </h1>
              <h7>@{user.user.id}</h7>
            </div>
          </div>

          <div className="topArtistWrapper">
            <p className="profile-artist-header">Your Favourite Artists</p>
            <div className="artist-imgs d-flex justify-content-center align-items center">
              <div>
                {topArt.topArt.map((artist) => (
                  <div className="res-wrap justify-content-center align-items-center">
                    <li className="items ImgItems">
                      <img
                        src={artist.images[1].url}
                        className="topArtImg rounded-circle"
                      ></img>
                      <li className="items d-flex justify-content-center align-items-center">
                        <i>{artist.name}</i>
                      </li>
                    </li>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
