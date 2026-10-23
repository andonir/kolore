import { Context } from "../../../Context/Context";
import { useContext, useState, useRef, useEffect } from "react";
const DrawingItem = ({ id, name, img, products }) => {
  const { cartList, setCartList, setTotalPrice } =
    useContext(Context);
  const [selectedItem, setSelectedItem] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [price, setPrice] = useState(null);
  const itemRef = useRef(null);

  useEffect(() => {
    const media700 = window.matchMedia("(min-width: 700px)");
    const media1000 = window.matchMedia("(min-width: 1000px)");
    const handleChange = () => {
      if (itemRef.current) {
        //   itemRef.current.style.setProperty(
        //      "--height",
        //      `${itemRef.current.scrollHeigh}px`,
        //  );
      }


    }
    handleChange()
    media700.addEventListener('change', handleChange)
    media1000.addEventListener('change', handleChange)


    return () => {
      media700.removeEventListener('change', handleChange)
      media1000.removeEventListener('change', handleChange)

    }
  }, [selectedItem]);

  useEffect(() => {
    setPrice(selectedProduct?.price)
  }, [selectedProductId]);

  const handleAddtoCartBtnClick = (e) => {
    e.stopPropagation();
    if (selectedSize && selectedColor) {
      setTotalPrice((prevPrice) => Math.round((prevPrice + price) * 100) / 100)
      const cartId = crypto.randomUUID();
      setCartList((prevList) => [
        ...prevList,
        {
          id: cartId,
          drawingName: name,
          productId: selectedProductId,
          productName: selectedProduct.name,
          size: selectedSize,
          price,
          img,
          color: selectedColor
        },
      ]);
      setSelectedItem(false)
    } else alert("Aukeratu ezaugarri guztiak mesedez");
  };
  const handleItemClick = () => {
    if (selectedItem) setSelectedItem(false);
    else setSelectedItem(true);
  };
  const handleSizeBtnClick = (newSize) => {
    setSelectedSize(newSize);
  };
  const handleColorBtnClick = (color) => {
    setSelectedColor(color);
  };

  const handleSelectProduct = (e)=>{
    setSelectedProductId(e.target.value)
    setSelectedProduct(products.find(product=>product.id == e.target.value))
    setSelectedSize(null)
  }
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
              value={selectedProductId}
              onChange={(e) => handleSelectProduct(e)}
            >
              <option value="">Seleccionar</option>
              {
                products.map((product, i) =>
                  <option key={i} value={product.id}>{product.name}</option>
                )
              }
            </select>
          </div>
          <div className="color">
            {
              products.find(product => product.id == selectedProductId)?.colors.map((col, i) => {
                return <button key={i}
                  className={
                    selectedColor === col
                      ? "color-btn selected-color"
                      : "color-btn"
                  }
                  style={{ backgroundColor: col.hex }}
                  onClick={(e) => handleColorBtnClick(col)}
                ></button>
              })
            }

          </div>
          {(selectedProductId !== "") && (
          <div className="ages-container">
            <div className="ages">
            {
                 selectedProduct?.ages.map((age, i)=>{
                    return <button className={
                      selectedAge == age ? "age-btn selected-age" : "age-btn"
                    }key={i} onClick={()=>setSelectedAge(age)}>{age.age.name}</button>
                  })
                 
              }
            </div> 
          {selectedAge && 
              <div className="sizes">
                {selectedAge.sizes.map((size, i)=>{
                  return <button
                  key={i}
                  className={
                    selectedSize === size ? "size-btn selected-size" : "size-btn"
                  }
                  onClick={(e) => handleSizeBtnClick(size)}
                >
                  {size.name}
                </button>
                })}
              </div>}
            </div>

          )}
          {selectedProductId && (
            <div className="price">
              <p>{selectedProduct.price}€</p>
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
