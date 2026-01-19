import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="nav-title">EcoCycle</h1>
      <div className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link nav-link-active" : "nav-link"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/industries"
          className={({ isActive }) =>
            isActive ? "nav-link nav-link-active" : "nav-link"
          }
        >
          Industries
        </NavLink>
        <NavLink
          to="/wastes"
          
          className={({ isActive }) =>
            isActive ? "nav-link nav-link-active" : "nav-link"
          }
        >
          Wastes
        </NavLink>
      </div>
    </nav>
  );
}
