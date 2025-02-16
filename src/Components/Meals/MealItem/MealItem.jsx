import React from "react";
import { useContext } from "react";
import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const itemprice = `$${props.propsprice.toFixed(2)}`;

  const addToCartHandler = (useEmount) => {
    cartCtx.addItem({
      id: props.propsId,
      name: props.propsName,
      amount: useEmount,
      price: props.propsprice,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.propsName}</h3>
        <div className={classes.description}>{props.propsdescription}</div>
        <div className={classes.price}>{itemprice}</div>
      </div>
      <div>
        <MealItemForm id={props.propsId} onAddToCart={addToCartHandler} />
        {/* <MealItemForm id={props.propsId} onAddToCart={addToCartHandler} /> */}
      </div>
    </li>
  );
};

export default MealItem;
