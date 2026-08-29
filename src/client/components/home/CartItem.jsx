import { MdDelete } from "react-icons/md";

import { Context } from "../../../Context/Context";
import { useContext } from "react";
const CartItem = ({ type, size, id, price, name, img, color }) => {
  const { cartList, setCartList, setTotalPrice } = useContext(Context);
  const handleClick = () => {
    setTotalPrice((prevPrice) => Math.round((prevPrice - price) * 100) / 100);
    const list = cartList;
    const newList = list.filter((item) => {
      return item.id !== id;
    });
    setCartList(newList);
  };
  return (
    <>
      <div className="cart-item">
        <img src={img} alt="cart-product-img" />
        <h3>{name}</h3>
        <p className="type">
          {type === "shirt"
            ? "Kamiseta"
            : type === "sweater"
              ? "Jertsea"
              : type === "bag"
                ? "Poltza"
                : null}
        </p>
        {type !== "bag" && <p className="size">{size}</p>}
        <div
          className={
            color === "red"
              ? "color red"
              : color === "green"
                ? "color green"
                : color === "blue"
                  ? "color blue"
                  : color === "yellow"
                    ? "color yellow"
                    : "color"
          }
        ></div>
        <p className="price">{price}€</p>

        <MdDelete
          className="delete-icon"
          onClick={() => handleClick()}
        ></MdDelete>
      </div>
    </>
  );
};

export default CartItem;
