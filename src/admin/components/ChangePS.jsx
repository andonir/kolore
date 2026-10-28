import { useEffect, useState } from "react"
import { changeOrderPS } from "../../supabase/functions"
const ChangePS = ({selectedOrder, setSelectedOrder, setOrders})=>{
    const [newStatus, setNewStatus] = useState(null)
    const [currentStatus, setCurrentStatus] = useState(null)
    useEffect(()=>{
        if(selectedOrder.payment_status == 'ordaindu gabe'){
            setNewStatus('ordainduta')
        }else{
            setNewStatus('ordaindu gabe')
        }
    },[])
    useEffect(()=>{
        if(!currentStatus) return
        setOrders((prevOrders)=> 
        prevOrders.map((order)=>order.id == selectedOrder.id ? {...order, payment_status: currentStatus}: order)
        )
        setSelectedOrder(null)

    },[currentStatus])
    const handleBtnClick = ()=>{
        changeOrderPS(selectedOrder.id, newStatus, setCurrentStatus)
       

    }
    const handleOverlayClick = (e) => {
        // Cierra el modal solo si se hace clic en el fondo oscuro
        if (e.target === e.currentTarget) {
          setSelectedOrder(null)
        }
      }
    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-card">
            {/* Botón de cerrar (X) */}
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setSelectedOrder(null)}
              aria-label="Cerrar modal"
            >
              ✕
            </button>
    
            <div className="modal-header">
              <h3>Actualizar estado de pago</h3>
              <p className="modal-subtitle">
                Pedido #<strong>{selectedOrder.id}</strong>
              </p>
            </div>
    
            <div className="modal-body">
              <div className="status-info-box">
                <span className="status-label">Estado actual</span>
                <span
                  className={`status-badge ${
                    selectedOrder.payment_status === "ordainduta"
                      ? "paid"
                      : "unpaid"
                  }`}
                >
                  {selectedOrder.payment_status}
                </span>
              </div>
    
              <p className="modal-description">
                ¿Deseas cambiar el estado a <strong>"{newStatus}"</strong>?
              </p>
            </div>
    
            <div className="modal-footer">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setSelectedOrder(null)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={handleBtnClick}
              >
                Cambiar a "{newStatus}"
              </button>
            </div>
          </div>
        </div>
      )
}

export default ChangePS