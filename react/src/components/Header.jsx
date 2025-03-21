import Search from './Search'
import { Link } from "react-router-dom";

import Featured from './Featured';


const Header = (props) => {

    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-light" style={{backgroundColor: "#4CAF50", marginBottom: "20px", borderRadius:"10px"}}>
        <Link className="navbar-brand" to="/"
        style={{fontFamily:"Lato", fontSize:"45px", color:"#333333", paddingLeft:"20px"}}>Byte & Basket</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup" style={{alignItems:"center"}}>
          <ul className="navbar-nav" style={{flexDirection:"row-reverse"}}>
            <li className="nav-item">
              <a className="nav-link" href="/featured" style={{fontFamily:"Lato", fontSize:"20px"}}>Featured</a>
            </li>
            <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{fontFamily:"Lato", fontSize:"20px"}}
                  >
                    Shop Aisles
                  </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/groceries/departments/dairy">Dairy</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/groceries/departments/produce">Produce</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/groceries/departments/seafood">Seafood</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/groceries/departments/bakery">Bakery</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/groceries/departments/meat">Meat</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/groceries/departments/frozen">Frozen</Link></li>
              </ul>
            </li>
          </ul>
          <Search setGroceryData={props.setGroceryData} />
        </div>
      </nav>
    )
}

export default Header;