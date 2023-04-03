import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Main() {
  const [user, setUser] = useState([]);
  const [image, setImage] = useState([]);
  const [topArt, setArt] = useState([]);
  const [getPlay, setPlay] = useState([]);
  useEffect(async () => {
    axios.get("http://localhost:8081/profile").then((response) => {
      const user = response.data;
      const image = response.data.images[0].url;

      setUser(user);
      setImage(image);

      axios.get("http://localhost:8081/topArtists").then((response) => {
        const topArt = response.data.items;
        setArt(topArt);
      });
    });

    const getPlay = await axios.get("http://localhost:8081/userPlaylists");
    setPlay(getPlay.data);
  }, []);

  return (
    <>
      <Navbar
        user={user}
        image={image}
        topArt={topArt}
        getPlay={getPlay}
      ></Navbar>
    </>
  );
}

export default Main;
