import "./App.css";
import React from "react";
import { Button } from "./components/Button/Button";
import { Tile } from "./components/Tile/Tile";
import { Spotify } from "./utility/Spotify";
// import { Playlist } from "./components/Playlist/Playlist";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      searchedTracks: [],
      playlistTracks: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  /**
   * Update searchValue on an input change
   * @param {object} event
   * @param {object} event.target
   * @param {string} event.target.value
   */
  handleInputChange(event) {
    // Alternative when there are several properties to set in state
    const newState = Object.assign({}, this.state);
    newState.searchValue = event.target.value;
    this.setState(newState);
  }
  /**
   * Update responseJSON on a click with the result of Spotify API
   */
  async handleSearchClick() {
    const responseJSON = await Spotify.search(this.state.searchValue);
    const newState = Object.assign({}, this.state);
    newState.searchedTracks = responseJSON.tracks.items;
    this.setState(newState);
  }
  /**
   * Update playlistTracks on a click
   * @param {string} trackId
   */
  addTrack(trackId) {
    // convert for loop to Array.find
    for (const track of this.state.playlistTracks) {
      if (track.id === trackId) {
        return this.state.playlistTracks;
      }
    }
    const addedTrack = this.state.searchedTracks.find(
      (el) => el.id === trackId
    );
    const newState = Object.assign({}, this.state);
    newState.playlistTracks.push(addedTrack);
    this.setState(newState);
  }

  removeTrack(trackId) {
    const removedTrackIndex = this.state.playlistTracks.findIndex(
      (el) => el.id === trackId
    );
    const newState = Object.assign({}, this.state);
    newState.playlistTracks.splice(removedTrackIndex, 1);
    this.setState(newState);
  }

  render() {
    return (
      <>
        <h1>
          Ja<span>mmm</span>ing
        </h1>
        <main>
          <input
            aria-label="Search for music"
            className="searchBar"
            type="search"
            onChange={this.handleInputChange}
            placeholder="Enter A Song, Album, or Artist"
          ></input>

          <Button
            value="search"
            class="secondary-button"
            onClick={this.handleSearchClick}
          />
          <div id="tiles">
            <Tile
              title="results"
              searchTile={true}
              searchedTracks={this.state.searchedTracks}
              addTrack={this.addTrack}
            />
            <Tile
              buttonValue="save to spotify"
              buttonClass="primary-button"
              title="new playlist"
              playlistTracks={this.state.playlistTracks}
              removeTrack={this.removeTrack}
            />
          </div>
        </main>
      </>
    );
  }
}

export default App;
