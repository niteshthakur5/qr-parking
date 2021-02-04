import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import queryString from 'querystring';

class PaymentError extends Component {
  constructor(props) {
    super(props);

    this.parseQueryParams = this.parseQueryParams.bind(this);
    this.getP2PDetails = this.getP2PDetails.bind(this);
    this.getResponseData = this.getResponseData.bind(this);
    this.getRequestData = this.getRequestData.bind(this);
  }

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
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <div>Payment Failed!</div>
            <div>P2P Data: {this.getP2PDetails()}</div>
            <div>Response Data: {this.getResponseData()}</div>
            <div>Request Data: {this.getRequestData()}</div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
	}
}

export default PaymentError;
