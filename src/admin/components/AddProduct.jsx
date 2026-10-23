import { addDataToDB } from "../../supabase/functions";
import { useContext, useEffect, useState } from "react";
import AddProductProperty from "./AddProductProperty";
import AddProductPrice from "./AddProductPrice";
import { Context } from "../../Context/Context";
import {
  readProducts,
  readAges,
  readSizes,
  readSexes,
  addProduct
} from "../../supabase/functions";

const AddProduct = () => {
  const {
    selectedProducts,
    setSelectedProducts,
    selectedColors,
    setSelectedColors,
    selectedAges,
    setSelectedAges,
    selectedSizes,
    setSelectedSizes,
    selectedSexes,
    setSelectedSexes,
  } = useContext(Context);
  const [colors, setColors] = useState([])
  const [ages, setAges] = useState([])
  const [price, setPrice] = useState([])
  

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
      <h2>ADD PRODUCT</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" name="productType" placeholder="Nombre del producto" />
        <AddProductProperty type={'colors'} typeArr={colors} setTypeArr={setColors}/>
        <AddProductProperty type={'ages'} typeArr={ages} setTypeArr={setAges}/>
        <AddProductPrice price={price} setPrice={setPrice}></AddProductPrice>
        <button type="submit">Añadir</button>
      </form>
      </div>
    </>
  );
};

export default AddProduct;
