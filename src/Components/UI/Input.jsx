import React from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.passObjInput.id}>{props.labelObj}</label>
      <input ref={ref} {...props.passObjInput} />
    </div>
  );
});

export default Input;
