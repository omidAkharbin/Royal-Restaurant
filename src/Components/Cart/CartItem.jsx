import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const AvailablePrice = `$${props.Ctxprice.toFixed(2)}`;

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.Ctxname}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{AvailablePrice}</span>
          <span className={classes.amount}> X {props.Ctxamount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
