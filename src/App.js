import React, { Component } from 'react';
import './App.css';
import Playlists from './components/playlists.js';
import PlaylistData from './playlist-data';

class App extends Component {
  constructor() {
    super();

    this.state = {
      playlists: PlaylistData,
      currentPlaylist: 1,
    }

    this.increaseCurrentPlaylist = this.increaseCurrentPlaylist.bind(this);
  }

  increaseCurrentPlaylist(key) {
    if (key && key > 0) {
      this.setState({ currentPlaylist: key });
    }
  }

  render() {
    const playlistCount = Object.keys(this.state.playlists).length;
    const currentPlaylistNum = this.state.currentPlaylist;
    const playlistPrefix = (this.state.currentPlaylist < 10)?  0 : null;

    return (
      <div className="App">
        <h1 className="title">Gil's Run Playlists</h1>
        <div className="count">{this.state.currentPlaylist} of {playlistCount}</div>
        <div className="playlist__number">
            <h2><span>n</span>{playlistPrefix}{currentPlaylistNum}</h2>
        </div>
        <Playlists data={this.state.playlists} increaseCurrentPlaylist={this.increaseCurrentPlaylist} />
      </div>
    );
  }
}

export default App;
