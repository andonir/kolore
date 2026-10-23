import { MdDelete } from "react-icons/md";

import { Context } from "../../../Context/Context";
import { useContext } from "react";
const CartItem = ({
  id,
  drawingName,
  productId,
  productName,
  size,
  price,
  img,
  color
}) => {
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
        <h3>{drawingName}</h3>
        <p className="product-type">
          {productName}
        </p>
        <p className="size">{size.name}</p>
        <span className="color" style={{backgroundColor: color.hex}}></span>
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
