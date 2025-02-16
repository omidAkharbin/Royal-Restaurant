import {React, createContext} from "react";

const CartContext = createContext({
  // default value
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItems: (id) => {},
  clearCart: () => {},
});

export default CartContext;
