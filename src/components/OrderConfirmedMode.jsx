function OrderConfirmedMode({ cart, onStartNewOrder }) {
  const orderTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="overlay">
      <div className="mode">
        <div className="header">
          <img
            src="/product-images/images/icon-order-confirmed.svg"
            alt="order confirmed"
          />
          <h2>Order Confirmed</h2>
          <p>We hope you enjoy your food!</p>
        </div>

        <div className="confirmed-items">
          <div className="background">
            {cart.map((item) => (
              <div key={item.name} className="confirmed-item">
                <div className="img-and-info">
                  <img
                    src={item.image.thumbnail}
                    alt={item.name}
                    className="thumbnail"
                  />
                  <div className="confirmed-item-info">
                    <p className="name">{item.name}</p>
                    <div className="confirmed-item-nums">
                      <p className="qty">{item.quantity}x</p>
                      <p className="price">@{item.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                <p className="modal-subtotal">
                  ${(item.quantity * item.price).toFixed(2)}
                </p>
              </div>
            ))}
            <div className="mode-total">
              <p className="text">Order Total</p>
              <p className="num">${orderTotal.toFixed(2)}</p>
            </div>
          </div>

          <button onClick={onStartNewOrder} className="start-new-order">
            Start New Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmedMode;
