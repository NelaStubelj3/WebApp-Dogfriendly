import React from "react";

const Textarea = (props) => {
  return (
    <div className="div-80">
      <label>{props.text}:</label>
      <br/>
      <textarea id={props.id} className={props.error && props.error.length > 0 ? "input-field input-field-error" : "input-field input-field-ok"} onChange={props.onChange} defaultValue={props.value}/>
      <br/>
      {props.error && props.error.length > 0 &&
        <p className="error-message">{props.error}</p>
      }
    </div>
  );
};

export default Textarea;
