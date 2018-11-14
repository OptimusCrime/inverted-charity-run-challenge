import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';

import { formatEntryDate } from '../../utilities';

class EntryContainer extends Component {

  render() {

    const {
      entryFetchFinished,
      statusFetchFinished,

      entryFetchFailed,
      statusFetchFailed,

      challenges,
      currentChallenge
    } = this.props;

    if (entryFetchFinished && statusFetchFinished && !entryFetchFailed && !statusFetchFailed) {
      const entries = challenges.find(challenge => challenge.identifier === currentChallenge.identifier).entries;

      return (
        <Segment className='entry-container'>
          <div className='entries'>
            {entries.map(entry => (
              <div key={entry.id} className='entry'>
                <strong>{formatEntryDate(entry.added)}</strong>
                <p>{entry.comment || <i>No comment</i>}</p>
              </div>
            ))}
          </div>
        </Segment>
      );
    }

    return null;
  }
}

const mapStateToProps = ({ entry, status, display }) => ({
  entryFetchFinished: entry.fetchFinished,
  statusFetchFinished: status.fetchFinished,

  entryFetchFailed: entry.fetchFailed,
  statusFetchFailed: status.fetchFailed,

  challenges: entry.entries,
  currentChallenge: display.currentChallenge
});

export default connect(mapStateToProps)(EntryContainer);
