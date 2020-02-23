import React from "react";

import MissionAccessLogo from "-!svg-react-loader!../../img/mission-access.svg";
import MissionInnovationLogo from "-!svg-react-loader!../../img/mission-innovation.svg";
import MissionFundLogo from "-!svg-react-loader!../../img/mission-fund.svg";

export default function Mission() {
	return (
		<section className="container">
			<h2 className="section-title is-text-center">Our Mission</h2>
			<h3 className="section-subtitle is-text-center">
				OpenLaw NZ is an open-source platform that any country can copy and use for the betterment of their
				citizens.
			</h3>

			<div className="horizontal-container horizontal-container--spaced">
				<div className="horizontal-container__item horizontal-container__item--small">
					<div className="card">
						<MissionAccessLogo className="mission-icon" />
						<p>Improve access to justice and education for all New Zealanders</p>
					</div>
				</div>

				<div className="horizontal-container__item horizontal-container__item--small">
					<div className="card">
						<MissionInnovationLogo className="mission-icon" />
						<p>Spur innovation with a freely available relational database</p>
					</div>
				</div>

				<div className="horizontal-container__item horizontal-container__item--small">
					<div className="card">
						<MissionFundLogo className="mission-icon" />
						<p>Fund future development by providing services using the OpenLaw NZ platform</p>
					</div>
				</div>
			</div>
		</section>
	);
}
