import React from "react";

import { Button } from "../Button/Button";
import { Playlist } from "../Playlist/Playlist";
import { SearchResults } from "../SearchResults/SearchResults";

import "./Tile.css";

export class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.playlistNameChange = this.playlistNameChange.bind(this);
  }

  playlistNameChange(event) {
    const name = event.target.value;
    this.props.playlistChangedName(name);
  }

  render() {
    return (
      <section>
        {this.props.searchTile ? (
          <>
            <h2>{this.props.title}</h2>
            <SearchResults
              searchedTracks={this.props.searchedTracks}
              addTrack={this.props.addTrack}
            />
          </>
        ) : (
          <>
            <input
              className="playlistName"
              value={this.props.title}
              onChange={this.playlistNameChange}
            />
            {this.props.playlistTracks && (
              <Playlist
                playlistTracks={this.props.playlistTracks}
                removeTrack={this.props.removeTrack}
              />
            )}
            <Button
              value={this.props.buttonValue}
              class={this.props.buttonClass}
              onClick={this.props.onClick}
            />
          </>
        )}
      </section>
    );
  }
}
