import React from 'react'

const Button = ({ specific, navLink, text, type }) => {

  return (
    <button type={type} className={`button ${specific} `} onClick={navLink}>
      <span className="button-content">{text}</span>
    </button>
  )
}

export default Button;