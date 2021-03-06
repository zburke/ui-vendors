import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Field, FieldArray } from 'redux-form';
import uuid from 'uuid';

import Route from 'react-router-dom/Route';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import transitionToParams from '@folio/stripes-components/util/transitionToParams';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import Button from '@folio/stripes-components/lib/Button';

import LanguageList from "../Utils/Languages";
import css from "./AccountsView.css";

class AccountsView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    parentMutator: PropTypes.object.isRequired,
    ParentResources: PropTypes.shape({
      vendorCategory: PropTypes.object,
      vendorContactCategory: PropTypes.object,
      dropdown: PropTypes.object.isRequired,
    })
  }

  constructor(props) {
    super(props);
    this.getAccounts = this.getAccounts.bind(this);
  }

  render() {
    const { initialValues } = this.props;
    const dataVal = initialValues.accounts.length >= 1 ? initialValues.accounts : false;
    if (dataVal) {
      return (
        <div style={{ width: '100%' }} className={css.horizontalLine}>
          {dataVal.map(this.getAccounts)}
        </div>
      );
    } else {
      return (
        <div>
          <p>-- No accounts available --</p>
        </div>
      )
    }
  }

  getAccounts(val, key) {
    const rowCount = (this.props.initialValues.accounts.length - 1) !== key ? true : false;
    return (
      <Row key={key}>
        <Col xs={3}>
          <KeyValue label="Name" value={_.get(val, 'name')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Account Number" value={_.get(val, 'account_no', '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Description" value={_.get(val, 'description', '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Acct. payable sys. no." value={_.get(val, 'app_system_no', '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Payment  Method" value={_.get(val, 'payment_method', '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Account Status" value={_.get(val, 'account_status', '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="contact_info" value={_.get(val, 'contact_info', '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="library_code" value={_.get(val, 'library_code', '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="library_edi_code" value={_.get(val, 'library_edi_code', '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="notes" value={_.get(val, 'notes', '')} />
        </Col>
        {rowCount &&
          <div style={{ width: '100%' }}>
            <hr />
          </div>
        }
      </Row>
    )
  }
}

export default AccountsView;