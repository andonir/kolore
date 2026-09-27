import { addImg, addDataToDB} from "../../supabase/functions"
import CheckBox from "./CheckBox"
import { Context } from "../../Context/Context"
import {useContext, useEffect,useState } from "react"
import { readProducts, readColors, readAges, readSizes, readSexes} from "../../supabase/functions"
const AddDrawing = () => {
    const {selectedProducts, setSelectedProducts, selectedColors, setSelectedColors, selectedAges, setSelectedAges, selectedSizes, setSelectedSizes, selectedSexes, setSelectedSexes} = useContext(Context)
    const [products, setProducts] = useState(null)
    const [colors, setColors] = useState(null)
    const [ages, setAges] = useState(null)
    const [sizes, setSizes] = useState(null)
    const [sexes, setSexes] = useState(null)
    useEffect(() => {
        readProducts(setProducts)
        readColors(setColors)
        readAges(setAges)
        readSizes(setSizes)
        readSexes(setSexes)

        }, [])
    const handleSubmit = (e) => {
        e.preventDefault()
-        addImg(e.target.img.files?.[0], e.target.name.value, selectedProducts, selectedColors, selectedAges, selectedSizes, selectedSexes)
        // addDataToDB({ productType, colors, ages, sizes, sexes })
    }
    return <div className="add-drawing">
        <h2>Add Drawing</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
                <input type="file" accept="image/*" name="img" />
                <input type="text" name="name" placeholder="nombre" />
            
                {/* Products */}
                <CheckBox type={'products'} typeList={products}  selectedType={selectedProducts} setSelectedType={setSelectedProducts}></CheckBox>
                {/* <CheckBox type={'colors'} typeList={colors}  selectedType={selectedColors} setSelectedType={setSelectedColors}></CheckBox>
                <CheckBox type={'ages'} typeList={ages} selectedType={selectedAges} setSelectedType={setSelectedAges}></CheckBox>
                <CheckBox type={'sizes'} typeList={sizes} selectedType={selectedSizes} setSelectedType={setSelectedSizes}></CheckBox>
                <CheckBox type={'sexes'} typeList={sexes} selectedType={selectedSexes} setSelectedType={setSelectedSexes}></CheckBox> */}

            <button>Add</button>

        </form>
    </div>

}

export default AddDrawing


const handleSubmit = (e) => {
    e.preventDefault()
    let productType = e.target.productType.value;
    let colorsTxt = e.target.colors.value;
    let agesTxt = e.target.ages.value;
    let sizesTxt = e.target.sizes.value;
    let sexesTxt = e.target.sexes.value;
    let colors = colorsTxt == '' ? [] : JSON.parse(colorsTxt)

    let ages = agesTxt.split(',').filter(Boolean)
    let sizes = sizesTxt.split(',').filter(Boolean)
    let sexes = sexesTxt.split(',').filter(Boolean)
    addDataToDB({ productType, colors, ages, sizes, sexes })
}