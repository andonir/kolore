import { MdDelete } from "react-icons/md";

import { Context } from "../../Context/Context";
import { useContext } from "react";
const CartItem = ({ type, size, id, price, name, img }) => {
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
        <p>{size}</p>
        <p>{price}€</p>
        <MdDelete
          className="delete-icon"
          onClick={() => handleClick()}
        ></MdDelete>
      </div>
    </>
  );
};

export default CartItem;
