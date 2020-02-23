import React from "react";

import { getNews } from "../../js/ApiNews";
import SearchContainer from "../components/SearchContainer.jsx";
import InfoCard from "../components/InfoCard.jsx";
import NewsContext from "../NewsContext.jsx";

const selectNews = (news = [], id) => news.find(item => item.id === id);

class News extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: {}
		};
	}

	async componentDidMount() {
		window.scrollTo(0, 0);
		const newsId = this.props.match.params.id;

		if (!this.context.data) {
			const data = await getNews();
			this.context.updateData(data.items);
			this.setState({ data: selectNews(data.items, newsId) });
		} else {
			this.setState({ data: selectNews(this.context.data, newsId) });
		}
	}

	render() {
		const {
			title = "",
			formattedDate = "",
			image_url: imageUrl = null,
			content_html: contentHtml = ""
		} = this.state.data;

		return (
			<React.Fragment>
				<div className="highlighted-content">
					<SearchContainer history={this.props.history} />
					<InfoCard classModifier="info-card--large info-card--title info-card--column">
						<h1>{title}</h1>
						<span>{formattedDate}</span>
					</InfoCard>
				</div>
				<div className="home-wrapper">
					<div className="container main">
						<div className="content">
							{imageUrl && (
								<React.Fragment>
									<div className="image-container">
										<img src={imageUrl} />
									</div>
									<hr className="divider" />
								</React.Fragment>
							)}
							<div
								dangerouslySetInnerHTML={{
									__html: contentHtml
								}}
							/>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

News.contextType = NewsContext;

export default News;
