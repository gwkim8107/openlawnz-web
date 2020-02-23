import React from "react";

export default function InfoCardUnit(props) {
	return (
		<div className="info-card-unit">
			<div className="info-card-unit-wrapper">
				<h1>{props.one}</h1>
				<h2>{props.two}</h2>
			</div>
		</div>
	);
}
