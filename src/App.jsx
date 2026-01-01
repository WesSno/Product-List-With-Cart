import { useState, useEffect } from "react";
import data from "./components/data.json";
import ProductCard from "./components/ItemCard";
import Cart from "./components/Cart";
import "./App.css";
import OrderConfirmedMode from "./components/OrderConfirmedMode";

function App() {
  const [items, setItems] = useState(data);
  const [cart, setCart] = useState([]);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
  };

  const increaseQty = (itemName) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === itemName ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (itemName) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.name === itemName
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (itemName) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== itemName));
  };

  useEffect(() => {
    if (orderConfirmed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [orderConfirmed]);

  const desserts = items.map((item) => (
    <ProductCard
      key={item.name}
      items={item}
      cart={cart}
      setCart={setCart}
      addToCart={addToCart}
      increaseQty={increaseQty}
      decreaseQty={decreaseQty}
    />
  ));

  return (
    <div className="app">
      <div className="food-cards">
        <h1 className="food-type">Desserts</h1>
        {desserts}
      </div>
      <Cart
        cart={cart}
        removeFromCart={removeFromCart}
        onConfirm={() => setOrderConfirmed(true)}
      />

      {orderConfirmed && (
        <OrderConfirmedMode
          cart={cart}
          onStartNewOrder={() => {
            setCart([]);
            setOrderConfirmed(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
