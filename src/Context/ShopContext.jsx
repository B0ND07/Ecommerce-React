import { createContext, useContext, useState } from "react";
import all_product from "../Components/Assets/all_product";
import {  doc,  setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "./AuthContext";

export const ShopContext = createContext(null);


const ShopContextProvider = (props) => {
  const { user } = useContext(AuthContext);

  const [cartItems, setCartItems] = useState([]); 

  const addToCart = async (newProduct) => {
    if (user?.email) {
      try {
        // Check if the product already exists in the cart
        const existingProductIndex = cartItems.findIndex((item) => item.id === newProduct.id);
        if (existingProductIndex !== -1) {
          // If the product exists, update its quantity in the local state
          setCartItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[existingProductIndex].quantity += 1;
            return updatedItems;
          });
  
          // Update the cart items in Firebase
          const userDocRef = doc(db, "users", user.email);
          await updateDoc(userDocRef, { cartItems: cartItems }); // Update the entire cartItems array in Firebase
        } else {
          // If the product doesn't exist, add it to the cart with quantity 1
          setCartItems((prevItems) => [...prevItems, { ...newProduct, quantity: 1 }]);
          
          // Update the cart items in Firebase
          const userDocRef = doc(db, "users", user.email);
          await setDoc(userDocRef, { cartItems: [...cartItems, { ...newProduct, quantity: 1 }] }); // Add the new product to Firebase
        }
      } catch (error) {
        console.error("Error adding item to cart:", error);
        // Handle error (e.g., show error message to user)
      }
    }
  };
  
 
  const removeFromCart = async (itemId) => {
  
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);

   
    const userDocRef = doc(db, "users", user.email);
    await updateDoc(userDocRef, { cartItems: updatedCartItems });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };
  const getTotalCartItems = () => {
    const totalItem = cartItems.length;
    return totalItem;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
