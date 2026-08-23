import { useState, useContext } from "react";
import ContainerItem from "./ContainerItem";
import { FaShoppingCart } from "react-icons/fa";
import { Context } from "../../Context/Context";
import Cart from "./Cart";
const ClothesContainer = () => {
  const { cartList,showCart, setShowCart, products } = useContext(Context);
  const [selected, setSelected] = useState("shirts");
  return (
    <section className="clothes-container">
      <Cart></Cart>
      <div className="container-top">
        <div className="clothes-selector">
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
        </div>
        <div className="shopping-cart">
          <FaShoppingCart
            className="cart-icon"
            onClick={() => setShowCart(true)}
          ></FaShoppingCart>
          {cartList.length> 0 && <span className="cart-list">{  cartList.length}</span>}
        </div>
      </div>
      <div className="items">
        {products[selected].map((product, i) => {
          return (
            <ContainerItem
              key={i}
              type={product.type}
              id={product.id}
              price={product.price}
              name={product.name}
              img={product.img}
            ></ContainerItem>
          );
        })}
      </div>
    </section>
  );
};

export default ClothesContainer;
