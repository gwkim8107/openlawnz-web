import React from "react"

import Logo from "../images/svgs/the-law-foundation-logo.svg"

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
            <a href="https://www.register.charities.govt.nz/Charity/CC55967">
              Registered NZ Charity
            </a>
          </p>
        </div>
        <div className="law-foundation-nav-logo">
          <p>Supported by</p>
          <div>
            <a href="https://www.lawfoundation.org.nz/">
              <span className="visuallyhidden">The Law Foundation</span>
              <Logo
                alt="The Law Foundation logo"
                className="the-law-foundation-logo"
              />
            </a>
            <a href="https://www.netlify.com">
              <img
                src="https://www.netlify.com/img/global/badges/netlify-dark.svg"
                alt="Deployed by Netlify"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
