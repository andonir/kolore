import { createContext, useState, useEffect } from "react";
import {supabase} from "../supabase/client"
import mendiak from "../assets/img/mendiak.png"
import olatua from "../assets/img/olatua.png"
import ortzadarra from "../assets/img/ortzadarra.png"
import sutan from "../assets/img/sutan.png"

import camiseta1 from "../assets/camiseta1.png";
import camiseta2 from "../assets/camiseta2.png";
import camiseta3 from "../assets/camiseta3.png";
import camiseta4 from "../assets/camiseta4.png";
import jertsea1 from "../assets/jertsea1.png";
import jertsea2 from "../assets/jertsea2.png";
import jertsea3 from "../assets/jertsea3.png";
import jertsea4 from "../assets/jertsea4.png";


export const Context = createContext(null);
export const ContextProvider = (props) => {
  const [showCart, setShowCart] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);
const [session, setSession] = useState(null);
const [loading, setLoading] = useState(true);

const [DBData, setDBData] = useState(null)
const [selectedProducts, setSelectedProducts] = useState([])
const [selectedColors, setSelectedColors] = useState([])
const [selectedAges, setSelectedAges] = useState([])
const [selectedSizes, setSelectedSizes] = useState([])
const [selectedSexes, setSelectedSexes] = useState([])
const [selectedDPColors, setSelectedDPColors] = useState([])

const [showAdminNav, setShowAdminNav] = useState(false)
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
        totalPrice,
        setTotalPrice,
        session, loading,
        selectedDPColors, 
        setSelectedDPColors,
        selectedAges,
        setSelectedAges,
        selectedSizes,
        setSelectedSizes,
        selectedSexes,
        setSelectedSexes,
        DBData,
        setDBData,
        showAdminNav,
        setShowAdminNav
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
