import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
      <Link to="/">
        <button className="btn btn-primary bg-rose-600 border-none text-white ">
          Home
        </button>
      </Link>
      <Link to="/addCoffee">
        <button className="btn btn-primary bg-rose-600 border-none text-white ">
          Add Coffee
        </button>
      </Link>
      <Link to="/login">
        <button className="btn btn-primary bg-rose-600 border-none text-white ">
          Login
        </button>
      </Link>
      <Link to="/register">
        <button className="btn btn-primary bg-rose-600 border-none text-white ">
          Register
        </button>
      </Link>
      <Link to="/users">
        <button className="btn btn-primary bg-rose-600 border-none text-white ">
          User
        </button>
      </Link>
    </div>
  );
};

export default Navbar;
