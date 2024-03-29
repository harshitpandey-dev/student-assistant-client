import "./Home.css";
import { useNavigate } from "react-router-dom";
import { Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FaSearch } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();
  const [opened, { toggle }] = useDisclosure();
  return (
    <div>
      <nav>
        <div className="title">HBTU-Kart</div>
        <ul>
          <li>
            <input placeholder="Search Products" />
            <FaSearch className="search" />
          </li>
          <li>
            <button onClick={() => navigate("/addProduct")}>Sell Item</button>
          </li>
          <li>
            <Burger
              opened={opened}
              onClick={toggle}
              aria-label="Toggle navigation"
            />
          </li>
        </ul>
      </nav>

      <div className="panel">
        <div className="menu">
          <div className="wishlist">
            <i className="fa-solid fa-heart"></i>
            <p>Wishlist</p>
          </div>
          <div className="contactus">
            <i className="fa-solid fa-phone"></i>
            <p>Contact Us</p>
          </div>
        </div>
        <div className="logout">
          <p>
            {" "}
            <a href="/">Log out</a>
          </p>
          <a href="/">
            {" "}
            <i className="fa-solid fa-right-from-bracket"></i>
          </a>
        </div>
      </div>

      <main>
        <div className="cards-container">
          {/* You can map through your data and render the product cards here */}
          <div className="card">
            <div className="cardimg">
              <img src="https://via.placeholder.com/400x200" alt="" />
            </div>
            <div className="cardcontent">
              <p id="productcost">Rs. 100</p>
              <p id="producttitle">Product Title</p>
              <p className="parameters">Used For:</p>
              <p id="usedfor">2 years</p>
              <p className="parameters">Original Cost:</p>
              <p id="originalcost"> Rs. 500</p>
              <p className="parameters">Product Description:</p>
              <p id="prodDescp">
                Lorem ipsum dolor sit amet consectetur adipisicing elit...
              </p>
            </div>
            <div className="cardactions">
              <p>Contact Seller</p>
              <i className="fa-solid fa-heart"></i>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
