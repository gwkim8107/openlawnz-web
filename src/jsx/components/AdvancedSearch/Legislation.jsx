import React, { useState } from "react";

import ListBox from "./ListBox.jsx";
import useDebouncedFetch from "./useDebouncedFetch.jsx";

const Legislation = ({ value, id, onChange, className, isPopulated }) => {
	const [act, setAct] = useState(value.act || "");
	const [section, setSection] = useState(value.section || "");
	const { results: actResults, setSkipFetch: setIsActSelected } = useDebouncedFetch({
		source: `${process.env.SEARCH_API_URL}/legislation/acts?search=`,
		term: act,
		extraParams: "&start=0&end=5"
	});
	const { results: sectionResults, setSkipFetch: setIsSectionSelected } = useDebouncedFetch({
		source: () => `${process.env.SEARCH_API_URL}/legislation/acts/${act}/sections?search=`,
		term: section,
		extraParams: "&start=0&end=5"
	});
	const actions = {
		act: { set: setAct, onSelection: setIsActSelected },
		section: { set: setSection, onSelection: setIsSectionSelected }
	};
	const onValueChange = (value, target, isSelection) => {
		actions[target].set(value);
		actions[target].onSelection(isSelection);
		onChange({ id, value, valueInObject: target });
	};

	return (
		<div className={className}>
			<div className="compound-field">
				<ListBox
					id={`act-${id}`}
					value={act}
					automatic
					isPopulated={isPopulated}
					hint="You should select one."
					labelText="Act"
					results={actResults}
					textSelection={result => result.actName}
					onInputValueChange={value => onValueChange(value, "act")}
					onSelection={({ actName = "" }) => onValueChange(actName, "act")}
				/>
			</div>
			<div className="compound-field">
				<ListBox
					id={`section-${id}`}
					value={section}
					isPopulated={isPopulated}
					hint="You should select one."
					labelText="Section"
					results={sectionResults}
					textSelection={result => result.section}
					onInputValueChange={value => onValueChange(value, "section")}
					onSelection={({ section: value = "" }) => onValueChange(value, "section")}
				/>
			</div>
		</div>
	);
};

export default Legislation;
