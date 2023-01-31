import React from "react";

const Select = (props) => {
  return (
    <div className="div-80">
      <label>{props.text}:</label>
      <br/>
      <select className="select-field" value={props.selected} onChange={props.onChange}>{props.options}</select>
    </div>
  );
};

export default Select;
