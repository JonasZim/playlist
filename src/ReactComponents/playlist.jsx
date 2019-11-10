import React from 'react';

const Song = require('./song').default;
const NameForm = require('./formForSongCreation').default;

export default class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      songList: [],
    };
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
    });
  }

  handleDelete(id) {
    const lists = this.state.songList.filter(list => {
      return list.props.id !== id;
    });
    this.setState({ songList: lists });
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
