import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/pages/Home';
import PaymentSuccess from './components/pages/PaymentSuccess';
import PaymentError from './components/pages/PaymentError';
import Payment from './components/pages/Payment';

const Routes = () => (
	<Switch>
		<Route path="/" exact render={() => <Redirect to="/home" />} />
		<Route path="/home" exact component={Home} />
		<Route path="/payments/:merchantName/p2p" exact component={Payment} />
		<Route path="/payments/:merchantName/success" exact component={PaymentSuccess} />
		<Route path="/payments/error" exact component={PaymentError} />
	</Switch>
);

export default Routes;
