let accessToken = null;
const accountBaseAddress = "https://accounts.spotify.com";
const apiBaseAddress = "https://api.spotify.com";
const authenticationEndpoint = "/authorize";
const searchEndpoint = "/v1/search";
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
};

export { Spotify };
