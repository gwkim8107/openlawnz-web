import { hot } from "react-hot-loader/root"; // This has to be loaded before react
import React from "react";
import { withRouter, BrowserRouter as Router, Route } from "react-router-dom";
import MainNav from "./components/MainNav.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import News from "./pages/News.jsx";
import SingleNews from "./pages/SingleNews.jsx";
import SingleCase from "./pages/SingleCase.jsx";
import Plugins from "./pages/Plugins.jsx";
import Developers from "./pages/Developers.jsx";
import About from "./pages/About.jsx";
import NewsContext from "./NewsContext.jsx";

import "normalize.css";
import "../scss/App.scss";

const MainNavWithRouter = withRouter(props => <MainNav {...props} />);

const App = props => {
	const [news, setNews] = React.useState(null);
	const updateNewsData = news => setNews(news);

	return (
		<Router>
			<React.Fragment>
				<MainNavWithRouter />
				<main>
					<NewsContext.Provider value={{ data: news, updateData: updateNewsData }}>
						<Route exact path="/" component={Home} />
						<Route exact path="/news" component={News} />
						<Route exact path="/news/:id" component={SingleNews} />
					</NewsContext.Provider>
					<Route exact path="/search" component={Search} />
					<Route exact path="/case/:id" component={SingleCase} />
					<Route exact path="/developers" component={Developers} />
					<Route exact path="/plugins" component={Plugins} />
					<Route exact path="/about" component={About} />
				</main>
				<Footer />
			</React.Fragment>
		</Router>
	);
};

export default hot(App);
