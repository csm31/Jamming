import "./App.css";
import React from "react";
import { Button } from "./components/Button/Button";
import { Tile } from "./components/Tile/Tile";

class App extends React.Component {
  render() {
    return (
      <>
        <h1>
          Ja<span>mmm</span>ing
        </h1>
        <main>
          <input className="searchBar"
            type="search"
            placeholder="Enter A Song, Album, or Artist"
          ></input>
          <Button value="search" class="secondary-button" />
          <div id="tiles">
            <Tile title="results" />
            <Tile buttonValue="save to spotify" buttonClass="primary-button" title="new playlist" input="true"/>
          </div>
          
        </main>
      </>
    );
  }
}

export default App;
