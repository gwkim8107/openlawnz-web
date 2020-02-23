import React from "react"
import Layout from "../components/layout"
import InfoCard from "../components/InfoCard.jsx"
import SearchContainer from "../components/SearchContainer.jsx"
import SEO from "../components/seo"
import { Link } from "gatsby"
import GenericAvatar from "../images/about-us/avatar.png"
import Andy from "../images/about-us/andrew-easterbrook.png"
import Will from "../images/about-us/will.png"
import Tian from "../images/about-us/tian-bai.png"
import Caio from "../images/about-us/caio-nunes.png"
import Terence from "../images/about-us/terence-zhong.png"
import AlexH from "../images/about-us/alex-huang.png"
import Noel from "../images/about-us/noel-soong.png"
import AlexC from "../images/about-us/alex-chan.png"
import Limei from "../images/about-us/limei.png"
import April from "../images/about-us/april-liau.png"
import Lina from "../images/about-us/lina-xie.png"
import David from "../images/about-us/david-paitai.png"
import Hanbyul from "../images/about-us/hanbyul-son.png"
import Benedict from "../images/about-us/benedict-stewart.png"
import Emma from "../images/about-us/emma-burke.png"
import Infra from "../images/about-us/openlaw-infrastructure.png"
import Nicolas from "../images/about-us/Nicolas-zhou.png"
import Jins from "../images/about-us/Jins_Mary_Job.png"
import Dana from "../images/about-us/dana-iti.png"

const AboutPage = () => (
  <Layout>
    <SEO title="About" />
    <div className="highlighted-content">
      <SearchContainer />
      <InfoCard classModifier="info-card--large info-card--title info-card--column-nosub">
        <h1>About Us</h1>
      </InfoCard>
    </div>
    <div className="home-wrapper">
      <div className="container main">
        <div className="content">
          <h2>What we do</h2>
          <p>
            OpenLaw NZ is an open-source legal data platform. Our goal is to improve the accessibility of case law and
            other legal information in New Zealand. We want to make it easier for all New Zealanders to understand law.
          </p>
          <p>
            You can use our search to find case law, and navigate between related information. You can also use our
            plugins (or write your own) to aid your research.
          </p>
          <p>
            You can use our API to build case law intelligence into your own applications and services. For an example,
            see our <Link to="/plugins">chrome extension</Link>.
          </p>
          <h2>Our data</h2>
          <div className="paragraph-with-figure">
            The data we have currently comprises High Court, Court of Appeal and Supreme Court decisions from present
            day back to approximately 2004 (with some exceptions, for example some suppressed decisions and other
            judgments that have not been published).
            <br />
            <br />
            We developed software that extracts data from cases. We extract structured data, including references to
            other cases in our database, and to any Acts of Parliament (current or repealed). We use that software to
            power our search and API.{" "}
            <div className="figure-container">
              <div className="interior">
                <a className="btn" href="#infrastructure">
                  <img src={Infra} alt="Infrastructure" title="Click to enlarge the image" />
                </a>
              </div>
            </div>
            <div aria-hidden="true" id="infrastructure" className="modal-window">
              <div>
                <a href="#close" title="Close" className="modal-close">
                  Close
                </a>
                <img src={Infra} alt="Infrastructure" />
              </div>
            </div>
          </div>
          <h2>Who we are</h2>
          <p>
            OpenLaw NZ is a registered charity. We’re operated by a fantastic group of volunteers, helping with code,
            design, orchestration, data parsing, machine learning and devops.
          </p>
          <p>
            Our volunteers receive real-world experience in react, node.js, python and a range of other technologies. If
            you’d like to get involved, drop us a line <a href="mailto:enquiries@openlaw.nz">here</a>.
          </p>

          <hr className="divider" />

          <h2>Directors</h2>

          <div className="cards-list">
            <div className="card-item">
              <img src={Andy} alt="Andrew Easterbrook, CEO" />
              <strong>Andrew Easterbrook, CEO</strong>
              <p>
                Andrew is a lawyer, and has worked in technology law, civil litigation and family law since 2009. He has
                been a Member of the Auckland District Law Society Technology &amp; Law Committee since 2012, and is
                experienced in web and software development. Andrew went to university at Victoria, Wellington, and now
                lives in Whangarei.
              </p>
            </div>
            <div className="card-item">
              <img src={Will} alt="Willian Parry, CTO" />
              <strong>William Parry, CTO</strong>
              <p>
                William brings 15 years of tech experience across enterprise, advertising and small businesses including
                8 years working with open data in projects and hackathons. He has run community coding classes and is
                passionate about empowering disadvantaged people with technology. William went to university at
                Victoria, Wellington, and now lives in Sydney.
              </p>
            </div>
          </div>

          <h2>Past and Present Contributors</h2>

          <div className="cards-list">
            <div className="card-item-small">
              <div>
                <img src={GenericAvatar} alt="Blaine Western" />
                <strong>Blaine Western</strong>
              </div>
            </div>

            <div className="card-item-small">
              <div>
                <img src={Tian} alt="Tian Bai" />
                <strong>Tian Bai</strong>
              </div>
            </div>
            <div className="card-item-small">
              <div>
                <img src={Caio} alt="Caio Nunes" />
                <strong>Caio Nunes</strong>
              </div>
            </div>

            <div className="card-item-small">
              <div>
                <img src={Terence} alt="Terence Zhong" />
                <strong>Terence Zhong</strong>
              </div>
            </div>
            <div className="card-item-small">
              <div>
                <img src={AlexH} alt="Alex Huang" />
                <strong>Alex Huang</strong>
              </div>
            </div>

            <div className="card-item-small">
              <div>
                <img src={Nicolas} alt="Nicolas Zhou" />
                <strong>Nicolas Zhou</strong>
              </div>
            </div>
            <div className="card-item-small">
              <div>
                <img src={Jins} alt="Jins Mary Job" />
                <strong>Jins Mary Job</strong>
              </div>
            </div>

            <div className="card-item-small">
              <div>
                <img src={Dana} alt="Dana Iti" />
                <strong>Dana Iti</strong>
              </div>
            </div>

            <div className="card-item-small">
              <div>
                <img src={Noel} alt="Noel Soong" />
                <strong>Noel Soong</strong>
              </div>
            </div>
            <div className="card-item-small">
              <div>
                <img src={Hanbyul} alt="Hanbyul Son" />
                <strong>Hanbyul Son</strong>
              </div>
            </div>
            <div className="card-item-small">
              <div>
                <img src={AlexC} alt="Alex Chan" />
                <strong>Alex Chan</strong>
              </div>
            </div>
            <div className="card-item-small">
              <div>
                <img src={Limei} alt="Limei" />
                <strong>Limei</strong>
              </div>
            </div>

            <div className="card-item-small">
              <div>
                <img src={GenericAvatar} alt="Ed Haslam" />
                <strong>Ed Haslam</strong>
              </div>
            </div>

            <div className="card-item-small">
              <div>
                <img src={April} alt="April Liau" />
                <strong>April Liau</strong>
              </div>
            </div>
            <div className="card-item-small">
              <div>
                <img src={Lina} alt="Lina Xie" />
                <strong>Lina Xie</strong>
              </div>
            </div>
            <div className="card-item-small">
              <div>
                <img src={David} alt="David Paitai" />
                <strong>David Paitai</strong>
              </div>
            </div>
            <div className="card-item-small">
              <div>
                <img src={Benedict} alt="Benedict Stewart" />
                <strong>Benedict Stewart</strong>
              </div>
            </div>
            <div className="card-item-small">
              <div>
                <img src={Emma} alt="Emma Burke" />
                <strong>Emma Burke</strong>
              </div>
            </div>
            <div className="card-item-small">
              <div>
                <img src={GenericAvatar} alt="Alex McNichol" />
                <strong>Alex McNichol</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
)

export default AboutPage
