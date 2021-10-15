import React from "react";

import { Button } from "../Button/Button";
import { Playlist } from "../Playlist/Playlist";
import { SearchResults } from "../SearchResults/SearchResults";
import { capitalizeTitle } from "../../utility/other";

import "./Tile.css";

export class Tile extends React.Component {
  render() {
    const capitalTitle = capitalizeTitle(this.props.title);
    return (
      <section>
        {this.props.searchTile ? (
          <>
            <h2>{capitalTitle}</h2>
            <SearchResults
              searchedTracks={this.props.searchedTracks}
              addTrack={this.props.addTrack}
            />
          </>
        ) : (
          <>
            <input className="playlistName" defaultValue={capitalTitle} />
            {this.props.playlistTracks && (
              <Playlist playlistTracks={this.props.playlistTracks} />
            )}
            <Button
              value={this.props.buttonValue}
              class={this.props.buttonClass}
            />
          </>
        )}
      </section>
    );
  }
}
