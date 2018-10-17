import React, { Component } from 'react';
import { connect } from 'react-redux';

import EntryContainer from './entry/entry-container';
import InfoContainer from './info/info-container';
import StatusContainer from './status/status-container';
import GraphContainer from './graph/graph-container';
import MenuContainer from './menu/menu-container';

import ModalAuthContainer from './modal-auth/modal-auth-container';
import ModalEntryContainer from './modal-entry/modal-entry-container';

import { fetchAuth } from '../redux/auth/actions';
import { fetchInitialEntry } from '../redux/entry/actions';
import { fetchInitialStatus } from '../redux/status/actions';

class MainContainer extends Component {

  componentDidMount() {
    this.props.fetchAuth();
    this.props.fetchInitialStatus();
    this.props.fetchInitialEntry();
  }

  render() {

    const {
      showModalAuth,
      showModalEntry,
      showGraph
    } = this.props;

    return (
      <div>
        {showModalAuth && <ModalAuthContainer />}
        {showModalEntry && <ModalEntryContainer />}
        <MenuContainer />
        {showGraph ?
          <GraphContainer /> :
          <React.Fragment>
            <StatusContainer />
            <InfoContainer />
            <EntryContainer />
          </React.Fragment>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ display }) => ({
  showModalAuth: display.showModalAuth,
  showModalEntry: display.showModalEntry,
  showGraph: display.showGraph
});

const mapDispatchToProps = {
  fetchAuth,
  fetchInitialStatus,
  fetchInitialEntry,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
