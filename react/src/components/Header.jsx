import Search from './Search'
import { Link } from "react-router-dom";

import Featured from './Featured';

const Header = (props) => {

    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-light" style={{backgroundColor: "#e3f2fd"}}>
        <Link className="navbar-brand" to="/">Byte & Basket</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/featured">Featured</a>
            </li>
            <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
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