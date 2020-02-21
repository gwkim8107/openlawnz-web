import React from "react";
import Layout from "../components/layout"
import SEO from "../components/seo"
import Search from "../components/Search.jsx";
import InfoCard from "../components/InfoCard.jsx";

const LoginPage = ({ history }) => (
    <Layout>
        <SEO title="Login" />
            <React.Fragment>
                <Search history={history} />
                <div className="home-wrapper">
                    <InfoCard classModifier="info-card--large info-card--title info-card--column">
                        <h1>Login</h1>
                        <span>Quick and easy login!</span>
                    </InfoCard>

                </div>
            </React.Fragment>
    </Layout>
)

export default LoginPage;