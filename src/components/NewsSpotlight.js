import React from "react"
import { Link } from "gatsby"

const NewsSpotlight = props => {
  return (
    <section className="news-container">
      <div className="news-items">
        <h1>
          <Link to="/news">News</Link>
        </h1>
        <div className="news-cards-wrapper">
          {props.data.map(
            ({ slug, title, image_url: imageUrl, summary, image_alt }, idx) => (
              <div key={idx} className="news-card">
                {imageUrl && (
                  <div className="picture">
                    <img src={imageUrl} alt={image_alt} />
                  </div>
                )}
                <div>
                  <h2>{title}</h2>
                  <p>{summary}</p>

                  <Link to={"/news/" + slug} className="link">
                    Find out more
                  </Link>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}

export default NewsSpotlight
