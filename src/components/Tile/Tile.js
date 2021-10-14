import React from "react";
import { Button } from "../Button/Button";
import "./Tile.css";
import { capitalizeTitle } from "../../utility/other";
import { SearchResults } from "../SearchResults/SearchResults";

export class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.findTrack = this.findTrack.bind(this);
  }

  findTrack() {
    const track = this.props.searchResults.tracks.items.find(
      (el) => el.id === this.props.addTrack
    );
    return track;
  }

  render() {
    const capitalTitle = capitalizeTitle(this.props.title);
    return (
      
      <section>
        {this.props.input ? (
          <>
            <input className="playlistName" defaultValue={capitalTitle} />
            <span></span>
            {this.props.addTrack && (
              <>
                <h3>{this.findTrack().name}</h3>
                <p>{this.findTrack().artists[0].name} | {this.findTrack().album.name}</p>
              </>
            )}
          </>
        ) : (
          <h2>{capitalTitle}</h2>
        )}
        {this.props.searchTile && (
          <SearchResults
            responseJSON={this.props.searchResults}
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
