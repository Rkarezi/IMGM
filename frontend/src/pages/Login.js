import React, { useState, useEffect, useContext } from "react";
import { login } from "../context/auth/AuthCall";
import { AuthContext } from "../context/auth/AuthContext";
import BGParticle from "../resrc/BGParticle";
import Loading2 from "../components/Loading";
function Login() {
  const [loading, setLoading] = useState(false);

  const { dispatch } = useContext(AuthContext);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  const handleLogin = () => {
    login(dispatch);
  };

  return (
    <div className="rec">
      {loading ? (
        <Loading2 />
      ) : (
        <div className="card vh-100 d-flex justify-content-center align-items-center">
          <div className="login-h">
            <h1>IMGM</h1>
            <span>Image Generated Music</span>
          </div>

          <form
            className="login_container"
            action="http://localhost:8081/login"
          >
            <button
              className="btn btn-primary btn-block btn-dark col-md-4"
              onClick={handleLogin}
            >
              <img
                src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
                className="link"
              ></img>
            </button>
          </form>

          <span className="tag">
            Link your spotify account to begin creating
          </span>
          <BGParticle />
        </div>
      )}
    </div>
  );
}

export default Login;
