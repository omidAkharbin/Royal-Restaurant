import {useReducer} from "react";
import CartContext from "./cart-context";

const defaultCartReducer = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type == "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.items[existingCartItemIndex];

    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;

    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const Mainupdateditem = {
        ...existingItem,
        amount: existingItem.amount - 1,
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = Mainupdateditem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type == "Clear") {
    return defaultCartReducer;
  }

  return defaultCartReducer;
};

const CartProvider = (props) => {
  const [cartState, dipatchCartAction] = useReducer(
    cartReducer,
    defaultCartReducer
  );

  const addItemToCartHandler = (item) => {
    dipatchCartAction({type: "ADD", item: item});
  };

  const removeItemFromCartHandler = (id) => {
    dipatchCartAction({type: "REMOVE", id: id});
  };

  const clearItemOfCartHandler = () => {
    dipatchCartAction({
      type: "clear",
    });
  };

  const cartContextValue = {
    // real context value
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItems: removeItemFromCartHandler,
    clearCart: clearItemOfCartHandler,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
