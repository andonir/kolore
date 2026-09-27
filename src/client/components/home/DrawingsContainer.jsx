import { useState, useContext, useEffect } from "react";
import DrawingItem from "./DrawingItem";
import { FaShoppingCart } from "react-icons/fa";
import { Context } from "../../../Context/Context";
import Cart from "./Cart";
const DrawingsContainer = () => {
  const { cartList,showCart, setShowCart, products, DBData } = useContext(Context);
  const [selected, setSelected] = useState("shirts");
  return (
    <section className="drawings-container">
      <Cart></Cart>
      <div className="container-top">
        <div className="shopping-cart">
          <FaShoppingCart
            className="cart-icon"
            onClick={() => setShowCart(true)}
          ></FaShoppingCart>
          {cartList.length> 0 && <span className="cart-list">{  cartList.length}</span>}
        </div>
      </div>
      <div className="drawings">
        {DBData?.map((drawing, i) => {
          return (
            <DrawingItem
              key={i}
              id={drawing?.id}
              name={drawing?.name}
              img={drawing?.url}
              products={drawing?.products}
            ></DrawingItem>
          );
        })}
      </div>
    </section>
  );
};

export default DrawingsContainer;
