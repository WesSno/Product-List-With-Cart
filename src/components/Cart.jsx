import { useMemo } from "react";

function Cart(props) {
  const { cart, removeFromCart, onConfirm } = props;

  const totalQuantity = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const orderTotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

  return (
    <div className="cart">
      <h2>Your Cart ({totalQuantity})</h2>

      {cart.length === 0 ? (
        <>
          <img
            src="/product-images/images/illustration-empty-cart.svg"
            alt="empty cart illustration"
          />
          <p>Your added items will appear here</p>
        </>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.name} className="cart-item">
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.name}</p>
                  <div className="item-amount">
                    <p className="cart-item-qty">{item.quantity}x</p>
                    <p className="cart-item-price">@ {item.price.toFixed(2)}</p>
                    <p>${(item.quantity * item.price).toFixed(2)}</p>
                  </div>
                </div>

                <button onClick={() => removeFromCart(item.name)}>
                  <img
                    src="/product-images/images/icon-remove-item.svg"
                    alt="remove item"
                  />
                </button>
              </div>
            ))}
          </div>

          <div className="order-total">
            <p>Order Total</p>
            <h3>${orderTotal.toFixed(2)}</h3>
          </div>

          <div className="climate-action">
            <img
              src="/product-images/images/icon-carbon-neutral.svg"
              alt="carbon neutral"
            />
            <p>
              This is a <span className="highlight">carbon neutral</span>{" "}
              delivery
            </p>
          </div>

          {cart.length > 0 && (
            <button className="confirm-order" onClick={onConfirm}>
              Confirm Order
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;
