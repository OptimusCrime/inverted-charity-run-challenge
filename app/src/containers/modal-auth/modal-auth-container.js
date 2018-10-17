import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Icon, Modal, Input } from 'semantic-ui-react';

import { toggleDisplayModalAuth, updateAuthValue } from '../../redux/display/actions';
import { updateAuth } from '../../redux/auth/actions';
import { ENTER_BUTTON } from '../../constants';


class ModalAuthContainer extends Component {

  handleKeyDown(event) {
    if (event.keyCode === ENTER_BUTTON) {
      return this.props.updateAuth(event.target.value);
    }
  }

  render() {

    const {
      authValue,
      updateStarted,
      updateFailed
    } = this.props;

    return (
      <Modal
        open={true}
        onClose={this.props.toggleDisplayModalAuth}
        size='small'
        className='modal-container'
      >
        <Header icon='lock' content='Authenticate' />
        <Modal.Content>
          <Input
            placeholder='My secret password'
            loading={updateStarted}
            value={authValue}
            onKeyUp={(e) => this.handleKeyDown(e)}
            onChange={(e) => this.props.updateAuthValue(e.target.value)}
            disabled={updateStarted}
          />
          {updateFailed && <p className='modal-incorrect-password'>Incorrect password. Try again.</p>}
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={this.props.toggleDisplayModalAuth} inverted>
            <Icon name='cancel' /> Cancel
          </Button>
          <Button color='green' onClick={() => this.props.updateAuth(authValue)} inverted>
            <Icon name='checkmark' /> Log in
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = ({ display, auth }) => ({
  authValue: display.authValue,
  updateStarted: auth.updateStarted,
  updateFailed: auth.updateFailed
});

const mapDispatchToProps = {
  toggleDisplayModalAuth,
  updateAuthValue,
  updateAuth
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAuthContainer);
