import React from "react";

const Checkbox = (props) => {
    return (
        <span className={props.classProp}>
            {props.text && <label>{props.text}:</label>}
            <input
                id={props.id}
                type="checkbox" 
                defaultChecked={props.checked}
                onChange={props.onChange}
                name={props.name}
                className="checkbox"/>
        </span>
    )
}

export default Checkbox;