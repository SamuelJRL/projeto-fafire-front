import { Link, useLocation } from "react-router-dom";

export default function Navbar() {

    const location = useLocation()
    const currentPath = location.pathname

    return (
        <div className="navbar">
            <ul className="navbar-list">
                <li>
                    <Link to={"/"} style={{fontSize: currentPath === "/" ? "18px" : "16px"}}> Home </Link>
                </li>
                <li>
                    <Link to={"/subscriptions"} style={{fontSize: currentPath === "/subscriptions" ? "18px" : "16px"}}> Inscrições </Link>
                </li>
            </ul>
        </div>
    );
}
