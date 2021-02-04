import React, { Component } from 'react';
import ProcessPayment from './ProcessPayment';
import { withRouter } from 'react-router-dom';
class Payment extends Component {
  pageData = {
    'pourli': {
      merchantName: 'POURLI',
      amount: '0.10',
      merchantAccount: '0.0.118282',
      signingKey: '302e020100300506032b657004220420a22c50f322417681adb62d6a84a2a9070a80d276356a56f67a22ff0ca5b5d3ff',
      apiKey: '52400f9c3aa126eab9ed894c574d35e6769e91c2',
      type: 'WATER',
      thumbnail: '',
      description: 'Your purchase of $ 0.10 for a water refill is confirmed.',
      paymentDesc: 'Water Refill'
    },
    'cityPedal': {
      merchantName: 'CITY PEDAL',
      amount: '2.00',
      merchantAccount: '0.0.118375',
      signingKey: '302e020100300506032b657004220420030f5e77fdd7b605dfc905ca454ac91cf9b50163f776e0717e6bacaee6bce243',
      apiKey: 'b656d1b165f718406272dac0b9b68332b5242d5a',
      type: 'BICYCLE',
      thumbnail: '',
      description: 'Your purchase of $ 2.00 for a one-hour bike rental is confirmed.',
      paymentDesc: 'One-hour Bike Rental'
    },
    'quickPark': {
      merchantName: 'QUICKPARK',
      amount: '0.50',
      merchantAccount: '0.0.118378',
      signingKey: '302e020100300506032b657004220420753042d72b967ae7f78dba078080ad42b8ebc629a551510ab7e319d01718ae70',
      apiKey: 'dc3a4ebfd7b5a3fad4910c649245f64512320dd9',
      type: 'PARKING',
      thumbnail: '',
      description: 'Your payment of $ 0.50 for 15 minutes at meter ABZ1034 is confirmed.',
      expiryText: 'Your time ends at 11.37am.',
      paymentDesc: 'Metered Parking (New York - ABZ1034)'
    }
  };



	componentDidMount() {
  }

	componentDidUpdate(prevProps) {
  }

	render() {
    const {merchantName} = this.props.match.params;
    const activeMerchant = this.pageData[merchantName];
    return (
      <ProcessPayment activeMerchant={activeMerchant} merchantName={merchantName} {...this.props} />
    );
	}
}

export default withRouter(Payment);
