
import { logOut } from "../../supabase/functions"
import { useContext, useEffect, useEffectEvent, useState } from "react";
import AddProductProperty from "../components/AddProductProperty"
import AddProductPrice from "../components/AddProductPrice";
import AddProductAge from "../components/AddProductAge";
import { Context } from "../../Context/Context";
import {
  addProduct
} from "../../supabase/functions";

const AddProduct = () => {
  const {
    setShowAdminNav
  } = useContext(Context);
  const [colors, setColors] = useState([])
  const [ages, setAges] = useState([])
  const [price, setPrice] = useState([])
  const [inputColorName, setInputColorName] = useState('')
  const [inputColorHex, setInputColorHex] = useState('')
  const [isClothing, setIsClothing] = useState(false)
  useEffect(() => {
    setShowAdminNav(false)
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault()

    let processedAges = ages.map(age => {
      let sizes = age.sizes.replace(/[()]/g, '')
      let sizesArr = sizes.split(',')
      return { name: age.name, sizes: sizesArr, colors: age.colors, price: age.price }
    })
    addProduct(e.target.productType.value, processedAges)
  };
  const handleAddColor = () => {

  }
  return (
    <>

      <div className="add-product">
        <h2>Añadir producto</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" className="product-name" placeholder="Nombre del producto" />
          <div className="product-type-selector">
            <p>Ropa</p>
            <label className="switch">
              <input type="checkbox" onChange={(e) => setIsClothing(e.target.checked)} checked={isClothing} />
              <span className="slider"></span>
            </label>
          </div>
          {isClothing ? <>
            <AddProductAge ages={ages} setAges={setAges}></AddProductAge>
            <button type="submit" className="submit-button">Añadir producto</button>
          </> :
            <div className="simple-product">
              <div className="add-color">
                <h4>Colores</h4>
                <input type="text" value={inputColorName} placeholder="Nombre" onChange={(e) => setInputColorName(e.target.value)} />
                <input type="text" value={inputColorHex} placeholder="Hex" onChange={(e) => setInputColorHex(e.target.value)} />
                <button type="button" onClick={() => handleAddColor()}>Añadir color</button>
              </div>
            </div>



          }
        </form>
      </div>
    </>
  );
};

export default AddProduct;
