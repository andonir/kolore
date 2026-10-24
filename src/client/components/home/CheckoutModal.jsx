import { useContext, useState } from "react"
import { Context } from "../../../Context/Context"
import { IoClose } from "react-icons/io5";
import { insertOrder } from "../../../supabase/functions";
const CheckoutModal = () => {
    const { showCheckoutModal, setShowCheckoutModal, cartList } = useContext(Context)
    const price = cartList.reduce((acc, item) => acc + item.price, 0)
    
    const [name,setName] = useState("")
    const [firstSurname,setFirstSurname] = useState("")
    const [secondSurname,setSecondSurname] = useState("")
    const [phone,setPhone] = useState("")
    const [address,setAddress] = useState("")
    const [orderId, setOrderId] = useState(null)
    const [orderPrice, setOrderPrice] = useState(null)
    const handleSubmit = (e)=>{
        e.preventDefault()
        insertOrder(name, firstSurname, secondSurname, phone, address, price, cartList, setOrderId, setOrderPrice)
        if(orderId){
            setName("")
            setFirstSurname("")
            setSecondSurname("")
            setPhone("")
            setAddress("")
        }
    }
    
    
    return <div className={showCheckoutModal ? "checkout-modal show" : "checkout-modal"}>
        <div className="checkout-modal-container">
            <div className="top">
                <h2>Información del cliente</h2>
                <IoClose
                    className="close-icon"
                    onClick={() => setShowCheckoutModal(false)}
                ></IoClose>
            </div>
            <div className="cart-info">
                <p>Precio total: {price.toFixed(2)} €</p>
                <p>Num. productos: {cartList?.length}</p>
            </div>
            <form onSubmit={(e)=>handleSubmit(e)}>
            <input type="text" placeholder="Nombre" value={name} onChange={(e)=>setName(e.target.value)} required/>
                <div className="surnames">
                    <input type="text" placeholder="Primer Apellido" value={firstSurname} onChange={(e)=>setFirstSurname(e.target.value)} required/>
                    <input type="text" placeholder="Segundo Apellido" value={secondSurname} onChange={(e)=>setSecondSurname(e.target.value)} required/>
                </div>
                <input type="text" placeholder="Teléfono" value={phone} onChange={(e)=>setPhone(e.target.value)} required/>
                <input type="text" placeholder="Dirección" value={address} onChange={(e)=>setAddress(e.target.value)} required/>
                <button type="submit">Comprar</button>
            </form>
            {orderId && <div className="order-info">
                <p>Pedido realizado correctamente. Muchas gracias!</p>
                <p>El pedido está en estado "pendiente". Haga un bizum a "111222333" para finalizar el pedido. <b>Adjunte el id del pedido como concepto.</b></p>
                <p>Id del pedido: <b>{orderId}</b></p>
                <p>Precio del pedido: <b>{orderPrice}</b>€</p>
                <p><b>IMPORTANTE: GUARDE BIEN EL ID DEL PEDIDO</b></p>
                <p><b>En caso de perder el identificador, o ante cualquier imprevisto, contacte a este número: "111222333"</b></p>
            </div>}
        </div>

    </div>
}

export default CheckoutModal