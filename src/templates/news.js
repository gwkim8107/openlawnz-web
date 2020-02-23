import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SearchContainer from "../components/SearchContainer"
import InfoCard from "../components/InfoCard"
import SEO from "../components/seo"

const News = ({ pageContext }) => (
  <Layout>
    <SEO title="News" />
    <div className="highlighted-content">
      <SearchContainer />
      <InfoCard classModifier="info-card--large info-card--title info-card--column-nosub">
        <h1>News</h1>
        <span>Stay up to date with us.</span>
      </InfoCard>
    </div>
    <div className="home-wrapper">
      <div className="container news-list">
        {pageContext.news.map((ni, idx) => (
          <NewsItem key={idx} context={ni} />
        ))}
      </div>
    </div>
  </Layout>
)

const NewsItem = ({
  context: { title, slug, formattedDate, image_url, image_alt, summary },
}) => (
  <div className="item">
    <header>
      <h2>
        <Link to={"/news/" + slug}>{title}</Link>
      </h2>
      <span className="date">{formattedDate}</span>
    </header>
    <div className="content">
      <div className="image-container">
        {image_url && (
          <Link to={"/news/" + slug}>
            <img src={image_url} alt={image_alt} />
          </Link>
        )}
      </div>
      <p>
        {summary}
        <br />
        <Link to={"/news/" + slug}>Read more</Link>
      </p>
    </div>
  </div>
)

export default News
