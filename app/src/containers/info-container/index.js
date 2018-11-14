import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';

import { InfoRowComponent } from '../../components/info-row/info-row-component';
import {formatDonations} from "../../utilities";

class InfoContainer extends Component {

  render() {

    const {
      entryFetchFinished,
      entryFetchFailed,

      statusFetchFinished,
      statusFetchFailed,

      currentChallenge,
    } = this.props;

    if (entryFetchFinished && statusFetchFinished && !entryFetchFailed && !statusFetchFailed) {

      const {
        date_start,
        date_end,
        distance_target,
        active,
        days_since_start,
        days_remaining,
        donations_removed
      } = currentChallenge;

      return (
        <Segment inverted className='info-container'>
          {active &&
          <React.Fragment>
            <InfoRowComponent
              label='Days since start'
              text={days_since_start}
            />
            <InfoRowComponent
              label='Days remaining'
              text={days_remaining}
            />
          </React.Fragment>
          }
          <InfoRowComponent
            label='Target'
            text={`${distance_target} km`}
          />
          <InfoRowComponent
            label='Donations removed'
            text={`${formatDonations(donations_removed)} NOK`}
          />
          {!active &&
          <React.Fragment>
            <InfoRowComponent
              label='Challenge started'
              text={date_start}
            />
            <InfoRowComponent
              label='Challenge end'
              text={date_end}
            />
          </React.Fragment>
          }
        </Segment>
      );
    }

    return null;
  }
}

const mapStateToProps = ({ status, entry, display }) => ({
  entryFetchFinished: entry.fetchFinished,
  entryFetchFailed: entry.fetchFailed,

  statusFetchFinished: status.fetchFinished,
  statusFetchFailed: status.fetchFailed,

  currentChallenge: display.currentChallenge,
});

export default connect(mapStateToProps)(InfoContainer);
