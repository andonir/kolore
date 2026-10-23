const AddProductPrice = ({price, setPrice})=>{
    return <div className="add-product-price">
        <h3>Precio</h3>
        <input type="text" placeholder="Ej. 18.99" value={price} onChange={(e)=>setPrice(e.target.value)}/>
    </div>
}

export default AddProductPrice