import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

import StatusInnerContainer from './inner/status-container-inner';

class StatusContainer extends Component {

  render() {

    if (!this.props.fetchFinished) {
      return null;
    }

    return (
      <Container className='status-container top-container'>
        <StatusInnerContainer />
      </Container>
    );
  }
}

const mapStateToProps = ({ status }) => ({
  fetchFinished: status.fetchFinished
});

export default connect(mapStateToProps)(StatusContainer);
