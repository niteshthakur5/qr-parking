import React, { Component } from 'react';
import { Grid, Header, Icon, Image } from 'semantic-ui-react';
import MerchantDetail from './MerchantDetail.js';
import DroppLogo from '../../assets/images/dropp_logo.png';
import Pourli from '../../assets/images/WATER.png';
import CityPadel from '../../assets/images/BIKE.png';
import QuickPark from '../../assets/images/PARKING.png';
import '../../assets/stylesheets/home.css';
import { APP_BASE_URL } from '../../Constants';

class Home extends Component {
  pageData = [
    {
      merchantName: 'POURLI',
      amount: '0.10',
      merchantAccount: '0.0.118282',
      type: 'WATER',
      thumbnail: 'https://user-images.githubusercontent.com/9741482/107024088-932ba600-67cd-11eb-90db-375c31022846.png',
      description: 'Refill your water bottle',
      bgImage: `${Pourli}`,
      bgClass: 'blue',
      // url: 'http://localhost:3000/payments/pourli',
      url: `${APP_BASE_URL}/payments/pourli/p2p`

    },
    {
      merchantName: 'CITY PEDAL',
      amount: '2.00',
      merchantAccount: '0.0.118375',
      type: 'BIKE',
      thumbnail: 'https://user-images.githubusercontent.com/9741482/107024058-860eb700-67cd-11eb-9744-8bbbccf1d250.png',
      description: 'Rent me for an hour',
      bgImage: `${CityPadel}`,
      bgClass: 'yellow',
      // url: 'http://localhost:3000/payments/cityPedal'
      url: `${APP_BASE_URL}/payments/cityPedal/p2p`
    },
    {
      merchantName: 'QUICKPARK',
      amount: '0.50',
      merchantAccount: '0.0.118378',
      type: 'PARKING',
      thumbnail: 'https://user-images.githubusercontent.com/9741482/107024079-8f981f00-67cd-11eb-809f-54ae413e384c.png',
      description: 'Park here for 15 minutes',
      bgImage: `${QuickPark}`,
      bgClass: 'green',
      // url: 'http://localhost:3000/payments/quickpark'
      url: `${APP_BASE_URL}/payments/quickPark/p2p`
    }
  ];
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      activePage: this.pageData[0]
    };
    this.nextStep = this.nextStep.bind(this);
  }

  nextStep = (currentIndex, action) => {
    let nextIndex;
    if (action === 'left') {
      nextIndex = (currentIndex === 0) ? (this.pageData.length - 1) : (currentIndex - 1);
    } else if (action === 'right') {
      nextIndex = (currentIndex === (this.pageData.length - 1)) ? 0 : (currentIndex + 1);
    }
    this.setState({activeIndex: nextIndex, activePage: this.pageData[nextIndex]});
  };

	componentDidMount() {
  }

	componentDidUpdate(prevProps) {
  }

	render() {
    const {activeIndex, activePage} = this.state;
    return (
      <Grid padded stackable className="home-page">
        <Grid.Row>
          <Grid.Column computer={9} mobile={16}>
            <Grid.Row>
              <Grid.Column>
                <div className="dropp-logo">
                  <Image src={DroppLogo} />
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <div className="content-section">
                  <Header as="h1">
                    Test your DROPP wallet
                  </Header>
                  <div className="sub-heading">
                    Simple payments for little things and brief experiences
                  </div>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column computer={7} mobile={16}>
            <MerchantDetail info={activePage} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="controls-section">
          <Grid.Column>
            <div style={{textAlign: "center"}}>
              <Icon style={{cursor: "pointer"}} name="caret left" onClick={ () => {this.nextStep(activeIndex, 'left');}} />
              <Icon style={{cursor: "pointer"}} name="caret right" onClick={ () => {this.nextStep(activeIndex, 'right');}} />
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
	}
}

export default Home;
