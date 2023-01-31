import React from "react";

const Field = (props) => {
  return (
    <div className={props.classProp + ' div-80'}>
      {props.text && <label>{props.text}:</label>}
      <br/>
      <input className={props.error && props.error.length > 0 ? "input-field input-field-error" : "input-field input-field-ok"} 
          type={props.type} 
          onChange={props.onChange} 
          placeholder={props.placeholder}
          onFocus={props.onFocus}
          name={props.name}
          defaultValue={props.value}
          id={props.id}
      />
      <br/>
      {props.error && props.error.length > 0 &&
        <p className="error-message">{props.error}</p>
      }
    </div>
  );
};

export default Field;
