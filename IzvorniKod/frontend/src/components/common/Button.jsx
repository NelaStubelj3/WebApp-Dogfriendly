import React from 'react'

const Button = ({ color, text, deco }) => {
  return (
    <button
      style={{ backgroundColor: color, textDecoration: deco }}
      className="btn"
    >
      {text}
    </button>
  );
};

export default Button;
