import React from 'react';
import { connect } from 'react-redux';
import { Icon, Menu } from 'semantic-ui-react';

import { toggleDisplayModalAuth as toggleDisplayModalAuthDispatch } from '../../redux/auth/actions';
import { changeView as changeViewDispatch } from '../../redux/display/actions';
import { VIEW_FORM, VIEW_FRONTPAGE } from "../../redux/display/constants";

const MenuSwitchViewContainer = ({ loggedIn, currentChallenge, toggleDisplayModalAuth, view, changeView }) => {

  if (!loggedIn) {
    return (
      <Menu.Item
        icon={true}
        onClick={toggleDisplayModalAuth}
      >
        <Icon name='lock' />
      </Menu.Item>
    );
  }

  if (!currentChallenge.active) {
    return null;
  }

  switch (view) {
    case VIEW_FORM:
      return (
        <Menu.Item
          icon={true}
          onClick={() => changeView(VIEW_FRONTPAGE)}
        >
          <Icon name='home' />
        </Menu.Item>
      );
    case VIEW_FRONTPAGE:
    default:
      return (
        <Menu.Item
          icon={true}
          onClick={() => changeView(VIEW_FORM)}
        >
          <Icon name='plus' />
        </Menu.Item>
      );
  }
};

const mapStateToProps = ({ auth, status, display }) => ({
  loggedIn: auth.loggedIn,
  currentChallenge: display.currentChallenge,
  view: display.view,
});

const mapDispatchToProps = {
  toggleDisplayModalAuth: toggleDisplayModalAuthDispatch,
  changeView: changeViewDispatch,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuSwitchViewContainer);
