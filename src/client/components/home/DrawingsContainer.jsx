import { useState, useContext } from "react";
import DrawingItem from "./DrawingItem";
import { FaShoppingCart } from "react-icons/fa";
import { Context } from "../../../Context/Context";
import Cart from "./Cart";
const DrawingsContainer = () => {
  const { cartList,showCart, setShowCart, products } = useContext(Context);
  const [selected, setSelected] = useState("shirts");
  return (
    <section className="drawings-container">
      <Cart></Cart>
      <div className="container-top">
        {/* <div className="clothes-selector">
          <button
            className={selected === "shirts" ? "shirts selected" : "shirts"}
            onClick={() => setSelected("shirts")}
          >
            Kamisetak
          </button>
          <button
            className={
              selected === "sweaters" ? "sweaters selected" : "sweaters"
            }
            onClick={() => setSelected("sweaters")}
          >
            Jertseak
          </button>
        </div> */}
        <div className="shopping-cart">
          <FaShoppingCart
            className="cart-icon"
            onClick={() => setShowCart(true)}
          ></FaShoppingCart>
          {cartList.length> 0 && <span className="cart-list">{  cartList.length}</span>}
        </div>
      </div>
      <div className="drawings">
        {products["drawings"].map((product, i) => {
          return (
            <DrawingItem
              key={i}
              id={product.id}
              name={product.name}
              img={product.img}
            ></DrawingItem>
          );
        })}
      </div>
    </section>
  );
};

export default DrawingsContainer;
