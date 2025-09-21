import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState('');

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }
    // Optionally pass size if your cart supports it
    addToCart(product.id);
    alert(`Added ${product.name} (${selectedSize}) to cart.`);
  };

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {[...Array(4)].map((_, idx) => (
            <img key={idx} src={product.image} alt="" />
          ))}
        </div>
        <div className="productdisplay-img">
          <img className='productdisplay-main-img' src={product.image} alt="" />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>

        <div className="productdisplay-right-stars">
          {[...Array(4)].map((_, i) => (
            <img key={i} src={star_icon} alt="star" />
          ))}
          <img src={star_dull_icon} alt="star" />
          <p>(122)</p>
        </div>

        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">Rs. {product.old_price}</div>
          <div className="productdisplay-right-price-new">Rs. {product.new_price}</div>
        </div>

        <div className="productdisplay-right-description">
          Elevate your style effortlessly with our premium collection of clothing, designed to make every occasion special. Available in various sizes and crafted for comfort and elegance, each piece is handpicked to ensure quality and trendiness. Rent it for 6 days, enjoy the spotlight, and leave the cleaning to us! Experience fashion that’s affordable, sustainable, and hassle-free.
        </div>

        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div
                key={size}
                className={selectedSize === size ? "selected-size" : ""}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <button className="add-to-cart-btn" onClick={handleAddToCart}>ADD TO CART</button>

        <p className='productdisplay-right-category'>
          <span>Category:</span> {product.category}
        </p>
        <p className='productdisplay-right-category'>
          <span>Tags:</span> Modern, Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
