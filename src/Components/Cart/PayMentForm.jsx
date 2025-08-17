import {useRef, useState} from "react";
import classes from "./PayMentForm.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const PayMentForm = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    nameinserted: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputsValidity({
      nameinserted: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    //userdataro behesh pas midim
    props.onconfirm({
      name: enteredName,
      Street: enteredStreet,
      PostalCode: enteredPostalCode,
      City: enteredCity,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.nameinserted ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="nameinserted">Your Name</label>
        <input type="text" id="nameinserted" ref={nameInputRef} />
        {!formInputsValidity.nameinserted && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postal (5 chars) code!</p>
        )}
      </div>

      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.cancelPayForm}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default PayMentForm;

// import React from "react";
// import classes from "./PayMentForm.module.css";
// import {useRef, useState} from "react";

// //validation
// const isEmpty = (value) => {
//   value.trim() === "";
// };
// const isFiveChars = (value) => {
//   value.trim().length === 5;
// };

// const PayMentForm = (props) => {
//   const [FormIsValidity, setFormIsValidity] = useState({
//     nameinserted: true,
//     street: true,
//     postal: true,
//     city: true,
//   });

//   const nameInputRef = useRef();
//   const streetInputRef = useRef();
//   const postalcdInputRef = useRef();
//   const cityInputRef = useRef();

//   const ConfirmHandler = (event) => {
//     event.preventDefault();

//     const enterednameRef = nameInputRef.current.value;
//     const enteredstreetRef = streetInputRef.current.value;
//     const enteredpostalcdRef = postalcdInputRef.current.value;
//     const enteredcityRef = cityInputRef.current.value;

//     const enterednameValid = !isEmpty(enterednameRef);
//     const enteredstreetValid = !isEmpty(enteredstreetRef);
//     const enteredpostalcdValid = isFiveChars(enteredpostalcdRef);
//     const enteredcityValid = !isEmpty(enteredcityRef);

//     setFormIsValidity({
//       nameinserted: enterednameValid,
//       street: enteredstreetValid,
//       postal: enteredpostalcdValid,
//       city: enteredcityValid,
//     });

//     const formIsValid =
//       enterednameValid &&
//       enteredstreetValid &&
//       enteredpostalcdValid &&
//       enteredcityValid;

//     if (!formIsValid) {
//       return;
//     }
//     // sent to firebase
//   };

//   const controllNameClass = `${classes.control} ${
//     FormIsValidity.nameinserted ? "" : classes.invalid
//   }`;

//   const controllStreetClass = `${classes.control} ${
//     FormIsValidity.street ? "" : classes.invalid
//   }`;

//   const controllPostelcdClass = `${classes.control} ${
//     FormIsValidity.postal ? "" : classes.invalid
//   }`;

//   const controllCityClass = `${classes.control} ${
//     FormIsValidity.city ? "" : classes.invalid
//   }`;

//   return (
//     <form className={classes.form} onSubmit={ConfirmHandler}>
//       <div className={controllNameClass}>
//         <label htmlFor="nameinserted">Your Name</label>
//         <input type="text" id="nameinserted" ref={nameInputRef} />
//         {!FormIsValidity.nameinserted && <p>Please enter a valid name!</p>}
//       </div>

//       <div className={controllStreetClass}>
//         <label htmlFor="street">Street</label>
//         <input type="text" id="street" ref={streetInputRef} />
//         {!FormIsValidity.street && <p>Please enter a valid street!</p>}
//       </div>

//       <div className={controllPostelcdClass}>
//         <label htmlFor="postal">Postal Code</label>
//         <input type="text" id="postal" ref={postalcdInputRef} />
//         {!FormIsValidity.postalCode && (
//           <p>Please enter a valid postal (5 chars) code!</p>
//         )}
//       </div>

//       <div className={controllCityClass}>
//         <label htmlFor="city">City</label>
//         <input type="text" id="city" ref={cityInputRef} />
//         {!FormIsValidity.city && <p>Please enter a valid city!</p>}
//       </div>
//       <div className={classes.actions}>
//         <button type="button" onClick={props.cancelPayForm}>
//           Cancel
//         </button>
//         <button className={classes.submit}>Confirm</button>
//       </div>
//     </form>
//   );
// };

// export default PayMentForm;
