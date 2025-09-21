import React, { useContext, useState } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItems = () => {
  const {
    getTotalCartAmount,
    all_product,
    cartItems,
    removeFromCart,
    addToCart,
  } = useContext(ShopContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rentalDays, setRentalDays] = useState(6);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentError, setPaymentError] = useState('');

  const isCartEmpty = Object.values(cartItems).every((qty) => qty === 0);
  const totalAmount = getTotalCartAmount();
  const lateFeePerDay = totalAmount * 0.2;

  const handleCheckout = () => {
    if (isCartEmpty) {
      alert('Your cart is empty. Please add items before proceeding to checkout.');
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRentalDays(6);
    setConfirmMessage('');
    setPaymentMethod('');
    setPaymentError('');
  };

  const handleRentalDaysChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) setRentalDays(value);
  };

  const confirmPurchase = () => {
    if (!paymentMethod) {
      setPaymentError('Please select a payment method before confirming.');
      return;
    }

    setConfirmMessage(
      `Rental confirmed for ${rentalDays} days using ${paymentMethod}. Thank you for your order!`
    );
    setPaymentError('');

    setTimeout(closeModal, 3000);
  };

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

      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className='carticon-product-icon' />
                <p className="cart-item-name">{e.name}</p> {/* <-- Added class here */}
                <p>Rs. {e.new_price}</p>
                <div className='cartitems-quantity-controls'>
                  <button onClick={() => removeFromCart(e.id)}>-</button>
                  <span>{cartItems[e.id]}</span>
                  <button onClick={() => addToCart(e.id)}>+</button>
                </div>
                <p>Rs. {e.new_price * cartItems[e.id]}</p>
                <img
                  className='cartitems-remove-icon'
                  src={remove_icon}
                  onClick={() => removeFromCart(e.id)}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Sub-total</p>
              <p>Rs. {totalAmount}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>Rs. {totalAmount}</h3>
            </div>
          </div>
          <button onClick={handleCheckout}>
            PROCEED TO CHECKOUT
          </button>
        </div>

        {/* Checkout Modal */}
        {isModalOpen && (
          <div className="checkout-modal">
            <div className="checkout-modal-content">
              <h2>Checkout Summary</h2>
              {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                  return (
                    <div key={e.id}>
                      <p>{e.name} x {cartItems[e.id]}</p>
                      <p>Total: Rs. {e.new_price * cartItems[e.id]}</p>
                    </div>
                  );
                }
                return null;
              })}
              <h3>Total: Rs. {totalAmount}</h3>

              {/* Rental Period Input */}
              <label>
                Rental Period (in days):
                <input
                  type="number"
                  value={rentalDays}
                  onChange={handleRentalDaysChange}
                  min={6}
                  max={10}
                />
              </label>
              {rentalDays > 6 && (
                <p className="error">* Late returns beyond 6 days will incur a ₹{lateFeePerDay}/day charge.</p>
              )}

              {/* Payment Method Selection */}
              <label>
                Select Payment Method:
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  <option value="">-- Select --</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="UPI">UPI</option>
                  <option value="Cash on Delivery">Cash on Delivery</option>
                </select>
              </label>
              {paymentError && <p className="error">{paymentError}</p>}
              {confirmMessage && <p className="success">{confirmMessage}</p>}

              <div style={{ marginTop: '20px' }}>
                <button onClick={closeModal}>Cancel</button>
                <button onClick={confirmPurchase}>Confirm Purchase</button>
              </div>
            </div>
          </div>
        )}

        {/* Promo Section */}
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder='promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
