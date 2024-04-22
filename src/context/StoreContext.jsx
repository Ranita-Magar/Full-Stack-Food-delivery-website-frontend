import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
export const StoreContext = createContext(null);
import axios from "axios";

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (ItemId) => {
    //first we check if user is adding items in cart for the first time
    //this created new entry for our product item if that item isn't already in our cart then it executes if statement
    
    if (!cartItems[ItemId]) {
      setCartItems((prev) => ({ ...prev, [ItemId]: 1 }));
    } //gets executed if user add item in cart for the first time
    
    else {
      setCartItems((prev) => ({ ...prev, [ItemId]: prev[ItemId] + 1 }));
    } //gets executed if any product item is already in the cart


    //checks if token is available
    if (token) { 
      // when we are logged in , we'll have token, when we add product to our cart, that product will be added in the db cartData also
      await axios.post(url+"/api/cart/add", {ItemId}, {headers:{token}})
    }
  };


  const removeFromCart = async (ItemId) => {

    setCartItems((prev) => ({ ...prev, [ItemId]: prev[ItemId] - 1 })); //decrease value by 1

    if (token) {
      await axios.post(url+"/api/cart/remove", {ItemId}, {headers:{token}} )
      
    }
  }; 

  //   useEffect(() => {
  //     console.log(cartItems);
  //   }, [cartItems]);


  const getTotalCartAmount = () => {
     let TotalAmount = 0;

    for (const item in cartItems) {
      {
        /*  for in loop is used because cartItems is an object and this loop iterate over that object and it  will provide item one by one & this item will be the key value of the cartItems */
      }

      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        
        // Check if itemInfo is not undefined before accessing its properties
      if (itemInfo) {
        TotalAmount += itemInfo.price * cartItems[item];
      }
      }
    }
    return TotalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
  
      const response = await axios.post(url + "/api/cart/get", {}, { headers: { token}});
      setCartItems(response.data.cartData);
  }

  useEffect(() => { 
    async function loadData() {
      await fetchFoodList();
    
      if (localStorage.getItem("token")) {
         setToken(localStorage.getItem("token"));
         await loadCartData(localStorage.getItem("token"));
        } 
      }
       loadData(); 
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
