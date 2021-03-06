import React from "react";

import { Button } from "./components/Button/Button";
import { SearchInput } from "./components/SearchInput/SearchInput";
import { Spotify } from "./utility/Spotify";
import { Tile } from "./components/Tile/Tile";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      searchedTracks: [],
      playlistTracks: [],
      playlistName: "New Playlist",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.playlistChangedName = this.playlistChangedName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }
  /**
   * Update searchValue on an input change
   * @param {object} event
   * @param {object} event.target
   * @param {string} event.target.value
   */
  handleInputChange(event) {
    const newState = Object.assign({}, this.state);
    newState.searchValue = event.target.value;
    this.setState(newState);
  }
  /**
   * Update responseJSON on a click with the result of Spotify API
   */
  async handleSearchClick() {
    // Save the search term to retrieve it later
    window.sessionStorage.setItem("searchValue", this.state.searchValue);
    const responseJSON = await Spotify.search(this.state.searchValue);
    const newState = Object.assign({}, this.state);
    newState.searchedTracks = responseJSON.tracks.items;
    this.setState(newState);
  }

  async componentDidMount() {
    // Retrieve the save search
    const searchTermExistsInLocalStorage =
      sessionStorage.getItem("searchValue");
    if (searchTermExistsInLocalStorage) {
      let newState = Object.assign({}, this.state);
      newState.searchValue = searchTermExistsInLocalStorage;
      this.setState(newState);
    }
  }

  /**
   * Add an object to playlistTracks on a click
   * @param {string} trackId
   */
  addTrack(trackId) {
    // check if the track was already added to the playlist
    const existingTrack = this.state.playlistTracks.find(
      (el) => el.id === trackId
    );
    if (existingTrack) {
      return this.state.playlistTracks;
    }
    const addedTrack = this.state.searchedTracks.find(
      (el) => el.id === trackId
    );
    const newState = Object.assign({}, this.state);
    newState.playlistTracks.push(addedTrack);
    this.setState(newState);
  }

  /**
   * Remove an object from playlistTracks on a click
   * @param {string} trackId
   */
  removeTrack(trackId) {
    const removedTrackIndex = this.state.playlistTracks.findIndex(
      (el) => el.id === trackId
    );
    const newState = Object.assign({}, this.state);
    newState.playlistTracks.splice(removedTrackIndex, 1);
    this.setState(newState);
  }
  /**
   * Update playlistName on an input change
   * @param {string} name
   */
  playlistChangedName(name) {
    const newState = Object.assign({}, this.state);
    newState.playlistName = name;
    this.setState(newState);
  }

  /**
   * Create a playlist and add tracks by calling the Spotify API
   */
  async savePlaylist() {
    // TODO should I call only addTracks here or createPlaylist + addTracks ?
    await Spotify.addTracks(this.state.playlistName, this.state.playlistTracks);
    // Clean the tracks from the tile once the playlist is created
    const newState = Object.assign({}, this.state);
    newState.playlistTracks = [];
    newState.playlistName = "New Playlist";
    this.setState(newState);
  }

  render() {
    return (
      <>
        <h1>
          Ja<span>mmm</span>ing
        </h1>
        <main>
          <SearchInput
            searchValue={this.state.searchValue}
            handleInputChange={this.handleInputChange}
          />
          <Button
            value="search"
            class="secondary-button"
            onClick={this.handleSearchClick}
          />
          <div>
            <Tile
              title="Results"
              searchTile={true}
              searchedTracks={this.state.searchedTracks}
              addTrack={this.addTrack}
            />
            <Tile
              buttonValue="save to spotify"
              buttonClass="primary-button"
              title={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              removeTrack={this.removeTrack}
              playlistChangedName={this.playlistChangedName}
              onClick={this.savePlaylist}
            />
          </div>
        </main>
      </>
    );
  }
}

export default App;
