import { useEffect, useState } from "react"
import { selectOrders } from "../../supabase/functions"
import React from "react"
const Orders = () => {
    const [orders, setOrders] = useState(null)
    const [open, setOpen] = useState(null)
    useEffect(() => {
        selectOrders(setOrders)
    }, [])
    const handleRowClick = (id) => {
        if (open) setOpen(null)
        setOpen(id)
    }
    return <div className="orders">
        <h2>Pedidos</h2>
        <div className="orders-table">
            <div className="grid-header">
                <div >Id del pedido</div>
                <div >Nombre</div>
                <div >Primer apellido</div>
                <div >Segundo apellido</div>
                <div >Teléfono</div>
                <div >Dirección</div>
                <div >Precio total</div>
                <div >Estado del pedido</div>
                <div >Estado de pago</div>
                <div >Fecha</div>
            </div>
            {orders?.map((order, i) => {
                return <React.Fragment key={i}>
                    <div className={open == order.id ? "grid-row active" : "grid-row"} onClick={() => handleRowClick(order.id)}>
                        <div>{order.id}</div>
                        <div>{order.name}</div>
                        <div>{order.first_surname}</div>
                        <div>{order.second_surname}</div>
                        <div>{order.phone}</div>
                        <div>{order.address}</div>
                        <div>{order.total_price}€</div>
                        <div>{order.order_status}</div>
                        <div style={{backgroundColor: order.payment_status == 'ordaindu gabe' ? '#c98c87':order.payment_status == 'ordainduta' ? '#8fa58a': 'transparent'}}>{order.payment_status}</div>
                        <div>{order.created_at}</div>
                    </div>

                    {open == order.id && order.items.map((item, j) => {

                        return <div className="grid-items-panel" key={j}>
                            <h4>Elemento {j + 1}</h4>
                            <div className="grid-items-panel-container">
                                <p><b>Dibujo:</b> {item.drawing.name}</p>
                                <p><b>Producto:</b> {item.product.name}</p>
                                <p><b>Color:</b> {item.color.name}</p>
                                <p><b>Edad:</b> {item.age.name}</p>
                                <p><b>Talla:</b> {item.size.name}</p>
                                <p><b>Precio:</b> {item.price}€</p>

                            </div>

                        </div>
                    })}



                </React.Fragment>
            })}
        </div>
    </div>

}


export default Orders