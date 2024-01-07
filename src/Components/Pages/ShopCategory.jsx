import React, { useContext } from 'react'
import "./CSS/ShopCatefory.css"
import { ShopContext } from '../Context/ShopContext'
import drop_icon from "../Assets/dropdown_icon.png"
import Item from "../Item/Item"


const ShopCategory = (props) => {
  const {all_product}=useContext(ShopContext)
  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span>out of 36 prod
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={drop_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product.map((item,index)=>{
          if(props.category===item.category){
            return <Item key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
          }else{
            return null;
          }
        })}
      </div>
      <div className="loadmore">
        Explore More
      </div>
    </div>
  )
}

export default ShopCategory