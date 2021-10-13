import React from "react";
import { Button } from "../Button/Button";
import "./Tile.css";
import { capitalizeTitle } from "../../utility/other";
import { SearchResults } from "../SearchResults/SearchResults";

export class Tile extends React.Component {
  render() {
    const capitalTitle = capitalizeTitle(this.props.title);
    return (
      <section>
        {this.props.input ? (
          <>
            <input className="playlistName" defaultValue={capitalTitle} />
            <span></span>
          </>
        ) : (
          <h2>{capitalTitle}</h2>
        )}
        {this.props.searchTile && (
          <SearchResults responseJSON={this.props.searchResults} />
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
