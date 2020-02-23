import React from "react";

const DefaultInput = ({ value, id, onChange, className }) => (
	<div className={className}>
		<input required id={`simple-${id}`} value={value} onChange={ev => onChange({ id, value: ev.target.value })} />
	</div>
);

export default DefaultInput;
