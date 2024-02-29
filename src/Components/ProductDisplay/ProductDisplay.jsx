import { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProductDisplay = (props) => {
  const navigate=useNavigate()
  const { user } = useContext(AuthContext);
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const handleCart=async()=>{
    if(user?.email){
      addToCart(product);
    }else{
      navigate("/login")
    }

     
   
  }
  return (
    <div className="productdisplay">
      <div className="productdisplayleft">
        <div className="productdis-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplayright">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(144)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
          perspiciatis, totam asperiores sit labore mollitia autem perferendis
          repellendus quos. Perferendis, laborum? Tenetur totam cupiditate
          illum, porro doloremque odio dicta qui!
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
          </div>
        </div>
        <button
          onClick={handleCart}
        >
          Add to cart
        </button>
        <p className="productdisplay-right-category">
          <span>Category:</span>Women, T-shirt, Crops
        </p>
        <p className="productdisplay-right-category">
          <span>Tags:</span>Modern, Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
