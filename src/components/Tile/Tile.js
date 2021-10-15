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
        {this.props.input ? (
          <>
            <input className="playlistName" defaultValue={capitalTitle} />
            {/* span used for the bottom line, check if stay like that or use alternative*/}
            <span></span>
            {this.props.playlistTracks && (
              <Playlist playlistTracks={this.props.playlistTracks} />
            )}
          </>
        ) : (
          <h2>{capitalTitle}</h2>
        )}
        {this.props.searchedTracks && !!this.props.searchedTracks.length && (
          <SearchResults
            searchedTracks={this.props.searchedTracks}
            addTrack={this.props.addTrack}
          />
        )}
        {this.props.buttonValue && (
          <Button
            value={this.props.buttonValue}
            class={this.props.buttonClass}
          />
        )}
      </section>
    );
  }
}
