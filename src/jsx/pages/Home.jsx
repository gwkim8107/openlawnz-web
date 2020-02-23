import React, { Component } from "react";
import SearchContainer from "../components/SearchContainer.jsx";
import Mission from "../components/Mission.jsx";
import InfoCard from "../components/InfoCard.jsx";
import InfoCardUnit from "../components/InfoCardUnit.jsx";
import ContactUs from "../components/ContactUs.jsx";
import News from "../components/News.jsx";

class Home extends Component {
	render() {
		return (
			<React.Fragment>
				<div className="highlighted-content">
					<h1 className="header-title">OpenLaw NZ is a new, free legal research platform for New Zealand.</h1>
					<SearchContainer history={this.props.history} />
					<InfoCard>
						<InfoCardUnit one="30,141" two="CASES" />
						<div className="border"></div>
						<InfoCardUnit one="25,208" two="CASE-TO-CASE RELATIONSHIPS" />
						<div className="border"></div>
						<InfoCardUnit one="346,395" two="CASE-TO-LEGISLATION RELATIONSHIPS" />
					</InfoCard>
				</div>
				<div className="home-wrapper">
					<Mission />
					<News />
					<ContactUs />
				</div>
			</React.Fragment>
		);
	}
}

export default Home;
