import camiseta1 from "../assets/camiseta1.png";
import portada from "../assets/portada.png";
import ClothesContainer from "../components/home/ClothesContainer";
import Cart from "../components/home/Cart";
const Home = () => {
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
    <ClothesContainer></ClothesContainer>
      
    </main>
  );
};

export default Home;
