import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import Breadcrums from '../Breadcrums/Breadcrums'
import ProductDisplay from '../ProductDisplay/ProductDisplay'

const Product = () => {
  const {all_product}=useContext(ShopContext)
  const {productId}=useParams()
  const product=all_product.find((e)=>e.id=== Number(productId))

  console.log('productId:', productId);
  console.log('product:', product);
  return (
    <div>
        
        <Breadcrums product={product}/>
        <ProductDisplay product={product}/>
    </div>
  )
}

export default Product