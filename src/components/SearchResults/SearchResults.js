import React from "react";
import "./SearchResults.css";

export class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddTrack = this.handleAddTrack.bind(this);
  }

  handleAddTrack(event) {
    const trackId = event.target.id;
    this.props.addTrack(trackId);
  }

  render() {
    return (
      <div>
        {this.props &&
          this.props.searchedTracks &&
          this.props.searchedTracks.map((el) => {
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
              </div>
            );
          })}
      </div>
    );
  }
}
