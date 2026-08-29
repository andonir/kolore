import { Context } from "../../../Context/Context";
import { useContext, useState, useRef, useEffect } from "react";
const DrawingItem = ({ id, name, img }) => {
  const { cartList, setCartList, setTotalPrice, products } =
    useContext(Context);
  const [selectedItem, setSelectedItem] = useState(false);
  const [size, setSize] = useState(null);
  const [type, setType] = useState("shirt");
  const [color, setColor] = useState(null);
  const [price, setPrice] = useState(null);

  const itemRef = useRef(null);

  useEffect(() => {
     const media700 = window.matchMedia("(min-width: 700px)");
      const media1000 = window.matchMedia("(min-width: 1000px)");
      const handleChange = () => {
        if (itemRef.current) {
        itemRef.current.style.setProperty(
          "--height",
          `${itemRef.current.scrollHeight}px`,
        );
      }
    
     
    } 
    handleChange()
      media700.addEventListener('change', handleChange)
      media1000.addEventListener('change', handleChange)
    

    return ()=>{
      media700.removeEventListener('change', handleChange)
      media1000.removeEventListener('change', handleChange)

    }
  }, [selectedItem]);
  useEffect(()=>{
    setPrice(products.prices[type])
  },[type]);
  const handleAddtoCartBtnClick = (e) => {
    e.stopPropagation();
    if (size && color || type === "bag" &&color) {
      setTotalPrice((prevPrice)=>Math.round((prevPrice+price)*100)/100)
      const cartId = crypto.randomUUID();
      setCartList((prevList) => [
        ...prevList,
        {
          id: cartId,
          type,
          size,
          price,
          name,
          img,
          color
        },
      ]);
      setSelectedItem(false)
    } else alert("Aukeratu ezaugarri guztiak mesedez");
  };
  const handleItemClick = () => {
    if (selectedItem) setSelectedItem(false);
    else setSelectedItem(true);
  };
  const handleSizeBtnClick = (e, newSize) => {
    setSize(newSize);
  };
  const handleColorBtnClick = (e, color) => {
    setColor(color);
  };
  return (
    <>
      <div
        ref={itemRef}
        className={selectedItem ? "drawing-item selected-item" : "drawing-item"}
        onClick={() => handleItemClick()}
      >
        <img src={img} alt="product-img" />
        <h2>{name}</h2>

        <div className="item-bottom" onClick={(e) => e.stopPropagation()}>
          <div className="type">
            <select
              id="product-type"
              name="product-type"
              value={type}
              onChange={(e) => {
                setType(e.target.value)
              }}
            >
              <option value="shirt">Kamiseta</option>
              <option value="sweater">Jertsea</option>
              <option value="bag">Poltza</option>
            </select>
          </div>
          <div className="color">
            <button
              className={
                color === "red"
                  ? "color-btn selected-color red"
                  : "sizecolor red"
              }
              onClick={(e) => handleColorBtnClick(e, "red")}
            ></button>
            <button
              className={
                color === "green"
                  ? "color-btn selected-color green"
                  : "sizecolor green"
              }
              onClick={(e) => handleColorBtnClick(e, "green")}
            ></button>
            <button
              className={
                color === "blue"
                  ? "color-btn selected-color blue"
                  : "sizecolor blue"
              }
              onClick={(e) => handleColorBtnClick(e, "blue")}
            ></button>
            <button
              className={
                color === "yellow"
                  ? "color-btn selected-color yellow"
                  : "sizecolor yellow"
              }
              onClick={(e) => handleColorBtnClick(e, "yellow")}
            ></button>
          </div>
          {(type === "shirt" || type === "sweater") && (
            <div className="size">
              <button
                className={
                  size === "XS" ? "size-btn selected-size" : "size-btn"
                }
                onClick={(e) => handleSizeBtnClick(e, "XS")}
              >
                XS
              </button>
              <button
                className={size === "S" ? "size-btn selected-size" : "size-btn"}
                onClick={(e) => handleSizeBtnClick(e, "S")}
              >
                S
              </button>
              <button
                className={size === "M" ? "size-btn selected-size" : "size-btn"}
                onClick={(e) => handleSizeBtnClick(e, "M")}
              >
                M
              </button>
              <button
                className={size === "L" ? "size-btn selected-size" : "size-btn"}
                onClick={(e) => handleSizeBtnClick(e, "L")}
              >
                L
              </button>
            </div>
          )}
          {type && (
            <div className="price">
              <p>{products.prices[type]}€</p>
            </div>
          )}
          <button
            className="add-to-cart"
            onClick={(e) => handleAddtoCartBtnClick(e)}
          >
            Karritora gehitu
          </button>
        </div>
      </div>
    </>
  );
};

export default DrawingItem;
