import React from "react"

const ReadMore = props => {
  const [textStyle, setTextStyle] = React.useState(null)
  const [triggerStyle, setTriggerStyle] = React.useState(null)

  const showContent = e => {
    e.preventDefault()
    if (e) {
      setTextStyle({ height: "auto" })
      setTriggerStyle({ display: "none" })
    }
  }

  return (
    <p>
      <span className="text" id="text" style={textStyle}>
        {props.text}
      </span>
      <span className="readmore" id="readmore" style={triggerStyle}>
        ...
        <button
          className="a11y-button--unstyled readmore-text"
          onClick={showContent}
        >
          Read More
        </button>
      </span>
    </p>
  )
}

export default ReadMore
