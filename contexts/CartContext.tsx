import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [storeDelivery, setStoreDelivery] = useState(null);

  const addToCart = (produto, deliveryOption) => {
    if (storeDelivery === null) {
      setStoreDelivery(deliveryOption);
    }
    setCartItems(oldItems => {
      const exists = oldItems.find(i => i.id === produto.id);
      if (exists) {
        return oldItems.map(i =>
          i.id === produto.id
            ? { ...i, quantidade: i.quantidade + 1 }
            : i
        );
      }
      return [...oldItems, { ...produto, quantidade: 1 }];
    });
  };

  const removeFromCart = produtoId => {
    setCartItems(oldItems => {
      const newItems = oldItems
        .map(i =>
          i.id === produtoId
            ? { ...i, quantidade: Math.max(0, i.quantidade - 1) }
            : i
        )
        .filter(i => i.quantidade > 0);
      if (newItems.length === 0) {
        setStoreDelivery(null);
      }
      return newItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setStoreDelivery(null);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      storeDelivery,
      addToCart,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
