import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import Download from "-!svg-react-loader?name=Logo!../../img/download-icon.svg";
import Open from "-!svg-react-loader?name=Logo!../../img/open-details.svg";
import Close from "-!svg-react-loader?name=Logo!../../img/close-details.svg";

const useAdobePreview = () => {
	const [isScriptLoaded, setIsScriptLoaded] = useState(false);
	const adobeUIConfig = {
		showLeftHandPanel: true,
		showDownloadPDF: true,
		showPrintPDF: true
	};

	useEffect(() => {
		if (window.AdobeDC) {
			setIsScriptLoaded(true);
			return;
		}
		const script = document.createElement("script");
		script.src = "https://documentcloud.adobe.com/view-sdk/main.js";
		document.querySelector("body").appendChild(script);
		document.addEventListener("adobe_dc_view_sdk.ready", () => setIsScriptLoaded(true));
	}, []);

	const getViewer = () => {
		if (!isScriptLoaded) return;

		return new window.AdobeDC.View({
			clientId: process.env.ADOBE_VIEW_KEY,
			divId: "adobe-dc-view"
		});
	};

	return { isScriptLoaded, getViewer, adobeUIConfig };
};

const SingleCaseView = props => {
	const [showDetails, setShowDetails] = useState(false);
	const [loadingIframe, setLoadingIframe] = useState(false);
	const { isScriptLoaded, getViewer, adobeUIConfig } = useAdobePreview();
	const { pdf = {}, caseName, caseCitations, cites, casesCitedsByCaseCited, legislationToCases } =
		props.singleCase || {};
	let adobeDCView;

	const toggleShowDetails = () => {
		setShowDetails(!showDetails);
	};

	useEffect(() => {
		if (!isScriptLoaded || !pdf.pdfDbKey) return;

		adobeDCView = getViewer();
		adobeDCView.previewFile(
			{
				content: {
					location: { url: `https://s3-ap-southeast-2.amazonaws.com/openlawnz-pdfs/${pdf.pdfDbKey}` }
				},
				metaData: { fileName: `${caseName}.pdf` }
			},
			adobeUIConfig
		);
		adobeDCView.registerCallback(
			window.AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
			({ type }) => type === "APP_RENDERING_START" && setLoadingIframe(false) // Set loading false when adobe loading start
		);
	}, [isScriptLoaded, pdf && pdf.pdfDbKey]);

	useEffect(() => {
		setLoadingIframe(true);
	}, [props.isBeingUpdated]);

	return (
		<div className="single-case-wrapper">
			<div className="single-case-header">
				<div className="details-open-close-button" onClick={toggleShowDetails}>
					info {showDetails ? <Close /> : <Open />}
				</div>
				<div className="download-button">
					{pdf.pdfDbKey && (
						<a href={`https://s3-ap-southeast-2.amazonaws.com/openlawnz-pdfs/${pdf.pdfDbKey}`} download>
							<Download alt="Download" className="download-icon" />
						</a>
					)}
				</div>
			</div>
			<div className="row">
				<div className="case-document-viewer">
					{loadingIframe && (
						<p className="loading-iframe">
							<span className="spinner centered"></span>
						</p>
					)}
					<div id="adobe-dc-view"></div>
				</div>
				<div
					className={
						showDetails
							? props.isBeingUpdated
								? "case-details loading"
								: "case-details"
							: "hide-case-details"
					}
				>
					<h3 className="header">Citations known for this case</h3>
					{caseCitations &&
						(caseCitations === 0 ? (
							<p>None</p>
						) : (
							<div role="listitem" className="item">
								{caseCitations.map(obj => (
									<div role="listitem" className="item" key={`cites-reference-${obj.citation}`}>
										{obj.citation}
									</div>
								))}
							</div>
						))}
					<hr></hr>

					<h3 className="header">Cites</h3>
					{cites &&
						(cites.length === 0 ? (
							<p>No cases</p>
						) : (
							<div role="listitem" className="item">
								{cites.map(obj => (
									<div role="listitem" className="item" key={`cites-reference-${obj.id}`}>
										<Link to={`/case/${obj.id}`}>{obj.caseName}</Link>
									</div>
								))}
							</div>
						))}
					<hr></hr>

					<h3 className="header">Cited by</h3>
					{casesCitedsByCaseCited &&
						(casesCitedsByCaseCited.length === 0 ? (
							<p>No cases</p>
						) : (
							<div role="listitem" className="item">
								{casesCitedsByCaseCited.map(obj => (
									<div
										role="listitem"
										className="item"
										key={`cited-by-reference-${obj.caseByCaseOrigin.id}`}
									>
										<Link to={`/case/${obj.caseByCaseOrigin.id}`}>
											{obj.caseByCaseOrigin.caseName}
										</Link>
									</div>
								))}
							</div>
						))}
					<hr></hr>

					<h3 className="header">Legislation Referenced</h3>
					{legislationToCases &&
						(legislationToCases.length === 0 ? (
							<p>No legislation</p>
						) : (
							<table cellSpacing="0" cellPadding="0">
								<thead className="">
									<tr className="">
										<th className="title">Title</th>
										<th className="section">Section</th>
									</tr>
								</thead>
								<tbody className="">
									{legislationToCases.map((obj, i) => (
										<tr className="" key={`legislation-reference-${i}`}>
											<td className="">
												<a
													href={`http://legislation.govt.nz/${obj.legislation.link}`}
													style={{ width: "100%" }}
												>
													{obj.legislation.title}
												</a>
											</td>
											{
												!obj.section.includes(")") && obj.section.slice(0, 2).replace(/()/g, "").length < 3 ? (
													<td className="">
														<a 
															href={`http://www.legislation.govt.nz/act/results.aspx?search=ad_act__${obj.legislation.title.toLowerCase().replace(/\s+/g, "+")}___${obj.section.slice(0 , 2).replace(/()/g, "")}
															}_25_ac%40bn%40rn%40dn%40apub%40aloc%40apri%40apro%40aimp%40bgov%40bloc%40bpri%40bmem%40rpub%40rimp_ac%40ainf%40anif%40aaif%40aase%40arep%40bcur%40rinf%40rnif_a_aw_se&p=1`} 
															target='_blank'
														>
															{obj.section}
														</a>
													</td>
												) : (
													<td className="">{obj.section}</td>
											)} {/* end of legislation loop */}
											
										</tr>
									))}
								</tbody>
							</table>
						))}
					<hr></hr>
				</div>
			</div>
		</div>
	);
};

export default SingleCaseView;
