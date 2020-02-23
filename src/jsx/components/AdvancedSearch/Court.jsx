import React from "react";

const Court = ({ value, id, onChange, className }) => (
	<div className={className}>
		<select
			id={`simple-${id}`}
			onChange={ev => onChange({ id, value: ev.target.value })}
			value={value}
			required
			className="extended-select"
		>
			<option value="">Select an option</option>
			<option value="Supreme Court">Supreme Court</option>
			<option value="Court of appeal">Court of Appeal</option>
			<option value="High Court">High Court</option>
			<option value="District Court">District Court</option>
		</select>
	</div>
);

export default Court;
