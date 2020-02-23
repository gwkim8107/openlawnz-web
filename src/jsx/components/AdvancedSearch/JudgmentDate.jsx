import React, { useState, useEffect } from "react";
import DatePicker from "react-date-picker";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import format from "date-fns/format";
import parse from "date-fns/parse";

const JudgmentDate = ({ value, id, onChange, className }) => {
	const dateFormat = "y-M-dd";
	const startingDateFrom = value.from ? parse(value.from, dateFormat, new Date()) : startOfMonth(new Date());
	const startingDateTo = value.to ? parse(value.to, dateFormat, new Date()) : endOfMonth(new Date());
	const [dateFrom, setDateFrom] = useState(startingDateFrom);
	const [dateTo, setDateTo] = useState(startingDateTo);

	const onDateChange = (date, type) => {
		if (type === "from") {
			setDateFrom(date);
		} else {
			setDateTo(date);
		}
		onChange({ id, valueInObject: type, value: format(date, dateFormat) });
	};

	useEffect(() => {
		onChange({ id, value: format(startingDateFrom, dateFormat), valueInObject: "from" });
		onChange({ id, value: format(startingDateTo, dateFormat), valueInObject: "to" });
	}, []);

	return (
		<div className={className}>
			<div className="compound-field">
				<label htmlFor={`from-${id}`}>From</label>
				<DatePicker
					showLeadingZeros
					required
					maxDate={dateTo}
					onChange={date => onDateChange(date, "from")}
					value={dateFrom}
				/>
			</div>
			<div className="compound-field">
				<label htmlFor={`to-${id}`}>To</label>
				<DatePicker
					showLeadingZeros
					required
					minDate={dateFrom}
					onChange={date => onDateChange(date, "to")}
					value={dateTo}
				/>
			</div>
		</div>
	);
};

export default JudgmentDate;
