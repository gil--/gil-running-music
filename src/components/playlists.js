import React, { Component } from 'react';
import Playlist from './playlist.js';

class Playlists extends Component {
  updateDOM() {
    // TODO
    // content which changes will be done here?

    // keyColor
    // playlist app state's currentPlaylist
    // blur/unblur banner image via CSS class
    // update playlist title
  }

  render() {
    const playlists = this.props.data;

    const playlistsList = (Object.keys(playlists).length > 0 && playlists.constructor === Object)?
      Object
        .keys(playlists)
        .map(key => <Playlist key={key} number={key} title={playlists[key].title} image={playlists[key].image} playlistId={playlists[key].spotifyKey} songsCount={playlists[key].songs} duration={playlists[key].duration} tags={playlists[key].tags} explicit={playlists[key].hasExplicit} keyColor={playlists[key].keyColor} increaseCurrentPlaylist={this.props.increaseCurrentPlaylist} />)
        : 'No playlists found';

    return (
      <div className="playlists">
        {playlistsList}
      </div>
    );
  }
}

export default Playlists;
