import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { logoff } from "../context/auth/AuthCall";
import { AuthContext } from "../context/auth/AuthContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../styles.css";
function Navbar(props) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [props.getPlay]);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const handleLogout = () => {
    logoff(dispatch);
    window.localStorage.clear();
    navigate("/login");
  };

  let activeStyle = {
    color: "white",
    padding: "0px",
    BorderColor: "black",
    margin: "0px",
    textDecoration: "none",
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 main-nav">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100 nav-inner">
            <span className="fs-5 d-none d-sm-inline pb-3 mb-md-0 me-md-auto main-logo">
              IMGM
            </span>

            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li>
                <NavLink
                  exact
                  to="/create"
                  className="navLink ms-1 d-none d-sm-inline track-desc"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  <i className="fs-4 bi-bootstrap"></i> Create Playlists
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="navLink ms-1 d-none d-sm-inline track-desc"
                  exact
                  to="/playlist"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  <i className="fs-4 bi-bootstrap"></i>
                  My Playlists
                  <div className="nav-play">
                    {props.getPlay[0] != undefined
                      ? props.getPlay.map((playlist, index) => {
                          return (
                            <h6
                              className="navLink ms-1 d-none d-sm-inline track-desc"
                              key={index}
                            >
                              <i className="fs-4 bi-bootstrap"></i>
                              {playlist.playlistName}
                            </h6>
                          );
                        })
                      : ""}
                  </div>
                </NavLink>
              </li>
            </ul>
            <hr />
            <div className="dropdown pb-4 dropdownContainer">
              <a
                href="#"
                className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={props.image}
                  className="rounded-circle nav-img"
                  style={{ display: loading ? "none" : "block" }}
                />
                <span
                  className="d-none d-sm-inline mx-1 track-desc"
                  style={{ display: loading ? "none" : "block" }}
                >
                  {props.user.display_name}
                </span>
              </a>
              <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                <li>
                  <Link exact to="/playlist" className="nav-drop dropdown-item">
                    My Playlists
                  </Link>
                </li>
                <li>
                  <Link exact to="/create" className="nav-drop dropdown-item">
                    Create Playlists
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" onClick={handleLogout}>
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Outlet
          context={{
            user: props.user,
            image: props.image,
            topArt: props.topArt,
          }}
        ></Outlet>
      </div>
    </div>
  );
}

export default Navbar;
