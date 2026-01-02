import React from "react";

function ProductCard(props) {
  const { items, cart, addToCart, increaseQty, decreaseQty } = props;

  const cartItem = cart.find((item) => item.name === items.name);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="card">
      <div className="card-img">
        <picture>
          <source media="(min-width: 1024px)" srcSet={items.image.desktop} />
          <source media="(min-width: 600px)" srcSet={items.image.tablet} />
          <img
            src={items.image.mobile}
            alt={items.name}
            className={`food-card-img ${quantity > 0 ? "selected" : ""}`}
          />
        </picture>

        {quantity === 0 ? (
          <button className="add-to-cart" onClick={() => addToCart(items)}>
            <img
              src="/product-images/images/icon-add-to-cart.svg"
              alt=""
              style={{ width: "30px" }}
            />
            Add to Cart
          </button>
        ) : (
          <div className="qty-controls">
            <button
              onClick={() => decreaseQty(items.name)}
              className="decrease-btn"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => increaseQty(items.name)}
              className="increase-btn"
            >
              +
            </button>
          </div>
        )}
      </div>
      <div className="item-details">
        <p>{items.category}</p>
        <h2>{items.name}</h2>
        <span className="price">${items.price.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default React.memo(ProductCard);
