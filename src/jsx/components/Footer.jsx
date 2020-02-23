import React from "react";

import Logo from "-!svg-react-loader?name=Logo!../../img/the-law-foundation-logo.svg";

export default function Footer() {
	return (
		<footer className="footer-container">
			<div className="footer-items">
				<div className="footer-contact-us">
					<p>Contact Us</p>
					<p>
						<a href="mailto:enquiries@openlaw.nz">enquiries@openlaw.nz</a>
					</p>
					<p>
						&copy; OpenLaw NZ |{" "}
						<a href="https://www.register.charities.govt.nz/Charity/CC55967">Registered NZ Charity</a>
					</p>
				</div>
				<div className="law-foundation-nav-logo">
					<p>Supported by</p>
					<a href="https://www.lawfoundation.org.nz/">
						<span className="visuallyhidden">The Law Foundation</span>
						<Logo alt="The Law Foundation logo" className="the-law-foundation-logo" />
					</a>
				</div>
			</div>
		</footer>
	);
}
