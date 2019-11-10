import React from 'react';

const PlaylistContainer = require('./playlistContainer').default;

export default class Page extends React.Component {
  renderHeader() {
    return <h1>{this.props.name}</h1>;
  }

  renderContainerPlaylist() {
    return <PlaylistContainer />;
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderContainerPlaylist()}
      </div>
    );
  }

}
