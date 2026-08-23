import { Context } from "../../Context/Context";
import { useContext } from "react";
import { IoClose } from "react-icons/io5";
import CartItem from "./CartItem";
const Cart = () => {
  const { showCart, setShowCart, cartList,totalPrice} = useContext(Context);
  return (
    <section className={showCart ? "cart show" : "cart"}>
      <div className="cart-top">
        <h2>Karritoa</h2>
        <IoClose className="close-icon" onClick={()=>setShowCart(false)}></IoClose>
      </div>
      <div className="cart-container">
        {cartList.length == 0 ? <p>Oraindik ez duzu ezer aukeratu</p> : 
        cartList.map((item, i)=>{
            return <CartItem key={i} type={item.type}  id={item.id} size={item.size} price={item.price} name={item.name} img={item.img}/>
        })
        }
        
      </div>
      <div className="total-price"><h4>Guztira: {totalPrice}€</h4></div>
      <button className="buy">Erosi</button>
    </section>
  );
};
export default Cart;
