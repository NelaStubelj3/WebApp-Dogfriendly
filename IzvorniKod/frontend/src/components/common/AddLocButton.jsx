import React from 'react'

const AddLocButton = ({ color, deco }) => {
  return (
    <div className="btn-container">
    <button
      style={{ backgroundColor: color, textDecoration: deco }}
      className="add-loc-btn"
    >
      {"+"}
    </button>
    </div>
  );
};

export default AddLocButton;