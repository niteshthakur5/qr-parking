import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import DroppLogo from '../../assets/images/dropp_logo.png';
import { Grid, Image } from 'semantic-ui-react';
import queryString from 'querystring';

class PaymentSuccess extends Component {
  constructor(props) {
    super(props);

    this.parseQueryParams = this.parseQueryParams.bind(this);
    this.getP2PDetails = this.getP2PDetails.bind(this);
    this.getResponseData = this.getResponseData.bind(this);
    this.getRequestData = this.getRequestData.bind(this);
  }

  pageData = {
    'pourli': {
      merchantName: 'POURLI',
      amount: '0.10',
      merchantAccount: '0.0.118282',
      type: 'WATER',
      thumbnail: '',
      description: 'Your purchase of $ 0.10 for a water refill is confirmed.',
      paymentDesc: 'Water Refill'
    },
    'cityPedal': {
      merchantName: 'CITY PEDAL',
      amount: '2.00',
      merchantAccount: '0.0.118375',
      type: 'BICYCLE',
      thumbnail: '',
      description: 'Your purchase of $ 2.00 for a one-hour bike rental is confirmed.',
      paymentDesc: 'One-hour Bike Rental'
    },
    'quickPark': {
      merchantName: 'QUICKPARK',
      amount: '0.50',
      merchantAccount: '0.0.118378',
      type: 'PARKING',
      thumbnail: '',
      description: 'Your payment of $ 0.50 for 15 minutes at meter ABZ1034 is confirmed.',
      expiryText: 'Your time ends at 11.37am.',
      paymentDesc: 'Metered Parking (New York - ABZ1034)'
    }
  };

  parseQueryParams = (queryparams) => {
    if (!queryparams) {
      return {};
    }
    queryparams = queryparams.replace('?', '');
    return queryString.parse(queryparams);
  };

  getP2PDetails = () => {
    const params = this.parseQueryParams(this.props.location.search);
    return params.p2p;
  };

  getResponseData = () => {
    const params = this.parseQueryParams(this.props.location.search);
    return params.Response;
  };

  getRequestData = () => {
    const params = this.parseQueryParams(this.props.location.search);
    return params.getRequest;
  };

	componentDidMount() {
  }

	componentDidUpdate(prevProps) {
  }

	render() {
    const {merchantName} = this.props.match.params;
    const activeMerchant = this.pageData[merchantName];
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <div style={{width: "400px", margin: "30px auto", border: "1px solid #000"}}>
              <div style={{width: "100px", padding: "10px"}}>
                <Image src={DroppLogo} />
              </div>

              <div style={{padding: "30px 50px"}}>
                <div style={{fontSize: "20px", paddingBottom: "30px"}}>{activeMerchant.merchantName}</div>
                <div style={{fontSize: "16px", lineHeight: "20px", paddingBottom: "15px"}}>{activeMerchant.description}</div>
                <div style={{fontSize: "16px", lineHeight: "20px", paddingBottom: "15px"}}>{activeMerchant.expiryText}</div>
              </div>
            </div>
            <div style={{width: "400px", margin: "30px auto"}}>
              <div>
                <div>P2P Data: {this.getP2PDetails()}</div>
                <div>Merchant: {activeMerchant.merchantName}</div>
                <div>Logo: TBD</div>
                <div>Amount: $ {activeMerchant.amount}</div>
                <div>Description: {activeMerchant.paymentDesc}</div>
                <div>Response Data: {this.getResponseData()}</div>
                <div>Request Data: {this.getRequestData()}</div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
	}
}

export default withRouter(PaymentSuccess);
