import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Field, FieldArray } from 'redux-form';

import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';
import TextField from '@folio/stripes-components/lib/TextField';
import TextArea from '@folio/stripes-components/lib/TextArea';
import Select from '@folio/stripes-components/lib/Select';

import LanguageList from '../../Utils/Languages';
import css from '../ContactInfoFormGroup.css';
import { Required } from '../../Utils/Validate';

class AddressInfo extends Component {
  static propTypes = {
    dropdown_currencies: PropTypes.array,
    dropdown_categories: PropTypes.array,
    dropdown_contact_categories: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      selectLanguage: LanguageList
    }
    this.renderSubAddress = this.renderSubAddress.bind(this);
  }

  render() {
    const { fields, meta : { error } } = this.props;
    return (
      <Row>
        <Col xs={6}>
          {fields.length === 0 &&
            <div><em>- Please add address info -</em></div>
          }
          {fields.length !== 0 &&
            <h6>Address Info</h6>
          }
        </Col>
        <Col xs={12}>
          {fields.map(this.renderSubAddress)}
        </Col>
        <Col xs={12} style={{ paddingTop: '10px'}}>
          <Button onClick={() => fields.push({})}>+ Add Address</Button>
        </Col>
      </Row>
    )
  }
  
  renderSubAddress = (elem, index, fields) => {
    return (
      <Row key={index} className={css.panels}>
        <br />
        <Col xs={12} md={3}>
          <Field label="Address 1" name={`${elem}.address.addressLine1`} id={`${elem}.address.addressLine1`} component={TextField} fullWidth />
        </Col>
          <Col xs={12} md={3}>
          <Field label="Address 2" name={`${elem}.address.addressLine2`} id={`${elem}.address.addressLine2`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="City" name={`${elem}.address.city`} id={`${elem}.address.city`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Region" name={`${elem}.address.stateRegion`} id={`${elem}.address.stateRegion`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Postal Code" name={`${elem}.address.zipCode`} id={`${elem}.address.zipCode`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Country" name={`${elem}.address.country`} id={`${elem}.address.country`} validate={[Required]} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Default Language" name={`${elem}.language`} id={`${elem}.language`} component={Select} fullWidth dataOptions={this.state.selectLanguage} />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Categories" name={`${elem}.categories`} id={`${elem}.categories`} component={Select} dataOptions={this.props.dropdown_categories} style={{ height: '80px' }} fullWidth multiple />
        </Col>
        <Col xs={12} md={3} mdOffset={9} style={{ textAlign: 'right' }}>
          <Button onClick={() => fields.remove(index)} buttonStyle="danger"> 
            Remove
          </Button>
        </Col>
        <br />
      </Row>
    );
  }
}

export default AddressInfo;