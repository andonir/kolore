import { Context } from "../../Context/Context";
import { useContext, useState } from "react";
const ContainerItem = ({type, id, price, name, img}) => {
  
    const {cartList, setCartList, setTotalPrice} = useContext(Context)
    const [selectedItem, setSelectedItem] = useState(false)
    const [size, setSize] = useState(null)
    const handleAddtoCartBtnClick =(e)=>{
            e.stopPropagation()
        if(size){
          setTotalPrice((prevPrice)=>Math.round((prevPrice+price)*100)/100)
          const cartId= crypto.randomUUID()
        setCartList((prevList)=> [...prevList, {
          id: cartId,
            type,
            size,
            price,
            name,
            img
        }])
        }else alert('Aukeratu talla')
        
    }
    const handleItemClick = ()=>{
      if (selectedItem) setSelectedItem(false)
      else setSelectedItem(true)
    }
    const handleSizeBtnClick = (e, size)=>{
      e.stopPropagation()
      setSize(size)
    }
    return (
    <>
    <div className={selectedItem ? "container-item selected-item" : "container-item"} onClick={()=>handleItemClick()}>
    
      <img src={img} alt="product-img"/>
      <h2>{name}</h2>
      <p>{price}€</p>
      
    
    <div className="item-bottom">
      <div className="size">
        <button className={size === "XS" ? "size-btn selected-size": "size-btn"} onClick={(e)=>handleSizeBtnClick(e, "XS")}>XS</button>
        <button className={size === "S" ? "size-btn selected-size": "size-btn"} onClick={(e)=>handleSizeBtnClick(e, "S")}>S</button>
        <button className={size === "M" ? "size-btn selected-size": "size-btn"} onClick={(e)=>handleSizeBtnClick(e, "M")}>M</button>
        <button className={size === "L" ? "size-btn selected-size": "size-btn"} onClick={(e)=>handleSizeBtnClick(e, "L")}>L</button>
      </div>
  <button className="add-to-cart"onClick={(e)=>handleAddtoCartBtnClick(e)}>Karritora gehitu</button>
      </div>
    </div>
    

    </>
  );
};

export default ContainerItem;
