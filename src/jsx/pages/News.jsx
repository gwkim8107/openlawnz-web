import React from "react";
import { Link } from "react-router-dom";

import { getNews } from "../../js/ApiNews";
import SearchContainer from "../components/SearchContainer.jsx";
import InfoCard from "../components/InfoCard.jsx";
import NewsContext from "../NewsContext.jsx";

const NewsItem = ({ id, title, summary, formattedDate, image_url: imageUrl }) => (
	<div className="item">
		<header>
			<h2>
				<Link to={"/news/" + id}>{title}</Link>
			</h2>
			<span className="date">{formattedDate}</span>
		</header>
		<div className="content">
			<div className="image-container">
				{imageUrl && (
					<Link to={"/news/" + id}>
						<img src={imageUrl} alt={title} />
					</Link>
				)}
			</div>
			<p>
				{summary}
				<br />
				<Link to={"/news/" + id}>Read more</Link>
			</p>
		</div>
	</div>
);

class News extends React.Component {
	async componentDidMount() {
		if (!this.context.data) {
			const data = await getNews();
			this.context.updateData(data.items);
		}
	}

	render() {
		const news = this.context.data;
		return (
			<React.Fragment>
				<div className="highlighted-content">
					<SearchContainer history={this.props.history} />
					<InfoCard classModifier="info-card--large info-card--title info-card--column">
						<h1>News</h1>
						<span>Stay up to date with us.</span>
					</InfoCard>
				</div>
				<div className="home-wrapper">
					<div className="container news-list">
						{news && news.map(item => <NewsItem key={item.id} {...item} />)}
					</div>
				</div>
			</React.Fragment>
		);
	}
}

News.contextType = NewsContext;

export default News;
