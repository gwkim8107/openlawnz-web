import React from "react";

export default function InfoCard({ children, classModifier = "" }) {
	return (
		<div className="info-card-container">
			<section className={"info-card " + classModifier}>{children}</section>
		</div>
	);
}
