import React from 'react';

export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      link: '',
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLinkChange = this.handleLinkChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleLinkChange(event) {
    this.setState({ link: event.target.value });
  }

  handleSubmit(event) {
    if (this.state.name && this.state.link) {
      this.props.playlist.addNewSong(this.state.name, this.state.link);
      this.setState({ name: '', link: '' });
    }
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">
          Name:
          <input type="text" value={this.state.name} onChange={this.handleNameChange} id="name" />
        </label>
        <label htmlFor="link">
          Link:
          <input type="text" value={this.state.link} onChange={this.handleLinkChange} id="link" />
        </label>
        <input type="submit" value="Add" />
      </form>
    );
  }
}
