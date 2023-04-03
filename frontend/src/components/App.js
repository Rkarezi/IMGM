import React, { useContext } from "react";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Profile from "../pages/Profile";
import CreatePlay from "../pages/CreatePlay";
import Playlist from "../pages/Playlist";
import Recommendations from "../pages/Recommendations";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "../context/auth/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            element={user ? <Main></Main> : <Navigate to="/login"></Navigate>}
          >
            <Route
              path="/profile"
              element={
                user ? <Profile></Profile> : <Navigate to="/login"></Navigate>
              }
            />
            <Route path="/" element={<Profile></Profile>} />

            <Route
              path="/create"
              element={
                user ? (
                  <CreatePlay></CreatePlay>
                ) : (
                  <Navigate to="/login"></Navigate>
                )
              }
            />
            <Route
              path="/playlist"
              element={
                user ? <Playlist></Playlist> : <Navigate to="/login"></Navigate>
              }
            />
          </Route>
          <Route path="/login" element={<Login></Login>} />
          <Route
            path="/recommendedPlaylist"
            element={
              user ? (
                <Recommendations></Recommendations>
              ) : (
                <Navigate to="/login"></Navigate>
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
