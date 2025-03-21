import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faUser } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

function SubHeader() {
    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse">
                            <div className="ms-auto d-flex">
                                <Link to="/user/login" className="nav-link btn btn-outline-dark ms-2">
                                    <FontAwesomeIcon icon={faUser} size="xl" style={{ color: "#333333" }} />
                                </Link>
                                <Link to="/user/orders" className="nav-link btn btn-outline-dark ms-2">
                                    <FontAwesomeIcon icon={faClipboard} size="xl" style={{ color: "#333333" }} />
                                </Link>
                                <Link to="/user/cart" className="nav-link btn btn-outline-dark ms-2">
                                    <FontAwesomeIcon icon={faCartShopping} size="xl" style={{ }} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default SubHeader;
