import  { useContext, useEffect, useState } from 'react'
import "./cartitems.css"
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from "../Assets/cart_cross_icon.png"
import { AuthContext } from '../../Context/AuthContext'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useNavigate } from 'react-router-dom'

const CartItems = () => {
    const navigate=useNavigate()
    const {  user } = useContext(AuthContext);
    const {setCartItems,cartItems,removeFromCart}=useContext(ShopContext)
    const totalAmount = cartItems.reduce((total, item) => total + item.new_price , 0);

    const handleCheckout=()=>{
        alert("ordered successfully")
        navigate("/")
    }

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const userDocRef = doc(db, 'users', user.email);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                 
                    setCartItems(userData.cartItems || []);
                } else {
                    console.log('User document does not exist in Firestore.');
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchCartItems();
        }
    }, [user?.email]);
    
      if (loading) return <div>Loading...</div>;
    
  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p className='ml-20'>Price</p>
            <p>Quantity</p> 
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
       
            <hr />
            {cartItems.map((e,index)=>{
               
                    return  <div key={index}>
                    <div className="cart-items-format cartitems-format-main">
                        <img className='carticon-producticon' src={e.image} alt="" />
                        <p className='w-[212px]'>{e.name}</p>
                        <p className='ml-[-110px]'>{e.new_price}</p>
                        <button className='cart-items-quantity'>{e.quantity}</button>
                        <p>${e.new_price*e.quantity}</p>
                        <img className='cart-remove' onClick={()=>{removeFromCart(e.id)}}  src={remove_icon} alt="" />
                    </div>
                    </div>
                
                // return null
            })}
            <div className="cartitems-down">
                <div className="cart-items-total">
               
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${totalAmount}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${totalAmount}</h3>
                        </div>
                    </div>
                    <button className='mx-auto' onClick={handleCheckout}>Proceed to checkout</button>
                </div>
              
            </div>
        

    </div>
  )
}

export default CartItems