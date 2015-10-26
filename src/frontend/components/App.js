import React from 'react';
import Relay from 'react-relay';
import GroupCallSection from './GroupCallSection';
import Baobab from 'baobab';
import Dashboard from './Dashboard';

class App extends React.Component {
  state = {
    tree: new Baobab({})
  }

  componentDidMount() {
    this.state.tree.on('update', (eventData) => {
      this.forceUpdate();
    })
  }

  render() {
    return (
      <Dashboard>
        <GroupCallSection viewer={this.props.viewer} state={this.state.tree.select('groupCallSection')} />
      </Dashboard>
    )
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        ${GroupCallSection.getFragment('viewer')}
      }
    `
  }
})
