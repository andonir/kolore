import portada from "../../assets/portada.png"
import DrawingsContainer from "../components/home/DrawingsContainer";
import Cart from "../components/home/Cart";
import { useContext, useEffect } from "react";
import { Context } from "../../Context/Context";
import { readDB } from "../../supabase/functions";
const Home = () => {
  const {setDBData} = useContext(Context)
  useEffect(()=>{
    readDB(setDBData)

 },[])
  return (
    <main className="home">
      <section className="hero">
        <img src={portada} alt="img-portada" />
        <div className="hero-background">
          <div className="hero-content">
            <h2>Kolore</h2>
            <h4>Marrazteak Bizipoza sortzen didalako!♥️</h4>
            {/* <button>Erosi orain</button> */}
          </div>
        </div>
      </section>
    <DrawingsContainer></DrawingsContainer>
      
    </main>
  );
};

export default Home;
