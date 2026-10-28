import { MdExpandMore } from "react-icons/md";
import { useState } from "react";


const AddProductAge = ({ ages, setAges }) => {

    const [open, setOpen] = useState(true)

    const [inputSizes, setInputSizes] = useState('')
    const [inputColorName, setInputColorName] = useState('')
    const [inputColorHex, setInputColorHex] = useState('')
    const [colors, setColors] = useState([])
    const [ageInput, setAgeInput] = useState('')
    const [priceInput, setPriceInput] = useState('')
    const handleH3Click = () => {
        if (open) setOpen(false)
        else setOpen(true)
    }
    const handleAddColor = () => {
        setColors((prevColors) => [...prevColors, { name: inputColorName, hex: inputColorHex }])
    }
    const handleAddAge = () => {
        setAges((prevAges) => [...prevAges, { name: ageInput, sizes: inputSizes, colors, price: priceInput }])
        setInputSizes('')
        setInputColorName('')
        setInputColorHex('')
        setColors('')
        setAgeInput('')
    }
    return <div className="ages">
        <div className="ages-items-container">
            {ages.map((age, i) => {
                return <div className="age-item" key={i}>
                    <h4>{age.name}</h4>
                    <div className="age-item-content">
                        <p>Precio: {age.price}</p>
                        <p>Tallas: {age.sizes}</p>
                        <div className="age-item-colors">
                            <p>Colores: </p>
                            {age.colors.map((color, i) => {
                                return <div className="age-item-color-item" key={i}>
                                    <p>{color.name}</p>
                                    <div className="color-div" style={{ backgroundColor: color.hex }}></div>
                                </div>
                            })}
                        </div>
                    </div>

                </div>
            })}
        </div>
            <h3 onClick={() => handleH3Click()}>Edades<MdExpandMore className="expand-icon" /></h3>
            <input type="text" placeholder="Edad" value={ageInput} onChange={(e) => setAgeInput(e.target.value)} />

            {open &&
                <div className="add-age-items">
                    <div className="colors">
                        <div className="color-items">
                            {colors.length > 0 && colors?.map((color, i) => {
                                return <div key={i} className="color-item">
                                    <p>{color.name}</p>
                                    <div className="color-div" style={{ backgroundColor: color.hex }}></div>
                                </div>

                            })}
                        </div>
                        <div className="add-color">
                            <h4>Colores</h4>
                            <input type="text" value={inputColorName} placeholder="Nombre" onChange={(e) => setInputColorName(e.target.value)} />
                            <input type="text" value={inputColorHex} placeholder="Hex" onChange={(e) => setInputColorHex(e.target.value)} />
                            <button type="button" onClick={() => handleAddColor()}>Añadir color</button>
                        </div>

                    </div>
                    <div className="price">
                        <h4>Precio</h4>
                        <input type="text" value={priceInput} placeholder="Ej. 22" onChange={(e) => setPriceInput(e.target.value)} />
                    </div>
                    <div className="sizes">
                        <h4>Tallas</h4>
                        <input type="text" value={inputSizes} placeholder="Ej. (XS,S,M)" onChange={(e) => setInputSizes(e.target.value)} />
                    </div>


                </div>}
            <button className="add-age-btn" type="button" onClick={() => handleAddAge()}>Añadir edad</button>

    </div>
}

export default AddProductAge