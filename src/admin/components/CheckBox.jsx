import { MdExpandMore } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { readProducts } from "../../supabase/functions"
import { Context } from "../../Context/Context";
const CheckBox = ({ type, typeList, selectedType, setSelectedType }) => {
    const [open, setOpen] = useState(true)
    const handleH3Click = () => {
        if (open) setOpen(false)
        else setOpen(true)
    }
    const handleCheck = (id,name,hex) => {
        setSelectedType((prev) =>
            prev.some(item => item.id === id)? prev.filter(item => item.id !== id) : [...prev, {id,name, ...(hex && {hex})}]
        )
    }
    const handleCheckAll = () => {
        selectedType?.length == typeList.length ? setSelectedType([]) :
            setSelectedType(typeList.map((item) => ({id: item.id, name: item.name, ...(item.hex && {hex: item.hex})})))
    }
    return <div className="checkbox-container">
        <div className="top">
            <h3 onClick={() => handleH3Click()}>{type == 'products' ? 'Productos' : type == 'ages'? 'Edades' : type=='sizes'? 'Tallas' : type=='sexes'? 'Sexo': 'Colores'} <MdExpandMore className="expand-icon" /></h3>
            <div className="check-all">
                <input type="checkbox" id={'checkAll'} onChange={() => handleCheckAll()} />
                <label htmlFor={'checkAll'}>Check all</label></div>
        </div>
        <div className={open ? "checkboxes open" : "checkboxes"}>
            {typeList && typeList.map((item, i) => {
                return <div key={i} className="checkbox">
                    <input type="checkbox" name={item?.name} id={item?.id} onChange={() => handleCheck(item.id, item.name)} checked={selectedType?.some(obj => obj.id ===item.id)} />
                    <label htmlFor={item.id}>{item.name}</label>
                    {type=='colors' && <div className="color-div" style={{backgroundColor: item.hex}}></div>}
                </div>
            })}

        </div>


    </div>
}


export default CheckBox