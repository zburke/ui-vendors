import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Field, FieldArray } from 'redux-form';

import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';
import TextField from '@folio/stripes-components/lib/TextField';
import TextArea from '@folio/stripes-components/lib/TextArea';
import Select from '@folio/stripes-components/lib/Select';
import {BrowserRouter} from 'react-router-dom';

import { Required } from '../Utils/Validate';

class AccountsForm extends Component {
  static propTypes = {
    dropdown: PropTypes.shape({
      payment_method_dd: PropTypes.array.isRequired,
      status_dd: PropTypes.array.isRequired
    })
  }

  constructor(props) {
    super(props);
    this.renderForm = this.renderForm.bind(this);
    this.renderSubForm = this.renderSubForm.bind(this);
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <FieldArray label="Accounts" name="accounts" id="accounts" component={this.renderForm} />
          <br />
        </Col>
      </Row>
    );
  }

  renderForm = ({ fields }) => {
    return (
      <Row>
        <Col xs={12}>
          {fields.length === 0 &&
            <div><em>- Please add account -</em></div>
          }
          {fields.map(this.renderSubForm)}
        </Col>
        <Col xs={12} style={{ paddingTop: '10px'}}>
          <Button onClick={() => fields.push({})}>+ Add</Button>
        </Col>
      </Row>
    )
  }
  
  renderSubForm = (elem, index, fields) => {
    const { parentResources } = this.props;
    const payment_method_dd = (parentResources.dropdown || {}).payment_method_dd || [];
    const status_dd = (parentResources.dropdown || {}).status_dd || [];
    return (
      <Row key={index}>
        <Col xs={12} md={6}>
          <Row>
            <Col xs={12}>
              <Field label="name" name={`${elem}.name`} id={`${elem}.name`} validate={[Required]} component={TextField} fullWidth /> 
            </Col>
            <Col xs={12}>
              <Field label="Vendor Account Number" name={`${elem}.account_no`} id={`${elem}.account_no`} validate={[Required]} component={TextField} fullWidth />
            </Col>
            <Col xs={12}>
              <Field label="Description" name={`${elem}.description`} id={`${elem}.description`} component={TextField} fullWidth />
            </Col>
            <Col xs={12}>
              <Field label="Acct. Payable Sys. No" name={`${elem}.app_system_no`} id={`${elem}.app_system_no`} component={TextField} fullWidth />
            </Col>
            <Col xs={12}>
              <Field label="Payment Method" name={`${elem}.payment_method`} id={`${elem}.payment_method`} dataOptions={payment_method_dd} validate={[Required]} component={Select} fullWidth />
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={6}>
          <Row>
            <Col xs={12}>
              <Field label="Account Status" name={`${elem}.account_status`} id={`${elem}.account_status`} dataOptions={status_dd} validate={[Required]} component={Select} fullWidth />
            </Col>
            <Col xs={12}>
              <Field label="Contact Info" name={`${elem}.contact_info`} id={`${elem}.contact_info`} component={TextField} fullWidth />
            </Col>
            <Col xs={12}>
              <Field label="Library Code" name={`${elem}.library_code`} id={`${elem}.library_code`} validate={[Required]} component={TextField} fullWidth />
            </Col>
            <Col xs={12}>
              <Field label="Library EDI Code" name={`${elem}.library_edi_code`} id={`${elem}.library_edi_code`} validate={[Required]} component={TextField} fullWidth />
            </Col>
          </Row>
        </Col>
        <Col xs={12}>
          <Field label="notes" name={`${elem}.notes`} id={`${elem}.notes`} component={TextArea} fullWidth />
        </Col>
        <Col xs={12} style={{ textAlign: 'right' }}>
          <Button onClick={() => fields.remove(index)} buttonStyle="danger">
            Remove
          </Button>
        </Col>
      </Row>
    );
  }
}

export default AccountsForm;