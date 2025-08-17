import {useRef, useState} from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [inputbtnValidation, setinputbtnValidation] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const userItemInput = amountInputRef.current.value; //string
    const enteredNumber = +userItemInput; // convert string to number

    if (
      userItemInput.trim().length === 0 ||
      enteredNumber < 1 ||
      enteredNumber > 5
    ) {
      // validation show error
      setinputbtnValidation(false);
      return;
    }
    props.onAddToCart(enteredNumber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        labelObj=" Amount :"
        passObjInput={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!inputbtnValidation && <p>Please enter (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
