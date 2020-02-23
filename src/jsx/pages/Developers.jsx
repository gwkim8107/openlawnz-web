import React from "react";
import SearchContainer from "../components/SearchContainer.jsx";
import InfoCard from "../components/InfoCard.jsx";

import External from "-!svg-react-loader?name=External!../../img/external.svg";

class Developers extends React.Component {
	render() {
		return (
			<React.Fragment>
				<div className="highlighted-content">
					<SearchContainer history={this.props.history} />
					<InfoCard classModifier="info-card--large info-card--title info-card--column">
						<h1>Developers</h1>
						<span>Use our API to integrate case law intelligence into your own applications.</span>
					</InfoCard>
				</div>
				<div className="home-wrapper">
					<div className="container main">
						<div className="content">
							<p>
								At its core, OpenLaw NZ is a series of data services built for developers such as
								yourself to use. We built OpenLaw NZ to be a living platform, and would love to see it
								used to make tools to enhance access to justice in New Zealand.
							</p>
							<p>
								While our API and search engine is free for educational, non-profit &amp; open-source
								projects, commercial usage requires a separate license. Please contact us if you want to
								use it commercially.
							</p>

							<h2>API</h2>
							<p>
								By using our API you agree to the{" "}
								<a href="https://s3-ap-southeast-2.amazonaws.com/assets.openlaw.nz/apiterms.pdf">
									API Terms of Use
								</a>
							</p>
							<p>
								Explore our{" "}
								<a href="https://api.openlaw.nz/graphiql">
									GraphQL API &nbsp;
									<External className="icon icon-medium link" alt="External" />
								</a>
							</p>
							<h2>Open source code</h2>
							<p>
								Check out our{" "}
								<a href="https://github.com/openlawnz">
									Github repositories &nbsp;
									<External className="icon icon-medium link" alt="External" />
								</a>
							</p>

							<p>
								If you'd like to volunteer and join our Slack channel please{" "}
								<a href="mailto:william@openlaw.nz">email William</a>.
							</p>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Developers;
