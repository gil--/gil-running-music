import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import Waypoint from 'react-waypoint';

class Playlist extends Component {
  constructor() {
    super();

    this.state = {
      showSpotifyIframe: false
    }

    this._handleWaypointEnter = this._handleWaypointEnter.bind(this);
    this._handleWaypointLeave = this._handleWaypointLeave.bind(this);
    this.onClickPlay = this.onClickPlay.bind(this);
    this.onClickClose = this.onClickClose.bind(this);
  }

  iframe() {
    return {
      __html: '<iframe src="https://open.spotify.com/embed/user/intradox/playlist/' + this.props.playlistId + '" width="300" height="380" frameborder="0" />'
    }
  }

  isPlaylistExplicit() {
    return this.props.explicit ? <span className="explicit">Explicit</span> : null;
  }

  tags(tags) {
    if (Object.keys(tags).length > 0 && tags.constructor === Object) {
      return Object.keys(tags).map(tag =>
        <li key={tag}>{tags[tag].title}</li>);
    }
  }

  onClickPlay() {
    this.setState({ showSpotifyIframe: true });
    document.documentElement.style.setProperty(`--showDecorations`, 0);
    document.documentElement.style.setProperty(`--backgroundBlur`, '15px');
    document.body.classList.add('js-no-scroll');
  }

  onClickClose() {
    this.setState({ showSpotifyIframe: false });
    document.documentElement.style.setProperty(`--showDecorations`, 1);
    document.documentElement.style.setProperty(`--backgroundBlur`, 0);
    document.body.classList.remove('js-no-scroll');
  }

  _handleWaypointEnter() {
    document.documentElement.style.setProperty(`--keyColor`, this.props.keyColor);
    this.props.increaseCurrentPlaylist(parseInt(this.props.number, 0) + 1);
    console.log(`hello ${this.props.title}`);
  }

  _handleWaypointLeave() {
    console.log(`good bye ${this.props.title}`);
  }

  render() {
    const explicitFlag = this.isPlaylistExplicit();
    const tags = this.tags(this.props.tags);
    const bannerStyle = {
      backgroundColor: this.props.keyColor,
    };

    const spotifyIframe = this.state.showSpotifyIframe? (
      <div className="playlist__embed">
        <button type="button" onClick={this.onClickClose}>
          <ReactSVG
            path="/svg/close.svg"
            className="icon"
          />
        </button>

        <div dangerouslySetInnerHTML={ this.iframe() } />
      </div>
    ) : null;

    return (
      <section id={'playlist-' + this.props.number} className="playlist">
          <Waypoint onEnter={this._handleWaypointEnter} onLeave={this._handleWaypointLeave}>
            <button type="button" className="playlist__play" onClick={this.onClickPlay}>
            <ReactSVG
              path="/svg/play.svg"
              className="icon"
            />
            </button>
          </Waypoint>


          <div className="playlist__title">
            <h3>{this.props.title} {explicitFlag}</h3>
          </div>

          <ul className="playlist__tags">{tags}</ul>

          <div className="playlist__stats">
            <ul>
               <li>
                 <span>{this.props.songsCount} songs</span>
                 <ReactSVG
                   path="/svg/note.svg"
                   className="icon"
                 />
               </li>

               <li>
                 <span>{this.props.duration} minutes</span>
                 <ReactSVG
                   path="/svg/clock.svg"
                   className="icon"
                 />
               </li>
            </ul>
          </div>

          <div className="playlist__banner" style={bannerStyle}>
            <img alt="" src={this.props.image} />
          </div>

          {spotifyIframe}
        </section>
    );
  }
}

export default Playlist;
