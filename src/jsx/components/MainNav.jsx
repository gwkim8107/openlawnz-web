import React from "react";
import { Link } from "react-router-dom";

import Logo from "-!svg-react-loader?name=Logo!../../img/openlaw-logo.svg";
import External from "-!svg-react-loader?name=External!../../img/external.svg";

// Auth0: Authentication
import Auth0Lock from "auth0-lock";
import { environment } from "../../js/environment";

const options = {
	theme: {
		logo: "https://www.openlaw.nz/assets/android-chrome-192x192.png",
		primaryColor: "#2B6064"
	},
	languageDictionary: {
		emailInputPlaceholder: "Email",
		passwordInputPlaceholder: "Password",
		title: "OpenLaw NZ"
	}
};

const lock = new Auth0Lock(environment.auth0.clientId, environment.auth0.domain, options);
var globalToken = sessionStorage.getItem("token");
var globalProfile = sessionStorage.getItem("profile") && JSON.parse(sessionStorage.getItem("profile"));

const MainNav = () => {
	const [loggedIn, setLoggedIn] = React.useState(false);
	const [loginText, setLoginText] = React.useState("Login");
	const [welcomMsg, setWelcomMsg] = React.useState("");

	const [isNavOpen, setIsNavOpen] = React.useState(false);
	const toggleNavState = () => setIsNavOpen(!isNavOpen);

	const runAuth0Lock = e => {
		e.preventDefault();
		if (e) {
			if(loggedIn){
				setLoggedIn(false);
				setWelcomMsg("");
				setLoginText("Login");
				sessionStorage.removeItem('token');
				sessionStorage.removeItem('profile');
			} else {
				lock.show();
			}
		}
	};

	const onAuthenticated = () => {
		lock.on("authenticated", authResult => {
			lock.getUserInfo(authResult.accessToken, function(error, profile) {
				if (error) {
					// Handle error
					return;
				}
				globalToken = authResult.accessToken;
				globalProfile = profile;
				sessionStorage.setItem("token", globalToken);
				sessionStorage.setItem("profile", JSON.stringify(globalProfile));
				console.log(JSON.stringify(globalProfile));
				setLoggedIn(true);
				setWelcomMsg("Hi, " + profile.given_name + "! ");
				setLoginText("Logout");
			});
		});
	};

	if (!loggedIn) onAuthenticated();

	return (
		<header role="banner" className="nav-container">
			<div className="nav-items">
				<div className="nav-logo">
					<Link to="/">
						<span className="visuallyhidden">Open Law</span>
						<Logo alt="OpenLaw NZ" className="main-logo" />
					</Link>
				</div>
				<nav className="nav-links" id="menuToggle">
					<input aria-hidden type="checkbox" checked={isNavOpen} onChange={toggleNavState} />
					<span></span>
					<span></span>
					<span></span>

					<ul id="menu">
						<li onClick={toggleNavState}>
							<Link to="/about">About Us</Link>
						</li>
						<li onClick={toggleNavState}>
							<Link to="/news">News</Link>
						</li>
						<li onClick={toggleNavState}>
							<Link to="/plugins">Plugins</Link>
						</li>
						<li onClick={toggleNavState}>
							<Link to="/developers">Developers</Link>
						</li>
						<li onClick={toggleNavState}>
							<a href="https://donorbox.org/openlaw-nz-3" target="_blank" rel="noopener noreferrer">
								Support Us{" "}
								<sup>
									<External className="icon icon-small white" alt="External" />
								</sup>
							</a>
						</li>
					</ul>
					<div className="menu-button" id="login-button">
					  { welcomMsg }
						<a
							id="login-text"
							href="#"
							onClick={e => {
								runAuth0Lock(e);
							}}
						>
							{ loginText }
						</a>
					</div>
				</nav>
			</div>
		</header>
	);
};

export default MainNav;
