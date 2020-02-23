import React, { useState, useRef } from "react";
import Search from "./Search.jsx";
import AdvancedSearch from "./AdvancedSearch/index.jsx";

function SearchContainer(props) {
	const [isAdvanced, setAdvanced] = useState(props.showAdvancedSearch);
	const containerElement = useRef(null);

	function toggleTypeOfSearch(ev) {
		ev.preventDefault();
		setAdvanced(!isAdvanced);
		containerElement.current.focus();
	}

	return (
		<section
			tabIndex="-1"
			style={{ outline: "none" }}
			ref={containerElement}
			aria-label={`Search legal cases ${isAdvanced ? "with advanced filters" : ""}`}
		>
			{isAdvanced ? (
				<AdvancedSearch toggleTypeOfSearch={toggleTypeOfSearch} {...props} />
			) : (
				<Search toggleTypeOfSearch={toggleTypeOfSearch} {...props} />
			)}
		</section>
	);
}

export default SearchContainer;
