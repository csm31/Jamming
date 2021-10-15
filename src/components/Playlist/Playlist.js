import React from "react";

export class Playlist extends React.Component {

  render() {
    return (
      // check if div is needed or can be replaced by <>
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
              {/* <button className="add-track" id={el.id} onClick={this.handleAddTrack}>
                    +
                  </button> */}
            </div>
          );
        })}
      </>
    );
  }
}
