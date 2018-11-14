import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';

import { formatDonations } from "../../utilities";
import { DECIMALS_TO_KEEP } from "../../constants";

class StatusContainer extends Component {

  render() {

    const {
      entryFetchFinished,
      entryFetchFailed,

      statusFetchFinished,
      statusFetchFailed,

      currentChallenge
    } = this.props;

    if (entryFetchFinished && statusFetchFinished && !entryFetchFailed && !statusFetchFailed) {

      const {
        distance_current,
        distance_remaining,
        donations_remaining
      } = currentChallenge;

      return (
        <Container className='status-container top-container'>
          <div className="status-component">
            <Header as='h2'>Money to donate</Header>
            <Header
              as='h1'
              className={`donations__${donations_remaining > 0 ? 'bad': 'good'}`}
            >{`${formatDonations(donations_remaining)} NOK`}
            </Header>
            <Header as='h4'>{`${distance_current.toFixed(DECIMALS_TO_KEEP)} km crawled`}</Header>
            <Header as='h4'>{`${distance_remaining.toFixed(DECIMALS_TO_KEEP)} km remaining`}</Header>
          </div>
        </Container>
      );
    }

    return null;
  }
}

const mapStateToProps = ({ entry, status, display }) => ({
  entryFetchFinished: entry.fetchFinished,
  entryFetchFailed: entry.fetchFailed,

  statusFetchFinished: status.fetchFinished,
  statusFetchFailed: status.fetchFailed,

  currentChallenge: display.currentChallenge,
});

export default connect(mapStateToProps)(StatusContainer);
