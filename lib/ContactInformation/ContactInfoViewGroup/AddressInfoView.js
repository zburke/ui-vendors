import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import uuid from 'uuid';

import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import KeyValue from "@folio/stripes-components/lib/KeyValue";
import AddressView from '@folio/stripes-components/lib/structures/AddressFieldGroup/AddressView';
import css from "../ContactInformationView.css";

class ContactInformationView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    dropdown_categories: PropTypes.array,
    parseCategories: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.getAddress = this.getAddress.bind(this);
  }

  render() {
    const { dataVal } = this.props;
    return (
      <Col xs={12} className={css.rowHeader}>
        <h4>Address</h4>
        {dataVal.map(this.getAddress)}
      </Col>
    );
  }

  getAddress(val, key) {
    const rowCount = (this.props.dataVal.length - 1) !== key ? true : false;
    const categories = val.categories && this.props.dropdown_categories ? this.props.parseCategories(val.categories, this.props.dropdown_categories) : null;
    const address = `${_.get(val, 'address.city', '')}  ${_.get(val, 'address.stateRegion', '')} ${_.get(val, 'address.country', '')} ${_.get(val, 'address.zipCode', '')}`;

    return (
      <Row key={key}>
        <Col xs={5}>
          <KeyValue label="Address" value={address} />
        </Col>
        <Col xs={4}>
          <KeyValue label="Categories" value={categories} />
        </Col>
        <Col xs={3}>
          <KeyValue label="San Code" value={_.get(val, 'san_code', '')} />
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

export default ContactInformationView;