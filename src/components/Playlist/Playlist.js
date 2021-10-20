import React from "react";

import { Tracklist } from "../Tracklist/Tracklist";

import "./Playlist.css";

export class Playlist extends React.Component {
  render() {
    return (
      <Tracklist
        playlistTracks={this.props.playlistTracks}
        removeTrack={this.props.removeTrack}
      />
    );
  }
}
