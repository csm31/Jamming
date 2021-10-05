import React from "react";
import { Button } from "../Button/Button";
import "./Tile.css";

export class Tile extends React.Component {
  render() {
    const splitWords = this.props.title.split(" ");
    splitWords.forEach((element, index) => {
      splitWords[index] = element[0].toUpperCase() + element.slice(1);
    });
    const capitalTitle = splitWords.join(" ");

    return (
      <section>
        {this.props.input==="true" ? <input className="playlistName" value={this.props.title}></input> : <h2>{capitalTitle}</h2>}
        {this.props.buttonValue && (
          <Button value={this.props.buttonValue} class={this.props.buttonClass} />
        )}
      </section>
    );
  }
}
