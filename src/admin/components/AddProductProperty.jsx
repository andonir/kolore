import { MdExpandMore } from "react-icons/md";
import { useContext, useEffect, useState } from "react";


const AddProductProperty = ({type, typeArr, setTypeArr})=>{


const [inputName, setInputName] = useState('')
  const [inputHex, setInputHex] = useState('')
      const [open, setOpen] = useState(true)


    const handleH3Click = () => {
        if (open) setOpen(false)
        else setOpen(true)
    }
    const addPropertyItem = (e) =>{
    if(type =='colors') setTypeArr(prevArr=> [...prevArr, {name: inputName, hex: inputHex}])
    else if (type =='ages') setTypeArr(prevArr=> [...prevArr, {name: inputName}])
  }
    return <div className="property">
            <h3 onClick={() => handleH3Click()}>{type}<MdExpandMore className="expand-icon" /></h3>
            {open && <div className="property-container">
                 <div className="property-items-container">
            
            {typeArr.map((item, i)=> <div key={i} className="property-item-display">
                    <h4>{item.name}</h4>
                    {type == 'colors' && <div className="color-div" style={{backgroundColor: item.hex}}></div>}
                </div>)}
            
            </div>
            <div className="add-property-item">
             
             <input type="text"  placeholder="Nombre" value={inputName} onChange={(e)=>setInputName(e.target.value)}/>
            {type == 'colors' &&<input type="text" placeholder="Código HEX" value={inputHex} onChange={(e)=>setInputHex(e.target.value)}/>}
            <button type="button" onClick={(e)=>addPropertyItem(e)}>Add property</button>
               
            </div>
            </div>}
        </div>
}

export default AddProductProperty