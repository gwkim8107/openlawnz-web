import React from "react";
import { Link } from "react-router-dom";

import Search from "../components/Search.jsx";
import InfoCard from "../components/InfoCard.jsx";


class Login extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Search history={this.props.history} />
				<div className="home-wrapper">
					<InfoCard classModifier="info-card--large info-card--title info-card--column">
						<h1>Login</h1>
						<span>Quick and easy login!</span>
					</InfoCard>

				</div>
			</React.Fragment>
		);
	}
}

export default Login;
