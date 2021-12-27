import { Link } from "react-router-dom"

export const NavBar = () => {
  return (
    <nav>
      <li>
        <Link to="/home">Home</Link>
      </li>
      <li>
        <Link to="/popular">Popular</Link>
      </li>
      <li>
        <Link to="/favourites">Favourites</Link>
      </li>
    </nav>
  )
}
