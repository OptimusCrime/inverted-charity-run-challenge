import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

import { GraphComponent } from '../../components/graph/graph-component';

class GraphContainer extends Component {

  render() {

    const {
      statusFetched,
      entriesFetched,

      currentChallenge,
      challenges,
    } = this.props;

    if (!statusFetched || !entriesFetched) {
      return null;
    }

    const entries = challenges.find(c => c.identifier === currentChallenge.identifier).entries;

    return (
      <Container className='graph-container top-container'>
       <GraphComponent
         challenge={currentChallenge}
         entries={entries}
       />
      </Container>
    );
  }
}

const mapStateToProps = ({ status, entry, display }) => ({
  statusFetched: status.fetchFinished,
  entriesFetched: entry.fetchFinished,

  currentChallenge: display.currentChallenge,
  challenges: entry.entries,
});

export default connect(mapStateToProps)(GraphContainer);
