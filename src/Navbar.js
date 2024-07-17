import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>
        <Link to="/">Workout Tracker</Link>
      </h2>
    </nav>
  );
};

export default Navbar;
