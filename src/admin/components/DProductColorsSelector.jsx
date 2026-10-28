
import { MdExpandMore } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { readColors, readAgesColors } from "../../supabase/functions"
import { Context } from "../../Context/Context";
const DProductColorsSelector = ({ product, open }) => {
    const { selectedDPAgesColors, setSelectedDPAgesColors } = useContext(Context)
    // const [colors, setColors] = useState([])
    const [agesColors, setAgesColors] = useState([])
    useEffect(() => {
        // readColors(setColors, product.id)
        readAgesColors(setAgesColors, product.id)
        setSelectedDPAgesColors((prev) => {
            if (prev.find(obj => obj.productId == product.id)) return prev
            else return [...prev, { productId: product.id, selectedAgesColors: [] }]

        })
    }, [])

    const handleCheck = (ageId, color) => {
        setSelectedDPAgesColors((prev) => {
            return prev.map(obj => {
                if (obj.productId !== product.id) return obj;
                const currentAges= obj.selectedAgesColors || []
                const existingAge = currentAges.find((a)=>a.ageId === ageId)
                let updatedAges
                if(existingAge){
                    const hasColor = existingAge.colors.some((c)=>c.id === color.id)
                    const updatedColors = hasColor ? existingAge.colors.filter((c)=>c.id !== color.id)
                    :[...existingAge.colors, color]
                    if(updatedColors.length === 0){
                        updatedAges = currentAges.filter((a)=>a.ageId !== ageId)
                    }else{
                        updatedAges= currentAges.map((a)=>a.ageId ===ageId ? {...a, colors: updatedColors}:a)
                    }
                }else{
                    updatedAges=[
                        ...currentAges,
                        {ageId: ageId,
                        colors:[{id:color.id, name: color.name, hex:color.hex}]}
                    ]
                }
                return{
                    ...obj,
                    selectedAgesColors:updatedAges
                }
            })
        }
        )
    }
    const isChecked = (ageId, colorId) =>{
        const productState = selectedDPAgesColors.find((obj)=>obj.productId === product.id)
        if(!productState || !productState.selectedAgesColors) return false
        const ageObj = productState.selectedAgesColors.find((a)=>a.ageId === ageId)
        return ageObj ? ageObj.colors.some((c)=>c.id ===colorId):false
    }

    return <>
        <div className={open ? "dproduct-colors-selector open" : "dproduct-colors-selector"}>
            <div className={open ? "checkboxes open" : "checkboxes"}>
                {agesColors && agesColors?.map((age, i) => {
                    return <div className="ages-colors" key={i}>
                        <h4>{age.name}</h4>
                        {age.colors.map((color, j) => {
                            return <div key={j} className="checkbox">
                                 <input type="checkbox" name={color?.name} id={color.PACId} onChange={() => handleCheck(age.id,color)} checked={isChecked(age.id, color.id)} />
                                <label htmlFor={color.PACId}>{color.name}</label>
                                <div className="color-div" style={{ backgroundColor: color.hex }}></div> 
                            </div>

                        })}

                    </div>
                })}
                {/* {colors && colors.map((color, i) => {
                    return <div key={i} className="checkbox">
                        <input type="checkbox" name={color?.name} id={color?.id} onChange={() => handleCheck(color.id, color.name, color.hex)} checked={selectedDPAgesColors.find(obj=>obj.productId == product.id)?.selectedColors.some(col => col.id === color.id)} />
                        <label htmlFor={color.id}>{color.name}</label>
                        <div className="color-div" style={{ backgroundColor: color.hex }}></div>
                    </div>
                })} */}

            </div>
        </div>
        {/* 
        <div className="checkbox-container">
            <div className="top">
                <h3 onClick={() => handleH3Click()}>{type == 'products' ? 'Productos' : type == 'ages' ? 'Edades' : type == 'sizes' ? 'Tallas' : type == 'sexes' ? 'Sexo' : 'Colores'} <MdExpandMore className="expand-icon" /></h3>
                <div className="check-all">
                    <input type="checkbox" id={'checkAll'} onChange={() => handleCheckAll()} />
                    <label htmlFor={'checkAll'}>Check all</label></div>
            </div>
            <div className={open ? "checkboxes open" : "checkboxes"}>
                {typeList && typeList.map((item, i) => {
                    return <div key={i} className="checkbox">
                        <input type="checkbox" name={item?.name} id={item?.id} onChange={() => handleCheck(item.id, item.name)} checked={selectedType?.some(obj => obj.id === item.id)} />
                        <label htmlFor={item.id}>{item.name}</label>
                        {type == 'colors' && <div className="color-div" style={{ backgroundColor: item.hex }}></div>}
                    </div>
                })}

            </div>


        </div> */}
    </>

}





export default DProductColorsSelector