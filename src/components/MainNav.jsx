import React from "react"
import { Link } from "gatsby"

import Logo from "../images/svgs/openlaw-logo.svg"
import External from "../images/svgs/external.svg"

const MainNav = () => {
  const [isNavOpen, setIsNavOpen] = React.useState(false)
  const toggleNavState = () => setIsNavOpen(!isNavOpen)

  return (
    <header role="banner" className="nav-container">
      <div className="nav-items">
        <div className="nav-logo">
          <Link to="/">
            <span className="visuallyhidden">OpenLaw NZ</span>
            <Logo alt="OpenLaw NZ" className="main-logo" />
          </Link>
        </div>
        <nav className="nav-links" id="menuToggle">
          <input
            aria-hidden
            type="checkbox"
            checked={isNavOpen}
            onChange={toggleNavState}
          />
          <span></span>
          <span></span>
          <span></span>

          <ul id="menu">
            <li>
              <Link to="/about" onClick={toggleNavState}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/news" onClick={toggleNavState}>
                News
              </Link>
            </li>
            <li>
              <Link to="/plugins" onClick={toggleNavState}>
                Plugins
              </Link>
            </li>
            <li>
              <Link to="/developers" onClick={toggleNavState}>
                Developers
              </Link>
            </li>
            <li>
              <a
                href="https://donorbox.org/openlaw-nz-3"
                target="_blank"
                rel="noopener noreferrer"
                onClick={toggleNavState}
              >
                Support Us{" "}
                <sup>
                  <External className="icon icon-small white" alt="External" />
                </sup>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default MainNav
