import {useState, useContext} from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import PayMentForm from "./PayMentForm";

const Cart = (props) => {
  const [isCheckout, setisCheckout] = useState(false);

  const [SubmittingFirebase, setSubmittingFirebase] = useState(false);

  const [didSubmit, setdidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);
  const cartTotalAmountCtx = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItems(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount: 1});
  };

  const orderHandlerPay = () => {
    setisCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setSubmittingFirebase(true);

    await fetch(
      "https://products-c9843-default-rtdb.firebaseio.com/orders.json",
      {
        method: "post",
        body: JSON.stringify({
          user: userData,
          orderItems: cartCtx.items,
        }),
      }
    );

    setSubmittingFirebase(false);
    setdidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          Ctxkey={item.id}
          Ctxname={item.name}
          Ctxamount={item.amount}
          Ctxprice={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.CloseModalCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandlerPay}>
          Order
        </button>
      )}
    </div>
  );

  const modalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{cartTotalAmountCtx}</span>
      </div>
      {/* {isCheckout && <PayMentForm  cancelPayForm={props.CloseModalCart}  />} */}
      {isCheckout && (
        <PayMentForm
          onconfirm={submitOrderHandler}
          cancelPayForm={props.CloseModalCart}
        />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const isSubmitMadalContent = <p>sending order data ... </p>;

  const didSubmittingContent = (
    <>
      <p>succusfuly send order</p>

      <div className={classes.actions}>
        <button className={classes.button} onClick={props.CloseModalCart}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal CloseModalWindow={props.CloseModalCart}>
      {!SubmittingFirebase && !didSubmit && modalContent}
      {SubmittingFirebase && isSubmitMadalContent}
      {!SubmittingFirebase && didSubmit && didSubmittingContent}
    </Modal>
  );
};

export default Cart;
