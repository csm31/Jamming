let accessToken = null;
// const userId = "11173213555";
const accountBaseAddress = "https://accounts.spotify.com";
const apiBaseAddress = "https://api.spotify.com";
const authenticationEndpoint = "/authorize";
const searchEndpoint = "/v1/search";
const userProfileEndpoint = "/v1/me";
const createPlaylistEndpoint = "/v1/users/";
const addTracks = "/v1/playlists/";
const clientID = "10e9b8b8c4c94f1e93880396710e966e";
const responseType = "token";
const redirectUri = "http://localhost:3000/";
const scope = "playlist-modify-public";
const searchType = "track";

const Spotify = {
  /**
   * Request an authentication token
   * @returns {string}
   */
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    // check the URL to see if it was just obtained
    const searchToken = window.location.hash.indexOf("access_token");
    const searchExpirationDuration = window.location.hash.indexOf("expires_in");
    if (searchToken !== -1 && searchExpirationDuration !== -1) {
      const splitHash = window.location.hash.split("&");
      const splitToken = splitHash[0].split("=");
      const splitExpiration = splitHash[2].split("=");
      accessToken = splitToken[1];
      const accessExpirationDuration = splitExpiration[1];
      // when expiration duration is over, clear accessToken and the URL parameters
      window.setTimeout(
        () => (accessToken = null),
        Number(accessExpirationDuration) * 1000
      );
      window.history.pushState({}, "", window.location.origin);
      return accessToken;
    } else {
      // ask for authorization with the Implicit Grant Flow (no client_secret)
      const requestAuthentication = `${accountBaseAddress}${authenticationEndpoint}?client_id=${clientID}&response_type=${responseType}&scope=${scope}&redirect_uri=${redirectUri}`;
      //navigate to the authentication page if not logged and have not accepted the conditions yet
      window.location = requestAuthentication;
    }
  },
  /**
   * Search for a track name with the Spotify search API
   * @param {string} searchTerm
   * @returns {Promise<object>}
   */
  async search(searchTerm) {
    const accessToken = this.getAccessToken();
    if (!searchTerm) {
      const responseJSON = { tracks: { items: [] } };
      return responseJSON;
    } else {
      try {
        const response = await fetch(
          `${apiBaseAddress}${searchEndpoint}?type=${searchType}&q=${searchTerm}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        if (response.ok) {
          const responseJSON = await response.json();
          return responseJSON;
        } else {
          throw Error("error detected");
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  /**
   * Find the current user id with the Spotify API
   * @param {string} playlistName
   * @returns {Promise<object>}
   */
  async userId() {
    const accessToken = this.getAccessToken();
    const url = `${apiBaseAddress}${userProfileEndpoint}`;
    try {
      const response = await fetch(url, {
        // method:"GET",
        // mode: "cors",
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (response.ok) {
        const responseJSON = await response.json();
        return responseJSON.id;
      } else {
        throw Error();
      }
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Create a new playlist with the Spotify API
   * @param {string} playlistName
   * @returns {Promise<object>}
   */
  async createPlaylist(playlistName) {
    // if no change in the playlist name input
    // if (!playlistName) {
    //   playlistName = "New Playlist";
    // }
    const userId = await Spotify.userId();
    const url = `${apiBaseAddress}${createPlaylistEndpoint}${userId}/playlists`;
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ name: playlistName }),
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (response.ok) {
        const responseJSON = await response.json();
        return responseJSON.id;
      } else {
        throw Error();
      }
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * Add tracks to a playlist with the Spotify API
   * @param {string} playlistName
   * @param {object[]} playlistTracks
   * @returns {Promise<object>}
   */
  async addTracks(playlistName, playlistTracks) {
    // create an empty playlist
    const playlistId = await Spotify.createPlaylist(playlistName);
    // add tracks to the playlist
    const url = `${apiBaseAddress}${addTracks}${playlistId}/tracks`;
    const playlistUris = playlistTracks.map((el) => el.uri);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({
          uris: playlistUris,
        }),
      });
      if (response.ok) {
        const responseJSON = await response.json();
        return responseJSON;
      } else {
        throw Error();
      }
    } catch (error) {
      console.log(error);
    }
  },
};

export { Spotify };
