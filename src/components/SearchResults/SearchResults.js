import React from "react";

import { Tracklist } from "../Tracklist/Tracklist";

import "./SearchResults.css";

export class SearchResults extends React.Component {
  render() {
    return (
      <Tracklist
        searchedTracks={this.props.searchedTracks}
        addTrack={this.props.addTrack}
      />
    );
  }
}
