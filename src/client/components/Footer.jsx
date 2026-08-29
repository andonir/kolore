import { FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    <footer>
      {/* <div class="logo">
          <img src="/img/logo.png" alt="Logo-footer" />
        </div> */}

      <div class="contact">
        <a href="https://www.instagram.com/_kolore_/" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="instagram-icon icon-contact" />
        </a>
      </div>
      <h4>gmail@gmail.com</h4>

      <hr />
      <h3>KOLORE</h3>
    </footer>
  );
};

export default Footer;
