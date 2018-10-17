import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Icon, Menu, Dropdown } from 'semantic-ui-react';

import {
  changeCurrentChallenge,
  toggleDisplayModalAuth,
  toggleDisplayModalEntry,
  toggleShowGraph
} from '../../redux/display/actions';
import { fetchUpdatedStatus } from '../../redux/status/actions';
import { fetchUpdatedEntry } from '../../redux/entry/actions';

class MenuContainer extends Component {

  handleRefreshPage() {
    this.props.fetchUpdatedStatus();
    this.props.fetchUpdatedEntry();
  }

  render() {

    const {
      authFetchFinished,
      authFetchFailed,

      statusFetchFinished,
      statusFetchFailed,

      loggedIn,
      showGraph,
      challenges,
      currentChallenge,
    } = this.props;

    const numberOfChallenges = challenges.length;

    // .reverse() is mutating the original list
    const challengesList = [...challenges].reverse();

    return (
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item header className='app-name'>180 days challenge</Menu.Item>
          {authFetchFinished && statusFetchFinished && !authFetchFailed && !statusFetchFailed &&
            <React.Fragment>
              <Dropdown
                item
                icon='cog'
                simple
                className='right'
              >
                <Dropdown.Menu>
                  {challengesList.map((challenge, index) => (
                    <Dropdown.Item
                      onClick={() => {
                        this.props.changeCurrentChallenge(challenge.identifier, challenges);

                        return true;
                      }}
                      key={index}
                    >
                      {challenge.identifier === currentChallenge.identifier ?
                        <strong>
                          {`Challenge #${numberOfChallenges - index}`}
                        </strong> :
                        <span>
                          {`Challenge #${numberOfChallenges - index}`}
                        </span>
                      }
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <Menu.Item
                icon={true}
                onClick={this.props.toggleShowGraph}
              >
                {showGraph ? <Icon name='list' /> : <Icon name='chart line' />}
              </Menu.Item>
              <React.Fragment>
                {loggedIn ?
                  <React.Fragment>
                    {currentChallenge.progress.active &&
                      <Menu.Item
                        icon={true}
                        onClick={this.props.toggleDisplayModalEntry}
                      >
                        <Icon name='plus' />
                      </Menu.Item>
                    }
                  </React.Fragment> :
                  <Menu.Item
                    icon={true}
                    onClick={this.props.toggleDisplayModalAuth}
                  >
                    <Icon name='lock' />
                  </Menu.Item>
                }
              </React.Fragment>
            </React.Fragment>
          }
          <Menu.Item
            icon={true}
            onClick={this.handleRefreshPage}
            className={`menu-refresh ${authFetchFinished && statusFetchFinished && !authFetchFailed && !statusFetchFailed ? '': 'right'}`}
          >
            <Icon name='refresh' />
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}

const mapStateToProps = ({ auth, status, display }) => ({
  authFetchFinished: auth.fetchFinished,
  authFetchFailed: auth.fetchFailed,

  statusFetchFinished: status.fetchFinished,
  statusFetchFailed: status.fetchFailed,

  loggedIn: auth.loggedIn,
  showGraph: display.showGraph,
  currentChallenge: display.currentChallenge,
  challenges: status.statuses,
});

const mapDispatchToProps = {
  toggleDisplayModalAuth,
  toggleDisplayModalEntry,
  fetchUpdatedStatus,
  fetchUpdatedEntry,
  toggleShowGraph,
  changeCurrentChallenge
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
