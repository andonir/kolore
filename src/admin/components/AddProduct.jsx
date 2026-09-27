import { addDataToDB } from "../../supabase/functions";
import { useContext, useEffect, useState } from "react";
import AddProductProperty from "./AddProductProperty";
import { Context } from "../../Context/Context";
import {
  readProducts,
  readColors,
  readAges,
  readSizes,
  readSexes,
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
  const [sexes, setSexes] = useState([])
  

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  

  
  return (
    <>
    <div className="add-product">
      <h2>ADD PRODUCT</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" name="productType" placeholder="Nombre del producto" />
        <AddProductProperty type={'colors'} typeArr={colors} setTypeArr={setColors}/>
        <AddProductProperty type={'ages'} typeArr={ages} setTypeArr={setAges}/>
        <AddProductProperty type={'sexes'} typeArr={sexes} setTypeArr={setSexes}/>
        <button type="submit">Añadir</button>
      </form>
      </div>
    </>
  );
};

export default AddProduct;
