import React, { Component } from 'react';
import { connect } from 'react-redux';

import EntryContainer from './entry-container';
import InfoContainer from './info-container';
import StatusContainer from './status-container';
import MenuContainer from './menu-container';
import FormContainer from './form-container';

import ModalAuthContainer from './modal-auth-container';

import { fetchAuth } from '../redux/auth/actions';
import { fetchInitialEntry } from '../redux/entry/actions';
import { fetchInitialStatus } from '../redux/status/actions';
import {
  VIEW_FORM,
  VIEW_FRONTPAGE
} from '../redux/display/constants';

const MainContentInner = ({ view }) => {
  switch (view) {
    case VIEW_FORM:
      return (
        <React.Fragment>
          <FormContainer/>
          <EntryContainer/>
        </React.Fragment>
      );
    case VIEW_FRONTPAGE:
    default:
      return (
        <React.Fragment>
          <StatusContainer/>
          <InfoContainer/>
          <EntryContainer/>
        </React.Fragment>
      );
  }
};

class MainContainer extends Component {

  componentDidMount() {
    this.props.fetchAuth();
    this.props.fetchInitialStatus();
    this.props.fetchInitialEntry();
  }

  render() {

    const {
      view,
      showModalAuth
    } = this.props;

    return (
      <div>
        {showModalAuth && <ModalAuthContainer />}
        <MenuContainer />
        <MainContentInner view={view} />
      </div>
    );
  }
}

const mapStateToProps = ({ display, auth }) => ({
  view: display.view,
  showModalAuth: auth.showModalAuth,
});

const mapDispatchToProps = {
  fetchAuth,
  fetchInitialStatus,
  fetchInitialEntry,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
