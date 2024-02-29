import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/Login";
import Footer from "./Components/Footer/Footer";
import men_banner from "./Assets/banner_mens.png";
import women_banner from "./Assets/banner_women.png";
import kids_banner from "./Assets/banner_kids.png";
import SignUp from "./Pages/SignUp";
import { useContext, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { ShopContext } from "./Context/ShopContext";
import { AuthContext } from "./Context/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext);
  const { setCartItems } = useContext(ShopContext);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (user?.email) {
          const userDocRef = await doc(db, "users", user?.email);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setCartItems(userData.cartItems || []);
          } else {
            console.log("User document does not exist in Firestore.");
          }
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        console.log();
      }
    };

    if (user?.email) {
      fetchCartItems();
    }
  }, [user?.email]);
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Shop />
              </>
            }
          />
          <Route
            path="/men"
            element={
              <>
                <ShopCategory banner={men_banner} category="men" />
              </>
            }
          />
          <Route
            path="/women"
            element={
              <>
                <ShopCategory banner={women_banner} category="women" />
              </>
            }
          />
          <Route
            path="/kids"
            element={
              <>
                <ShopCategory banner={kids_banner} category="kid" />
              </>
            }
          />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
