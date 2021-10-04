import "./App.css";
import React from "react";
import {Button} from './components/Button/Button'

class App extends React.Component {
  render() {
    return (
      <>
        <h1>
          Ja<span>mmm</span>ing
        </h1>
        <main>
          <input type="search" placeholder="Enter A Song, Album, or Artist"></input>
          <Button value="search" class="secondary-button"/>
        </main>
      </>
    );
  }
}

export default App;
