import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import SEO from "../components/seo"
import SearchContainer from "./SearchContainer.jsx"
import InfoCard from "./InfoCard.jsx"

import Download from "../images/svgs/download-icon.svg"
import Open from "../images/svgs/open-details.svg"
import Close from "../images/svgs/close-details.svg"

import ApiService from "../js/ApiService"

const SingleCase = ({ id }) => {
  const [data, setData] = useState()
  const [error, setError] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [adobeDCView, setAdobeDCView] = useState(null)
  const adobeUIConfig = {
    showLeftHandPanel: true,
    showDownloadPDF: true,
    showPrintPDF: true,
  }

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const adobeDCViewerCallback = () => {
    setAdobeDCView(
      new window.AdobeDC.View({
        clientId: process.env.GATSBY_ADOBE_VIEW_KEY,
        divId: "adobe-dc-view",
      })
    )
  }

  useEffect(() => {
    if (window.AdobeDC && !adobeDCView) {
      adobeDCViewerCallback()
    } else if (!window.AdobeDC) {
      const script = document.createElement("script")
      script.src = "https://documentcloud.adobe.com/view-sdk/main.js"
      document.querySelector("body").appendChild(script)
      document.addEventListener("adobe_dc_view_sdk.ready", adobeDCViewerCallback)
    }
  }, [adobeDCView])

  useEffect(() => {
    if (!adobeDCView || !data) return

    adobeDCView.previewFile(
      {
        content: {
          location: {
            url: `https://s3-ap-southeast-2.amazonaws.com/openlawnz-pdfs/${data.pdf.pdfDbKey}`,
          },
        },
        metaData: { fileName: `${data.caseName}.pdf` },
      },
      adobeUIConfig
    )
  }, [data, adobeDCView, adobeUIConfig])

  const handleInfoCardHeaderSize = caseName => {
    if (caseName.length <= 30) return "header-case"
    else if (caseName.length <= 60) return "header-case-mediumFont"
    else return "header-case-smallFont"
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await ApiService.getCase({ id: parseInt(id) })
      if (result) {
        setData(result)
      } else {
        setError(true)
      }
    }
    fetchData()
  }, [id])

  return (
    <React.Fragment>
      {error && (
        <React.Fragment>
          <div className="highlighted-content">
            <SearchContainer />
            <InfoCard>
              <h2 className={"header-case"}>This case cannot be found</h2>
            </InfoCard>
          </div>
          <div className="home-wrapper"></div>
        </React.Fragment>
      )}
      {!error && (
        <React.Fragment>
          {data && <SEO title={data.caseName} />}
          <div className="highlighted-content">
            <SearchContainer />
            <InfoCard>
              <h2 className={!data ? "header-case" : handleInfoCardHeaderSize(data.caseName)}>
                {!data ? "-" : data.caseName}
              </h2>
            </InfoCard>
          </div>
          <div className="home-wrapper">
            <div className="single-case-wrapper">
              <div className="single-case-header">
                <button className="a11y-button--unstyled details-open-close-button" onClick={toggleShowDetails}>
                  info {showDetails ? <Close /> : <Open />}
                </button>

                <div className="download-button">
                  {data && data.pdf.pdfDbKey && (
                    <a href={`https://s3-ap-southeast-2.amazonaws.com/openlawnz-pdfs/${data.pdf.pdfDbKey}`} download>
                      <Download alt="Download" className="download-icon" />
                    </a>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="case-document-viewer">
                  <div id="adobe-dc-view"></div>
                </div>
                <div className={showDetails ? (!data ? "case-details loading" : "case-details") : "hide-case-details"}>
                  <h3 className="header">Citations known for this case</h3>
                  {data &&
                    data.caseCitations &&
                    (data.caseCitations === 0 ? (
                      <p>None</p>
                    ) : (
                      <div role="listitem" className="item">
                        {data.caseCitations.map(obj => (
                          <div role="listitem" className="item" key={`cites-reference-${obj.citation}`}>
                            {obj.citation}
                          </div>
                        ))}
                      </div>
                    ))}
                  <hr></hr>

                  <h3 className="header">Cites</h3>
                  {data &&
                    data.cites &&
                    (data.cites.length === 0 ? (
                      <p>No cases</p>
                    ) : (
                      <div role="listitem" className="item">
                        {data.cites.map(obj => (
                          <div role="listitem" className="item" key={`cites-reference-${obj.id}`}>
                            <Link to={`/case/${obj.id}`}>{obj.caseName}</Link>
                          </div>
                        ))}
                      </div>
                    ))}
                  <hr></hr>

                  <h3 className="header">Cited by</h3>
                  {data &&
                    data.casesCitedsByCaseCited &&
                    (data.casesCitedsByCaseCited.length === 0 ? (
                      <p>No cases</p>
                    ) : (
                      <div role="listitem" className="item">
                        {data.casesCitedsByCaseCited.map(obj => (
                          <div role="listitem" className="item" key={`cited-by-reference-${obj.caseByCaseOrigin.id}`}>
                            <Link to={`/case/${obj.caseByCaseOrigin.id}`}>{obj.caseByCaseOrigin.caseName}</Link>
                          </div>
                        ))}
                      </div>
                    ))}
                  <hr></hr>

                  <h3 className="header">Legislation Referenced</h3>
                  {data &&
                    data.legislationToCases &&
                    (data.legislationToCases.length === 0 ? (
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
                          {data.legislationToCases.map((obj, i) => (
                            <tr className="" key={`legislation-reference-${i}`}>
                              <td className="">{obj.legislation.title}</td>
                              <td className="">{obj.section}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ))}
                  <hr></hr>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default SingleCase
