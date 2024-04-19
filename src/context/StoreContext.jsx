import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (ItemId) => {
    //first we check if user is adding items in cart for the first time
    //this created new entry for our product item if that item isn't already in our cart then it executes if statement
    if (!cartItems[ItemId]) {
      setCartItems((prev) => ({ ...prev, [ItemId]: 1 }));
    } //gets executed if user add item in cart for the first time
    else {
      setCartItems((prev) => ({ ...prev, [ItemId]: prev[ItemId] + 1 }));
    } //gets executed if any product item is already in the cart
  };

  const removeFromCart = (ItemId) => {
    setCartItems((prev) => ({ ...prev, [ItemId]: prev[ItemId] - 1 }));
  }; //decrease value by 1

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;