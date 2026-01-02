import { useState, useEffect, useCallback } from "react";
import data from "./components/data.json";
import ProductCard from "./components/ItemCard";
import Cart from "./components/Cart";
import "./App.css";
import OrderConfirmedMode from "./components/OrderConfirmedMode";

function App() {
  const items = data;
  const [cart, setCart] = useState([]);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.name === item.name
      );
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const increaseQty = useCallback((itemName) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === itemName ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }, []);

  const decreaseQty = useCallback((itemName) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.name === itemName
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

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
      addToCart={addToCart}
      increaseQty={increaseQty}
      decreaseQty={decreaseQty}
    />
  ));

  return (
    <div className="app">
      <div className="food-cards">
        <header>
          <h1 className="food-type">Desserts</h1>
        </header>
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
