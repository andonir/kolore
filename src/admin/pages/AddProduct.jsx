
import { logOut } from "../../supabase/functions"
import { useContext, useEffect, useState } from "react";
import AddProductProperty from "../components/AddProductProperty"
import AddProductPrice from "../components/AddProductPrice";
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
  
  useEffect(()=>{
    setShowAdminNav(false)
  },[])
  const handleSubmit = (e) => {
    e.preventDefault()

  let processedAges = ages.map(age=>{
      let sizes = age.sizes.replace(/[()]/g, '') 
      let sizesArr = sizes.split(',')
      return {name: age.name, sizes: sizesArr}
  })
  console.log(price)
  addProduct(e.target.productType.value,colors, processedAges, price)
  };
  

  
  return (
    <>
    <div className="add-product">
      <h2>Añadir producto</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" className="product-type" name="productType" placeholder="Nombre del producto" />
        <AddProductProperty type={'colors'} typeArr={colors} setTypeArr={setColors}/>
        <AddProductProperty type={'ages'} typeArr={ages} setTypeArr={setAges}/>
        <AddProductPrice price={price} setPrice={setPrice}></AddProductPrice>
        <button type="submit" className="submit-button">Añadir producto</button>
      </form>
      </div>
    </>
  );
};

export default AddProduct;
