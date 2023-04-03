const express = require("express");
const router = express.Router();
const Schemas = require("../models/Schemas");
const { Users } = require("../models/Schemas");
const { PlayLists } = require("../models/Schemas");

const axios = require("axios");
var querystring = require("querystring");
require("dotenv/config");
var request = require("request");
const LIMIT = 30;
const MAX_OFFSET = 400;
const MARKET = "ES";

var imgInfo = {
  0: ["club", "dance", "deep-house", "electronic"],
  1: ["chill", "house"],
  2: ["guitar", "acoustic"],
  3: ["drum-and-bass", "garage", "heavy-metal", "rock", "metal"],
  4: ["edm", "hardstyle", "hip-hop", "r-n-b", "pop", "party", "trance"],
  5: ["romance", "sad", "rainy-day"],
  6: ["classical", "ambient", "sleep"],
  7: ["techno", "vibe", "workout"],
};
var seedTracks = [];
var seedArtists = [];
var trackURI = [];
var genreSeed = [];
var trackObj = [];
var userId;
var usernameID;
var user;
var playlistUpdate;
var playlistID;
var access_token;
var token_expire;
var created_at;
router.get("/login", function (req, res) {
  var scope =
    "user-read-private user-read-email playlist-modify-public playlist-modify-private user-top-read";
  try {
    res.redirect(
      "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
          response_type: "code",
          client_id: process.env.CLIENT_ID,
          scope: scope,
          redirect_uri: process.env.REDIRECT_URI,
        })
    );
  } catch (error) {
    res.send(error);
  }
});

router.get("/callback", function (req, res) {
  code = req.query.code || null;
  var authHeaders = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        new Buffer(
          process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
        ).toString("base64"),
    },
    json: true,
  };

  request.post(authHeaders, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      (access_token = body.access_token), (refresh_token = body.refresh_token);
      var optHeaders = {
        url: "https://api.spotify.com/v1/me",
        headers: { Authorization: "Bearer " + access_token },
        json: true,
      };

      request.get(optHeaders, async (error, response, body) => {
        userId = body.id;
        created_at = Date.now();
        token_expire = body.expires_in;
        const findUser = await Users.findOne({ username: body.id });
        if (!findUser) {
          res.send("User not verified");
        } else {
          console.log("user already exists");
          user = Schemas.Users;
          usernameID = await user.findOne({
            username: userId,
          });

          res.redirect("http://localhost:8080/profile");
        }
      });
    } else {
      res.redirect(
        "/#" +
          querystring.stringify({
            error: "invalid_token",
          })
      );
    }
  });
});

router.get("/profile", function (req, res) {
  var optHeaders = {
    url: "https://api.spotify.com/v1/me",
    headers: { Authorization: "Bearer " + access_token },
    json: true,
  };

  request.get(optHeaders, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.send(body);
    } else {
      res.send("Error displaying profile");
    }
  });
});

router.get("/logout", function (req, res) {
  if (access_token != null) {
    access_token = null;
    refresh_token = null;
    res.send("User logged in");
  } else {
    res.send("User not logged in");
  }
});

router.post("/musicData", async (req, res) => {
  genreSeed = [];
  seedArtists = [];
  seedTracks = [];
  var genre1;
  var reqImg = req.body.imgD;

  reqImg.forEach((image) => {
    for (let [key, value] of Object.entries(imgInfo)) {
      if (key == image) {
        genre1 = Math.floor(Math.random() * value.length);
        genreSeed.push(imgInfo[key][genre1]);
      }
    }
  });

  var optHeaders = {
    headers: { Authorization: "Bearer " + access_token },
    json: true,
  };

  const returnMusicData = await Promise.all([
    axios.get(
      `https://api.spotify.com/v1/search?q=genre:${
        genreSeed[0]
      }&type=artist,track&limit=1&offset=${Math.floor(
        Math.random() * MAX_OFFSET
      )}`,
      optHeaders
    ),
    axios.get(
      `https://api.spotify.com/v1/search?q=genre:${
        genreSeed[1]
      }&type=artist,track&limit=1&offset=${Math.floor(
        Math.random() * MAX_OFFSET
      )}`,
      optHeaders
    ),
    axios.get(
      `https://api.spotify.com/v1/search?q=genre:${
        genreSeed[2]
      }&type=artist,track&limit=1&offset=${Math.floor(
        Math.random() * MAX_OFFSET
      )}`,
      optHeaders
    ),
    axios.get(
      `https://api.spotify.com/v1/search?q=genre:${
        genreSeed[3]
      }&type=artist,track&limit=1&offset=${Math.floor(
        Math.random() * MAX_OFFSET
      )}`,
      optHeaders
    ),
  ]);
  if (returnMusicData) {
    returnMusicData.map((item) => {
      if (item.data.artists.items[0] != undefined) {
        seedArtists.push(item.data.artists.items[0].id);
        seedTracks.push(item.data.tracks.items[0].id);
      }
    });
  } else {
    res.send("Error in requests");
  }
});

router.get("/recommend", function (req, res) {
  trackObj = [];
  trackURI = [];

  var optHeaders = {
    headers: { Authorization: "Bearer " + access_token },
    json: true,
  };

  var seedArtist1 = seedArtists[Math.floor(Math.random() * seedArtists.length)];
  var seedArtist2 = seedArtists[Math.floor(Math.random() * seedArtists.length)];

  var seedGenre1 = genreSeed[Math.floor(Math.random() * genreSeed.length)];
  var seedGenre2 = genreSeed[Math.floor(Math.random() * genreSeed.length)];

  var seedSong1 = seedTracks[Math.floor(Math.random() * seedTracks.length)];

  axios
    .get(
      `https://api.spotify.com/v1/recommendations?limit=${LIMIT}&market=${MARKET}&seed_artists=${seedArtist1},${seedArtist2}&seed_genres=${seedGenre1},${seedGenre2}&seed_tracks=${seedSong1}`,
      optHeaders
    )
    .then((response) => {
      var getArtist;
      response.data.tracks.forEach((track) => {
        var trackIndex = response.data.tracks.indexOf(track);
        response.data.tracks[trackIndex].artists.forEach((musician) => {
          var artistIndex =
            response.data.tracks[trackIndex].artists.indexOf(musician);

          if (response.data.tracks[trackIndex].artists.length > 1) {
            if (artistIndex == 0) {
              getArtist =
                response.data.tracks[trackIndex].artists[artistIndex].name;
            } else {
              getArtist +=
                ", " +
                response.data.tracks[trackIndex].artists[artistIndex].name;
            }
          } else {
            getArtist =
              response.data.tracks[trackIndex].artists[artistIndex].name;
          }
        });
        trackURI.push("spotify:track:" + response.data.tracks[trackIndex].id);
        trackObj.push({
          artist_name: getArtist,
          song_name: response.data.tracks[trackIndex].name,
          album_name: response.data.tracks[trackIndex].album.name,
        });
      });
      genreSeed = [];
      seedArtists = [];
      seedTracks = [];
      res.send(trackObj);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/createPlaylist", function (req, res) {
  var getPlayName = req.body.nameInput,
    getDescName = req.body.descInput;

  var playHeaders = {
    url: `https://api.spotify.com/v1/users/${userId}/playlists`,
    headers: {
      Authorization: "Bearer " + access_token,
    },
    form: JSON.stringify({
      name: getPlayName,
      description: getDescName,
      public: false,
    }),
    json: true,
  };

  request.post(playHeaders, function (err, resp, body) {
    if (!err) {
      playlistID = body.id;

      var playOptHeaders = {
        url: `	https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
        headers: {
          Authorization: "Bearer " + access_token,
        },
        form: JSON.stringify({
          uris: [...trackURI],
        }),
        json: true,
      };

      request.post(playOptHeaders, function (err, resp, body) {
        if (!err) {
          const playlistDoc = new Schemas.PlayLists({
            playlistName: getPlayName,
            playlistDesc: getDescName,
            playlistURI: playlistID,
            track: [...trackObj],
            user: usernameID._id,
          });

          try {
            playlistDoc.save();
          } catch (error) {
            res.send(error);
          }
          res.redirect("http://localhost:8080/playlist");
        } else {
          res.send(err);
        }
      });
    } else {
      res.send(err);
    }
  });
});

router.get("/userPlaylists", function (req, res) {
  if (access_token != null) {
    PlayLists.find({ user: usernameID._id })
      .then((playlist) => {
        res.send(playlist);
      })
      .catch((err) => {
        res.send(err);
      });
  } else {
    res.send("User not logged in");
  }
});

router.delete("/delPlaylist/:id", function (req, res) {
  if (access_token != null) {
    var playHeaders = {
      url: `https://api.spotify.com/v1/playlists/${req.params.id}/followers`,
      headers: { Authorization: "Bearer " + access_token },
      json: true,
    };

    request.delete(playHeaders, function (error, response, body) {
      if (error) {
        res.send(error);
      }
    });
    PlayLists.deleteOne({ playlistURI: req.params.id })
      .then(() => {
        res.send("The playlist has been deleted");
      })
      .catch((err) => {
        res.send(err);
      });
  } else {
    res.send("User not logged in");
  }
});

router.post("/updatePlaylist/:id", function (req, res) {
  if (access_token != null) {
    var updateOptions = {
      url: `https://api.spotify.com/v1/playlists/${req.params.id}`,
      headers: { Authorization: "Bearer " + access_token },
      form: JSON.stringify({
        name: req.body.nameInput,
        description: req.body.descInput,
        public: false,
      }),
      json: true,
    };
    request.put(updateOptions, async (err, response, body) => {
      if (!err && response.statusCode === 200) {
        playlistUpdate = await PlayLists.findOne({
          playlistURI: req.params.id,
        });
        (playlistUpdate.playlistName = req.body.nameInput),
          (playlistUpdate.playlistDesc = req.body.descInput);
        try {
          playlistUpdate.save();
        } catch (error) {
          res.send(error);
        }
        res.redirect("http://localhost:8080/playlist");
      } else {
        res.send(err);
      }
    });
  } else {
    res.send("User not logged in");
  }
});

router.get("/topArtists", function (req, res) {
  var topArtistOptions = {
    url: "https://api.spotify.com/v1/me/top/artists?offset=0&limit=3",
    headers: { Authorization: "Bearer " + access_token },
    json: true,
  };
  request.get(topArtistOptions, function (err, response, body) {
    if (!err && response.statusCode === 200) {
      res.send(body);
    } else {
      res.send("Error retrieving artists");
    }
  });
});

router.get("/isLogged", function (req, res) {
  res.send("user");
});

router.get("/isValid", function (req, res) {
  const timetoexpire = created_at + token_expire * 1000;

  const now = Date.now();

  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(
          process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
        ).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  if (now >= timetoexpire) {
    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        access_token = body.access_token;
        token_expire = body.expires_in;
        created_at = Date.now();
        if (body.refresh_token != null) {
          refresh_token = body.refresh_token;
        } else {
          res.send("refreshed_token");
        }
      } else {
        res.send(error);
      }
    });
  } else {
    res.send("active_token");
  }
});

module.exports = router;
