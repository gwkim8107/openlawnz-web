import React, { useState } from "react";

const ListBox = ({
	id,
	value,
	results,
	labelText,
	automatic,
	hint,
	onInputValueChange = () => {},
	textSelection = () => "",
	onSelection = () => {},
	isPopulated
}) => {
	const [isInputFocused, setIsInputFocused] = useState(false);
	const [isSelected, setIsSelected] = useState(isPopulated);
	const [resultOnFocus, setResultOnFocus] = useState(null);
	const toggleInputFocus = () => {
		setIsInputFocused(!isInputFocused);
		setResultOnFocus(null);
	};
	const handleSelection = result => {
		toggleInputFocus();
		onSelection(result);
		setIsSelected(true);
	};
	const handleValueChange = ev => {
		onInputValueChange(ev.target.value);
		setIsInputFocused(true);
		setIsSelected(false);
	};
	const automaticSelection = () => {
		if (!automatic || isSelected) return;
		if (resultOnFocus && results[resultOnFocus]) handleSelection(results[resultOnFocus]);
		else if (results.length && results[0]) handleSelection(results[0]);
		else handleSelection({});
		setIsInputFocused(false);
	};
	const handleBlur = () => {
		setIsInputFocused(false);
		automaticSelection();
	};
	const handleKeyDown = ev => {
		const key = ev.which || ev.keyCode;
		let idx = resultOnFocus != null ? resultOnFocus : -1;

		// Enter
		if (key === 13) {
			if (!isInputFocused) return;
			ev.preventDefault();
			if (results[resultOnFocus]) handleSelection(results[resultOnFocus]);
			else automaticSelection();
		}

		// Tab
		if (key === 9) {
			if (results[resultOnFocus]) handleSelection(results[resultOnFocus]);
			setIsInputFocused(false);
			automaticSelection();
		}

		// The other keys shouldn't have actions if there is no results
		if (!results.length) return;

		// Left and Right /
		if (key === 39 || key === 37) setIsInputFocused(true);

		// Up and Down
		if (key === 40 || key === 38) {
			if (!isInputFocused) return;
			ev.preventDefault();
			if (39 - key === -1) {
				// If ArrowDown
				if (idx + 1 >= results.length) idx = 0;
				else idx++;
			} else {
				// If ArrowUp
				if (idx - 1 === -1) idx = results.length - 1;
				else idx--;
			}
			setResultOnFocus(idx);
		}
	};

	return (
		<React.Fragment>
			{labelText && (
				<label htmlFor={`${id}-input`} id={`${id}-label`} className="comboBox-label">
					{labelText}
					{hint && <span className="visuallyhidden">{hint}</span>}
				</label>
			)}
			<div className="comboBox-wrapper">
				<div
					role="combobox"
					aria-expanded={isInputFocused && results.length > 0}
					aria-owns={`${id}-listbox`}
					aria-haspopup="listbox"
					id={`${id}-combobox`}
				>
					<input
						value={value}
						onChange={handleValueChange}
						onFocus={toggleInputFocus}
						onKeyDown={handleKeyDown}
						onBlur={handleBlur}
						type="text"
						required
						aria-autocomplete="list"
						aria-controls={`${id}-listbox`}
						id={`${id}-input`}
						aria-activedescendant={resultOnFocus != null ? `${id}-result-item-${resultOnFocus}` : ""}
					/>
					{isInputFocused && !results.length && (
						<div className="listBox">
							<div className="listBox__item listBox__item--clean" aria-hidden="true">
								Type to search suggestions. {hint}
							</div>
						</div>
					)}
				</div>
				<ul
					aria-labelledby={`${id}-label`}
					role="listbox"
					id={`${id}-listbox`}
					className={`listBox ${!isInputFocused || (isInputFocused && !results.length) ? "hidden" : ""}`}
				>
					{results.map((result, idx) => (
						<li
							key={`${id}-result-item-${idx}`}
							onMouseDown={() => handleSelection(result)}
							className={`listBox__item ${resultOnFocus === idx ? "listBox__item-focused" : ""}`}
							role="option"
							id={`${id}-result-item-${idx}`}
						>
							{textSelection(result)}
						</li>
					))}
				</ul>
			</div>
		</React.Fragment>
	);
};

export default ListBox;
