
import { MdExpandMore } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { readColors } from "../../supabase/functions"
import { Context } from "../../Context/Context";
const DProductColorsSelector = ({ product, open}) => {
    const { selectedDPColors, setSelectedDPColors, } = useContext(Context)
    const [colors, setColors] = useState([])

    useEffect(() => {
        readColors(setColors, product.id)
        setSelectedDPColors((prev)=>{
            if(prev.find(obj => obj.productId == product.id)) return prev
            else return [...prev, {productId: product.id, selectedColors: []}]
        
        })
    }, [])


    const handleH3Click = () => {
        if (open) setOpen(false)
        else setOpen(true)
    }
    const handleCheck = (id, name, hex) => {
        setSelectedDPColors((prev) =>{        
        return prev.map(obj => {
            if(obj.productId == product.id){
                return {
                    productId: product.id,
                    selectedColors: obj.selectedColors.find(color=>color.id == id) ? obj.selectedColors.filter(color=>color.id !== id) : [...obj.selectedColors, {id, name, hex}]
                }
            }
            return obj 
        })
        }
        )
    }
    // const handleCheckAll = () => {
    //     selectedColors.length == colors.length ? setSelectedColors([]) :
    //         setSelectedType(typeList.map((item) => ({ id: item.id, name: item.name, ...(item.hex && { hex: item.hex }) })))
    // }
    return <>
        <div className={open ? "dproduct-colors-selector open" : "dproduct-colors-selector"}>
            <div className={open ? "checkboxes open" : "checkboxes"}>
                {colors && colors.map((color, i) => {
                    return <div key={i} className="checkbox">
                        <input type="checkbox" name={color?.name} id={color?.id} onChange={() => handleCheck(color.id, color.name, color.hex)} checked={selectedDPColors.find(obj=>obj.productId == product.id)?.selectedColors.some(col => col.id === color.id)} />
                        <label htmlFor={color.id}>{color.name}</label>
                        <div className="color-div" style={{ backgroundColor: color.hex }}></div>
                    </div>
                })}

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