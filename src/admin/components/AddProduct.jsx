import { addDataToDB } from "../../supabase/functions";
import { useContext } from "react";
const AddProduct = ()=>{
    const handleSubmit = (e)=>{
        e.preventDefault()
        let productType = e.target.productType.value;
        let colorsTxt = e.target.colors.value;
        let agesTxt = e.target.ages.value;
        let sizesTxt = e.target.sizes.value;
        let sexesTxt = e.target.sexes.value;
        let colors= colorsTxt == '' ? [] : JSON.parse(colorsTxt)

        let ages = agesTxt.split(',').filter(Boolean)
        let sizes = sizesTxt.split(',').filter(Boolean)
        let sexes = sexesTxt.split(',').filter(Boolean)
        addDataToDB({productType, colors, ages, sizes, sexes})
    }
    return <>
    <h2>ADD PRODUCT</h2>
    <form onSubmit={(e)=>handleSubmit(e)}>
        <input type="text" name="productType" placeholder="product-type"/>
        <input type="array" name="colors" placeholder="colors"/>
        <input type="text" name="ages" placeholder="ages"/>
        <input type="text" name="sizes" placeholder="sizes"/>
        <input type="text" name="sexes" placeholder="sexes"/>
        <button>Añadir</button>
    </form>
    </>
}

export default AddProduct