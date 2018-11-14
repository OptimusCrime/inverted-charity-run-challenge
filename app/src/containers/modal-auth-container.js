import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Icon, Modal, Input } from 'semantic-ui-react';

import {
  toggleDisplayModalAuth as toggleDisplayModalAuthDispatch,
} from '../redux/auth/actions';
import { login as loginDispatch } from '../redux/auth/actions';
import { ENTER_BUTTON } from '../constants';


class ModalAuthContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      input: ''
    };
  }

  handleKeyDown(event) {
    if (event.keyCode === ENTER_BUTTON) {
      return this.login();
    }
  }

  login() {
    this.props.login(this.state.input);
  }

  render() {

    const {
      updateStarted,
      updateFailed,

      toggleDisplayModalAuth,
      login
    } = this.props;

    return (
      <Modal
        open={true}
        onClose={toggleDisplayModalAuth}
        size='small'
        className='modal-container'
      >
        <Header icon='lock' content='Authenticate' />
        <Modal.Content>
          <Input
            placeholder='My secret password'
            loading={updateStarted}
            value={this.state.input}
            onKeyUp={e => this.handleKeyDown(e)}
            onChange={e => this.setState({
              input: e.target.value
            })}
            disabled={updateStarted}
          />
          {updateFailed && <p className='modal-incorrect-password'>Incorrect password. Try again.</p>}
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={toggleDisplayModalAuth} inverted>
            <Icon name='cancel' /> Cancel
          </Button>
          <Button color='green' onClick={this.login} inverted>
            <Icon name='checkmark' /> Log in
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = ({ display, auth }) => ({
  updateStarted: auth.updateStarted,
  updateFailed: auth.updateFailed
});

const mapDispatchToProps = {
  toggleDisplayModalAuth: toggleDisplayModalAuthDispatch,
  login: loginDispatch
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAuthContainer);
