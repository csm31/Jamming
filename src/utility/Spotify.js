let accessToken = "";
const clientID = "10e9b8b8c4c94f1e93880396710e966e";
const accountAddress = "https://accounts.spotify.com";
const apiBaseAddress = "https://api.spotify.com";
const authenticationEndpoint = "/authorize";
const searchTracksEndpoint = "/v1/search";
const userProfileEndpoint = "/v1/me";
const createPlaylistEndpoint = "/v1/users/";
const addTracksEndpoint = "/v1/playlists/";
const responseType = "token";
// TODO change redirectUri depending if I am in localhost or surge
let redirectUri = "http://localhost:3000/";
// const redirectUri =
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
    const url = window.location.href;
    const regexToken = /access_token=([^&]*)/;
    const regexExpirationTime = /expires_in=([^&]*)/;
    const searchExpirationDuration = url.match(regexExpirationTime);
    const searchToken = url.match(regexToken);
    if (searchToken && searchExpirationDuration) {
      accessToken = searchToken[1];
      const expirationDuration = searchExpirationDuration[1];
      // when expiration duration is over, clear accessToken and the URL parameters
      window.setTimeout(
        () => (accessToken = ""),
        Number(expirationDuration) * 1000
      );
      // state of pushState is not used and title is not supported by most browsers
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
    //  redirectUri depends if you are in developement mode or not
      if (window.location.href !== redirectUri) {
        redirectUri = "http://jamming_capucine_soum.surge.sh/";
      }
       // ask for authorization with the Implicit Grant Flow (no client_secret)
      const requestAuthentication = `${accountAddress}${authenticationEndpoint}?client_id=${clientID}&response_type=${responseType}&scope=${scope}&redirect_uri=${redirectUri}`;
      //navigate to the authentication page
      window.location = requestAuthentication;
      
    }
  },
  /**
   * Search for a track name with the Spotify search API
   * @param {string} searchTerm
   * @returns {Promise<object>}
   */
  async search(searchTerm) {
    const accessToken = Spotify.getAccessToken();
    if (!searchTerm) {
      const responseJSON = { tracks: { items: [] } };
      return responseJSON;
    } else {
      try {
        const response = await fetch(
          `${apiBaseAddress}${searchTracksEndpoint}?type=${searchType}&q=${searchTerm}`,
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
    const url = `${apiBaseAddress}${addTracksEndpoint}${playlistId}/tracks`;
    // TODO better to do it here or in App ?
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
