import React, { useEffect, useRef, useReducer } from "react";
import produce from "immer";
import queryString from "query-string";
import isValidDate from "date-fns/isValid";
import DOMPurify from "dompurify";

import DefaultInput from "./DefaultInput.jsx";
import JudgmentDate from "./JudgmentDate.jsx";
import Legislation from "./Legislation.jsx";
import CaseName from "./CaseName.jsx";
import Court from "./Court.jsx";

const relationOfTypes = {
	search: { Component: DefaultInput, description: "Any Field" },
	case_name: { Component: CaseName, description: "Case Name" },
	court: { Component: Court, description: "Court" },
	// case_text: { Component: DefaultInput, description: "Case Text" },
	// citation: { Component: DefaultInput, description: "Citation" },
	// cited_by: { Component: DefaultInput, description: "Cited By" },
	// cites: { Component: DefaultInput, description: "Cites" },
	judgment_date: { Component: JudgmentDate, description: "Judgment Date" },
	legislation: { Component: Legislation, description: "Legislation" }
};

const relationOfSubTypes = {
	judgment_date_from: { ...relationOfTypes.judgment_date, parentType: "judgment_date", prop: "from" },
	judgment_date_to: { ...relationOfTypes.judgment_date, parentType: "judgment_date", prop: "to" },
	legislation_act: { ...relationOfTypes.legislation, parentType: "legislation", prop: "act" },
	legislation_section: { ...relationOfTypes.legislation, parentType: "legislation", prop: "section" }
};

const validateValueOnPopulate = {
	judgment_date: value => isValidDate(new Date(value))
};

const INITIAL_INPUT_TYPE = "search";

const defaultSearchFieldFormat = { ...relationOfTypes[INITIAL_INPUT_TYPE], type: INITIAL_INPUT_TYPE, id: 0, value: "" };

const searchReducer = (state, action) => {
	switch (action.type) {
		case "UPDATE_FIELD_VALUE":
			return produce(state, draft => {
				const { id, value, valueInObject } = action.payload;
				const searchField = draft.searchFields.find(sf => sf.id === id);
				let newValue = DOMPurify.sanitize(value, { ALLOWED_TAGS: ["&"] });

				if (valueInObject) {
					newValue = { ...searchField.value };
					newValue[valueInObject] = DOMPurify.sanitize(value);
				}

				searchField.value = newValue;
			});
		case "EMPTY_FIELDS":
			return {
				...state,
				searchFields: []
			};
		case "ADD_FIELD":
			return produce(state, draft => {
				const { type: fieldType } = action.payload.field;
				const type = draft.typesOfFields.find(t => t.value === fieldType);

				draft.searchFields.push(action.payload.field);
				if (type) type.visible = false;
			});
		case "ADD_EMPTY_FIELD":
			return produce(state, draft => {
				const firstAvailableType = draft.typesOfFields.find(t => t.visible === true);
				draft.searchFields.push({
					...relationOfTypes[firstAvailableType.value],
					value: "",
					type: firstAvailableType.value,
					id: state.searchFields[state.searchFields.length - 1].id + 1
				});
				firstAvailableType.visible = false;
			});
		case "REMOVE_FIELD":
			return produce(state, draft => {
				const { type, id } = action.payload;
				const typeOfField = draft.typesOfFields.find(t => t.value === type);

				draft.searchFields = draft.searchFields.filter(item => item.id !== id);
				if (typeOfField) typeOfField.visible = true;
			});
		case "UPDATE_FIELD_COMPONENT_AND_SELECT":
			return produce(state, draft => {
				let newType, currentType;
				const { value, id } = action.payload;
				const searchField = draft.searchFields.find(sf => sf.id === id);
				draft.typesOfFields.forEach(type => {
					if (type.value === value) newType = type;
					if (type.value === searchField.type) currentType = type;
				});

				searchField.Component = newType.Component;
				searchField.value = "";
				searchField.type = newType.value;

				newType.visible = newType.value === "" || false;
				if (currentType) currentType.visible = true;
			});
		case "UPDATE_TYPE_VISIBILITY":
			return produce(state, draft => {
				const { type, visible } = action.payload;
				const typeOfField = draft.typesOfFields.find(t => t.value === type);
				if (typeOfField) typeOfField.visible = visible;
			});
		default:
			throw new Error();
	}
};

const AdvancedSearch = ({ onSubmit, toggleTypeOfSearch, populateComponent, history }) => {
	const containerRef = useRef(null);
	const [state, dispatch] = useReducer(searchReducer, {
		searchFields: [defaultSearchFieldFormat],
		typesOfFields: Object.keys(relationOfTypes).map(type => ({
			...relationOfTypes[type],
			visible: true,
			value: type
		}))
	});

	useEffect(() => {
		const urlParams = queryString.parse(location.search);
		const prevState = [];

		// Hide the first or default input type that is always available on the component
		triggerDispatch("UPDATE_TYPE_VISIBILITY", { type: defaultSearchFieldFormat.type, visible: false });

		if (!populateComponent) return;
		Object.keys(urlParams).forEach((key, idx) => {
			let field = { isPopulated: true };
			const value = DOMPurify.sanitize(urlParams[key]);
			const type = relationOfTypes[key];
			const subType = relationOfSubTypes[key];
			if (type) {
				// Validate format if necessary before saving it
				if (validateValueOnPopulate[type] && !validateValueOnPopulate[type](value)) return;
				field = { ...field, ...type, value, type: key, id: idx };
				prevState.push(field);
				return;
			}

			if (!subType) return;

			// Validate format if necessary before saving it
			if (validateValueOnPopulate[subType.parentType] && !validateValueOnPopulate[subType.parentType](value))
				return;
			field = prevState.find(({ type }) => type === subType.parentType) || {
				...field,
				...relationOfTypes[subType.parentType],
				type: subType.parentType,
				value: {},
				id: idx
			};
			field.value[subType.prop] = value;
			if (Object.keys(field.value).length <= 1) prevState.push(field);
		});

		if (prevState.length) {
			triggerDispatch("EMPTY_FIELDS");
			triggerDispatch("UPDATE_TYPE_VISIBILITY", { type: defaultSearchFieldFormat.type, visible: true }); // Reset visibility of default type of field
			prevState.forEach(field => triggerDispatch("ADD_FIELD", { field }));
		}
	}, []);

	const getParamsAsString = () => {
		return state.searchFields.reduce((acc, sf, sfIdx) => {
			if (typeof sf.value === "object" && sf.value !== null) {
				const keys = Object.keys(sf.value);
				keys.forEach((key, keyIdx) => {
					acc += `${sf.type}_${key}=${sf.value[key]}`;
					if (keyIdx < keys.length - 1 || sfIdx < state.searchFields.length - 1) acc += "&";
				});
			} else {
				acc += `${sf.type}=${sf.value}`;
				if (sfIdx < state.searchFields.length - 1) acc += "&";
			}

			return acc;
		}, "");
	};

	const handleSubmit = e => {
		e.preventDefault();
		const paramsAsString = getParamsAsString();

		return onSubmit
			? onSubmit(paramsAsString, paramsAsString, "advancedQuery")
			: history.push(`/search?${getParamsAsString()}`);
	};

	const triggerDispatch = (type, payload) => {
		dispatch({ type, payload });
	};

	return (
		<div ref={containerRef} className="advanced-search">
			<form className="box" onSubmit={handleSubmit}>
				<h2 className="title">Advanced Search</h2>
				<span className="subtitle">Please select:</span>

				{state.searchFields.map(({ type, id, value, isPopulated, Component }, index) => (
					<div className="search-field" key={id}>
						<select
							className="search-field-select"
							value={type}
							required
							onChange={ev =>
								triggerDispatch("UPDATE_FIELD_COMPONENT_AND_SELECT", { id, value: ev.target.value })
							}
						>
							{state.typesOfFields.map(
								t =>
									(t.value === type || t.visible) && (
										<option key={`searchField${id}-${t.value}`} value={t.value}>
											{t.description}
										</option>
									)
							)}
						</select>

						<Component
							className="search-field-input"
							id={id}
							value={value}
							isPopulated={isPopulated}
							onChange={payload => triggerDispatch("UPDATE_FIELD_VALUE", payload)}
						/>

						<div className="search-field-button">
							{index > 0 && (
								<button
									type="button"
									className="action-button simple large-font"
									onClick={() => triggerDispatch("REMOVE_FIELD", { id, type })}
								>
									x
								</button>
							)}
						</div>
					</div>
				))}

				<div className="search-field">
					<button
						disabled={state.typesOfFields.length === state.searchFields.length}
						type="button"
						className="action-button large-font"
						onClick={() => triggerDispatch("ADD_EMPTY_FIELD", null)}
					>
						+
					</button>
				</div>

				<div className="action-container">
					<button type="button" className="action-button simple" onClick={toggleTypeOfSearch}>
						Cancel
					</button>

					<button type="submit" className="action-button large">
						Search
					</button>
				</div>
			</form>
		</div>
	);
};

AdvancedSearch.defaultProps = {
	toggleTypeOfSearch: () => {}
};

export default AdvancedSearch;
