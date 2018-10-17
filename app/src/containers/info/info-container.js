import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';

import { InfoRowComponent } from '../../components/info-row/info-row-component';

class InfoContainer extends Component {

  render() {

    const {
      entryFetchFinished,
      statusFetchFinished,

      entryFetchFailed,
      statusFetchFailed,

      currentChallenge,
    } = this.props;

    if (entryFetchFinished && statusFetchFinished && !entryFetchFailed && !statusFetchFailed) {

      const {
        progress,
        date_start,
        date_end,
        entries,
        target,
      } = currentChallenge;

      const {
        active,
        days_since_start,
        days_remaining,
        schedule_limit,
      } = progress;

      if (active) {
        return (
          <Segment inverted className='info-container'>
            <InfoRowComponent
              label='Days since start'
              text={days_since_start}
            />
            <InfoRowComponent
              label='Days remaining'
              text={days_remaining}
            />
            <InfoRowComponent
              label='Entries'
              text={entries}
            />
            <InfoRowComponent
              label='Target'
              text={target}
            />
            <InfoRowComponent
              label='Progress'
              text={schedule_limit.toFixed(2)}
            />
            <InfoRowComponent
              label='Challenge started'
              text={date_start}
            />
            <InfoRowComponent
              label='Challenge end'
              text={date_end}
            />
          </Segment>
        );
      }

      return (
        <Segment inverted className='info-container'>
          <InfoRowComponent
            label='Entries'
            text={entries}
          />
          <InfoRowComponent
            label='Target'
            text={target}
          />
          <InfoRowComponent
            label='Challenge started'
            text={date_start}
          />
          <InfoRowComponent
            label='Challenge end'
            text={date_end}
          />
        </Segment>
      );
    }

    return null;
  }
}

const mapStateToProps = ({ status, entry, display }) => ({
  entryFetchFinished: entry.fetchFinished,
  statusFetchFinished: status.fetchFinished,

  entryFetchFailed: entry.fetchFailed,
  statusFetchFailed: status.fetchFailed,

  currentChallenge: display.currentChallenge,
});

export default connect(mapStateToProps)(InfoContainer);
