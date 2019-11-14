import React from 'react';

const Song = require('./song').default;
const NameForm = require('./formForSongCreation').default;
const dbCon = require('../mongoDB');

export default class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      songList: [],
    };
    dbCon.createCrapped(this.props.name);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    dbCon.getSongsForPlaylist(this.props.name).then(songs => {
      songs.forEach(song => {
        this.loadSong(song[0].name, song[0].link);
      });
    });
  }

  getSongs() {
    return this.state.songList.map(song => {
      return { name: song.props.name, link: song.props.link };
    });
  }

  loadSong(name, link) {
    const state = this.state.songList;

    this.setState({
      songList: state.concat(
        <Song
          name={name}
          link={link}
          key={state.length + 1}
          id={state.length + 1}
          onDelete={this.handleDelete.bind(this)}
        />),
    });
  }

  addNewSong(name, link) {
    const state = this.state.songList;

    this.setState({
      songList: state.concat(
        <Song
          name={name}
          link={link}
          key={state.length + 1}
          id={state.length + 1}
          onDelete={this.handleDelete.bind(this)}
        />),
    }, () => {
      console.log(Object.assign({}, this.getSongs()));
      dbCon.savePlaylist(this.props.name, Object.assign({}, this.getSongs()));
    });
  }

  handleDelete(id) {
    const lists = this.state.songList.filter(list => {
      return list.props.id !== id;
    });
    this.setState({ songList: lists });

    dbCon.savePlaylist(this.props.name, this.getSongs());
  }

  render() {
    return (
      <div className="container">
        <div className="center-col">
          <span>{this.props.name}</span>
          <NameForm playlist={this} />
          <button
            onClick={() => this.props.onDelete(this.props.id)}
            className="btn btn-lg btn-outline-danger ml-4"
          >
            Delete
          </button>
          {this.state.songList}
        </div>
      </div>
    );
  }
}
