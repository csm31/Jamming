import React from "react";

export class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveTrack = this.handleRemoveTrack.bind(this);
  }
  handleRemoveTrack(event) {
    const trackId = event.target.id;
    this.props.removeTrack(trackId);
  }
  render() {
    return (
      <>
        {this.props.playlistTracks.map((el) => {
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
