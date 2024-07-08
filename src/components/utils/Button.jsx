import React from 'react'

const Button = ({ specific, onClick, text, type }) => {

  return (
    <button type={type} className={`button ${specific} `} onClick={onClick}>
      <span className="button-content">{text}</span>
    </button>
  )
}

export default Button;