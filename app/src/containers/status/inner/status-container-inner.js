import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';

import { RingComponent } from '../../../components/ring/ring-component';

class StatusInnerContainer extends Component {

  render() {
    const {
      fetchStarted,
      fetchFinished,
      fetchError,
      statuses,
      currentChallenge
    } = this.props;

    if (fetchStarted && !fetchFinished) {
      return (
        <div className="ui segment">
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
        </div>
      );
    }

    if (fetchError) {
      return <p>Error</p>;
    }

    const {
      entries,
      target,
    } = currentChallenge;

    const {
      on_schedule,
      schedule_limit,
      active,
      successful,
    } = currentChallenge.progress;

    if (active) {
      return (
        <div className={`status-component ${on_schedule ? 'status-component-good' : 'status-component-bad'}`}>
          <Header as='h1'>{on_schedule ? 'You are ahead!' : 'You are behind'}</Header>
          <RingComponent
            target={schedule_limit}
            entries={entries}
          />
        </div>
      );
    }

    return (
      <div className={`status-component ${successful ? 'status-component-good' : 'status-component-bad'}`}>
        <Header as='h1'>{successful ? 'The challenge was successful!' : 'The challenge was failed'}</Header>
        <RingComponent
          target={target}
          entries={entries}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ status, display }) => ({
  fetchStarted: status.fetchStarted,
  fetchFinished: status.fetchFinished,
  fetchError: status.fetchError,
  statuses: status.statuses,
  currentChallenge: display.currentChallenge,
});

export default connect(mapStateToProps)(StatusInnerContainer);
