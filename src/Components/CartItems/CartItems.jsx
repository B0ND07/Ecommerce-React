import React, { useContext } from 'react'
import "./cartitems.css"
import { ShopContext } from '../Context/ShopContext'
import remove_icon from "../Assets/cart_cross_icon.png"

const CartItems = () => {
    const {getTotalCartAmount,all_product,cartItems,removeFromCart}=useContext(ShopContext)
  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
       
            <hr />
            {all_product.map((e)=>{
                if(cartItems[e.id]>0){
                    return  <div>
                    <div className="cart-items-format cartitems-format-main">
                        <img className='carticon-producticon' src={e.image} alt="" />
                        <p>{e.name}</p>
                        <p>{e.new_price}</p>
                        <button className='cart-items-quantity'>{cartItems[e.id]}</button>
                        <p>${e.new_price*cartItems[e.id]}</p>
                        <img className='cart-remove' onClick={()=>{removeFromCart(e.id)}}  src={remove_icon} alt="" />
                    </div>
                    </div>
                }
                return null
            })}
            <div className="cartitems-down">
                <div className="cart-items-total">
                    <h1>cart totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button>Proceed to checkout</button>
                </div>
              
            </div>
        

    </div>
  )
}

export default CartItems