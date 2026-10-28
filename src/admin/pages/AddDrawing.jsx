import { addImg, addDataToDB } from "../../supabase/functions"
import CheckBox from "../components/CheckBox"
import { Context } from "../../Context/Context"
import { useContext, useEffect, useState } from "react"
import { readProducts, readAges, readSizes, readSexes } from "../../supabase/functions"
const AddDrawing = () => {
    const { selectedProducts, setSelectedProducts, selectedDPAgesColors, setShowAdminNav } = useContext(Context)
    const [products, setProducts] = useState(null)
    useEffect(() => {
        readProducts(setProducts)
        setShowAdminNav(false)
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault()
            addImg(e.target.img.files?.[0], e.target.name.value, selectedProducts, selectedDPAgesColors)
    }
    return <div className="add-drawing">
        <h2>Añadir dibujo</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
            <input type="file" className="file-input" accept="image/*" name="img" />
            <input type="text" name="name" placeholder="Nombre del dibujo" className="img-name-input" />
            <CheckBox type={'products'} typeList={products} selectedType={selectedProducts} setSelectedType={setSelectedProducts}></CheckBox>
            <button type="submit" className="submit-button">Añadir dibujo</button>
        </form>
    </div>

}

export default AddDrawing