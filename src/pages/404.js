import React from "react"
import Layout from "../components/layout"
import SearchContainer from "../components/SearchContainer.jsx"
import InfoCard from "../components/InfoCard.jsx"

const NotFoundPage = () => (
  <Layout>
    <div className="highlighted-content">
      <SearchContainer />
      <InfoCard classModifier="info-card--large info-card--title info-card--column">
        <h1>404 Page not found</h1>
      </InfoCard>
    </div>
    
      <div className="container main">
       
      </div>
    
  </Layout>
)

export default NotFoundPage