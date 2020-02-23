import React from "react";
import { Link } from "react-router-dom";

import Logo from "-!svg-react-loader?name=Logo!../../img/openlaw-logo.svg";
import External from "-!svg-react-loader?name=External!../../img/external.svg";

// login
import { useAuth0 } from "../../js/react-auth0-spa";

const MainNav = () => {
	const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
	const [isNavOpen, setIsNavOpen] = React.useState(false);
	const toggleNavState = () => setIsNavOpen(!isNavOpen);

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
						{/*
							<li
							onClick={() => {
								toggleNavState();
								return isAuthenticated ? logout() : loginWithRedirect({});
							}}
						>
							<a href="#">{isAuthenticated ? "Logout" : "Log In"}</a>
						</li>
						*/}
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default MainNav;
