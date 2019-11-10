import React from 'react';

export default class Song extends React.Component {

  render() {
    return (
      <div className="songContainer">
        SongName: {this.props.name}, Link: {this.props.link}
        <button
          onClick={() => this.props.onDelete(this.props.id)}
          className="btn btn-lg btn-outline-danger ml-4"
        >
          Delete
        </button>
      </div>
    );
  }
}
