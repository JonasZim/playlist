import React from 'react';

const Page = require('./ReactComponents/page').default;

export default class App extends React.Component {
  render() {
    return <Page name={'Maximus Decimus Meridius'} />;
  }
}

