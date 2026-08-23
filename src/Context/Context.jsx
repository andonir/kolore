import { createContext, useState } from "react";
import camiseta1 from "../assets/camiseta1.png";
import camiseta2 from "../assets/camiseta2.png";
import camiseta3 from "../assets/camiseta3.png";
import camiseta4 from "../assets/camiseta4.png";
import jertsea1 from "../assets/jertsea1.png";
import jertsea2 from "../assets/jertsea2.png";
import jertsea3 from "../assets/jertsea3.png";
import jertsea4 from "../assets/jertsea4.png";
export const Context = createContext(null);
const products = {
  shirts: [
    {
      id: crypto.randomUUID(),
      type: "shirt",
      price: 20.99,
      name: "kamiseta 1",
      img: camiseta1,
    },
    {
      id: crypto.randomUUID(),
      type: "shirt",
      price: 24.99,
      name: "kamiseta 2",
      img: camiseta2,
    },
    {
      id: crypto.randomUUID(),
      type: "shirt",
      price: 20.99,
      name: "kamiseta 3",
      img: camiseta3,
    },
    {
      id: crypto.randomUUID(),
      type: "shirt",
      price: 20.99,
      name: "kamiseta 4",
      img: camiseta4,
    },
  ],
  sweaters: [
    {
      id: crypto.randomUUID(),
      type: "sweater",
      price: 20.99,
      name: "jertsea 1",
      img: jertsea1,
    },
    {
      id: crypto.randomUUID(),
      type: "sweater",
      price: 20.99,
      name: "jertsea 2",
      img: jertsea2,
    },
    {
      id: crypto.randomUUID(),
      type: "sweater",
      price: 20.99,
      name: "jertsea 3",
      img: jertsea3,
    },
    {
      id: crypto.randomUUID(),
      type: "sweater",
      price: 20.99,
      name: "jertsea 4",
      img: jertsea4,
    },
  ],
};
export const ContextProvider = (props) => {
  const [showCart, setShowCart] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartList,
        setCartList,
        products,
        totalPrice,
        setTotalPrice,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
