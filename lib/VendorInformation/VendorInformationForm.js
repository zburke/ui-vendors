import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Field, FieldArray } from 'redux-form';

import { Accordion } from '@folio/stripes-components/lib/Accordion';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';
import TextField from '@folio/stripes-components/lib/TextField';
import TextArea from '@folio/stripes-components/lib/TextArea';
import Select from '@folio/stripes-components/lib/Select';
import Checkbox from '@folio/stripes-components/lib/Checkbox';
import css from "./VendorInformationform.css";

class VendorInformationForm extends Component {
  static propTypes = {
    dropdown_currencies: PropTypes.array,
    dropdown_categories: PropTypes.array,
    dropdown_contact_categories: PropTypes.array,
    parentResources: PropTypes.shape({
      vendorCategory: PropTypes.object,
      vendorContactCategory: PropTypes.object,
      dropdown: PropTypes.object.isRequired
    }),
  }

  constructor(props) {
    super(props);
    this.state = {
      subSections: {
        taxSection: true,
      }
    }
  }
  
  render() {
    const { parentResources, dropdown_currencies } = this.props;
    const payment_method_dd = (parentResources.dropdown || {}).payment_method_dd || [];

    return (
      <Row className={css.vendorInfo}>
        <Col xs={12} md={6}>
          <Row>
            <Col xs={12}>
              <Field label="ERP Code" name='erp_code' id='erp_code' component={TextField} fullWidth />
            </Col>
            <Col xs={12}>
              <Field label="Payment Method" name='payment_method' id='payment_method' component={Select} dataOptions={payment_method_dd} fullWidth />
            </Col>
            <Col xs={12} className={css.vendorInfoCheckbox}>
              <Field label="Access Provider" name='access_provider' id='access_provider' component={Checkbox} marginBottom0={true}  />
            </Col>
            <Col xs={12} className={css.vendorInfoCheckbox}>
              <Field label="Governmental" name='governmental' id='governmental' component={Checkbox} marginBottom0={true}  />
            </Col>
            <Col xs={12} className={css.vendorInfoCheckbox}>
              <Field label="Licensor" name='licensor' id='licensor' component={Checkbox} marginBottom0={true} />
            </Col>
            <Col xs={12} className={css.vendorInfoCheckbox}>
              <Field label="Material Supplier" name='material_supplier' id='material_supplier' component={Checkbox}  />
            </Col>
            <Col xs={12}>
              <Field label="Vendor Currencies" name='vendor_currencies' id='vendor_currencies' component={Select} dataOptions={dropdown_currencies} style={{ height: '80px' }} fullWidth multiple />
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={6}>
          <Row>
            <Col xs={12}>
              <Field label="Claiming Interval" name='claiming_interval' id='claiming_interval' type="number" component={TextField} fullWidth />
            </Col>
            <Col xs={12}>
              <Field label="Discount Percent" name='discount_percent' id='discount_percent' component={TextField} fullWidth />
            </Col>
            <Col xs={12}>
              <Field label="Expected Activation Interval" name='expected_activation_interval' id='expected_activation_interval' type="number" component={TextField} fullWidth />
            </Col>
            <Col xs={12}>
              <Field label="Expected Invoice Interval" name='expected_invoice_interval' id='expected_invoice_interval' type="number" component={TextField} fullWidth />
            </Col>
            <Col xs={12}>
              <Field label="Renewal Activation Interval" name='renewal_activation_interval' id='renewal_activation_interval' type="number" component={TextField} fullWidth />
            </Col>
            <Col xs={12}>
              <Field label="Subscription Interval" name='subscription_interval' id='subscription_interval' type="number" component={TextField} fullWidth />
            </Col>
          </Row>
        </Col>
        <Col xs={12}>
          <Col xs={12}>
            <br />
            <Accordion label="Tax" id="taxSection" open={this.state.subSections['taxSection']}>
              <Row>
                <Col xs={12} md={4}>
                  <Field label="Tax ID" name='tax_id' id='tax_id' component={TextField} fullWidth />
                </Col>
                <Col xs={12} md={4}>
                  <Field label="Tax Percentage" name='tax_percentage' id='tax_percentage' type="number" component={TextField} fullWidth />
                </Col>
                <Col xs={12} md={4} style={{paddingTop: '20px'}}>
                  <Field label="Liable for VAT" name='liable_for_vat' id='liable_for_vat' component={Checkbox} inline={false} marginBottom0={true} />
                </Col>
              </Row>
            </Accordion>
          </Col>
        </Col>
      </Row>
    );
  }
}

export default VendorInformationForm;