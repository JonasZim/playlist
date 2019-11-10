import React from 'react';


const Playlist = require('./playlist').default;

export default class PlaylistContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
      numberOfP: 0,
    };
  }

  renderInput() {
    return (
      <input onKeyPress={this.keyPressed.bind(this)}
             value={this.state.input}
      />
    );
  }

  handleDelete(id) {
    const lists = this.state.playlists.filter(list => {
      return list.props.id !== id;
    });
    this.setState({ playlists: lists });
  }

  uniquePermittedName(name) {
    if (name === '') {
      return false;
    }
    return !this.state.playlists.find(playlist => playlist.props.name === name);
  }

  keyPressed(event) {
    if (event.key === 'Enter' && this.uniquePermittedName(event.target.value)) {
      this.addNewPlaylist(event.target.value);
      event.target.value = '';
    }
  }

  addNewPlaylist(PName) {
    const state = this.state;

    this.setState({
      playlists: state.playlists.concat(
        <Playlist
          name={PName}
          key={state.numberOfP}
          id={state.numberOfP}
          onDelete={this.handleDelete.bind(this)}
        />),
      numberOfP: state.numberOfP + 1,
    });
  }

  renderPlaylist() {
    return this.state.playlists;
  }

  render() {
    return (
      <div>
        <div>
          {this.renderInput()}
        </div>
        <div className="playlistContainer">
          {this.renderPlaylist()}
        </div>
      </div>
    );
  }
}
