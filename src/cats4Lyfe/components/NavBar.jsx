import { Link } from "react-router-dom"

export const NavBar = () => {
    return (
        <nav>
            <li>
                <Link to="/">Home</Link>
            </li>
            {/* <li>
                <Link to="/favourites">Favourites</Link>
            </li> */}
        </nav>
    )
}
