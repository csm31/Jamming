import React from "react";

export class Tracklist extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddTrack = this.handleAddTrack.bind(this);
    this.handleRemoveTrack = this.handleRemoveTrack.bind(this);
  }
  handleAddTrack(event) {
    const trackId = event.target.id;
    this.props.addTrack(trackId);
  }

  handleRemoveTrack(event) {
    const trackId = event.target.id;
    this.props.removeTrack(trackId);
  }
  render() {
    let tracks;
    this.props.searchedTracks
      ? (tracks = this.props.searchedTracks)
      : (tracks = this.props.playlistTracks);
    return (
      <>
        {tracks &&
          tracks.map((el) => {
            return (
              <div className="tracklist" key={el.id}>
                <div>
                  <h3>{el.name}</h3>
                  <p>
                    {el.artists[0].name} | {el.album.name}
                  </p>
                </div>
                <button
                  className="add-track"
                  id={el.id}
                  onClick={this.handleAddTrack}
                >
                  +
                </button>
                <button
                  className="add-track"
                  id={el.id}
                  onClick={this.handleRemoveTrack}
                >
                  -
                </button>
              </div>
            );
          })}
      </>
    );
  }
}
