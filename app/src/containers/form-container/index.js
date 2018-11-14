import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Input } from 'semantic-ui-react';

import { FormRow } from "../../components/form/row";

class FormContainer extends Component {

  render() {

    const {
      entryFetchFinished,
      statusFetchFinished,

      entryFetchFailed,
      statusFetchFailed,
    } = this.props;

    if (entryFetchFinished && statusFetchFinished && !entryFetchFailed && !statusFetchFailed) {

      return (
        <div className='form-segment'>
          <Container className='top-container form-container'>
            <Header as='h2'>Add new entry</Header>
            <div className='form-container__wrapper'>
              <FormRow
                label='Distance'
                inputClass='form-container__distance'
                input={
                  <Input
                    label={{ basic: true, content: 'km' }}
                    labelPosition='right'
                    placeholder=''
                  />
                }
              />
              <FormRow
                label='Duration'
                input={
                  <div className='form-container__duration'>
                    <Input
                      label={{ basic: true, content: 'h' }}
                      labelPosition='right'
                    />
                    <Input
                      label={{ basic: true, content: 'm' }}
                      labelPosition='right'
                    />
                  </div>
                }
              />
            </div>
          </Container>
        </div>
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

  currentChallenge: display.currentChallenge
});

export default connect(mapStateToProps)(FormContainer);
