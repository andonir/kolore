import { createContext, useState, useEffect } from "react";
import {supabase} from "../supabase/client"

export const Context = createContext(null);
export const ContextProvider = (props) => {
  const [showCart, setShowCart] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

const [DBData, setDBData] = useState(null)
const [selectedProducts, setSelectedProducts] = useState([])
const [selectedDPAgesColors, setSelectedDPAgesColors] = useState([])

const [showAdminNav, setShowAdminNav] = useState(false)
const [showCheckoutModal, setShowCheckoutModal] = useState(false)
useEffect(() => {

    // 1. Check session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2. Listen to changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // 3. Clean
    return () => {
      subscription.unsubscribe();
    };


  }, []);

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartList,
        setCartList,
        selectedProducts, 
        setSelectedProducts,
        totalPrice,
        setTotalPrice,
        session, loading,
        selectedDPAgesColors, 
        setSelectedDPAgesColors,
        DBData,
        setDBData,
        showAdminNav,
        setShowAdminNav,
        showCheckoutModal,
        setShowCheckoutModal
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
