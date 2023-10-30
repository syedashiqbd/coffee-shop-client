import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';

const Navbar = () => {
  const { user, userSignOut } = useContext(AuthContext);

  const handleSignOut = () => {
    // to signOut
    userSignOut()
      .then((result) => {
        console.log(result);
        Swal.fire({
          title: 'Log Out!',
          text: 'You successfully log Out',
          icon: 'success',
          // confirmButtonText: 'Cool',
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
      <NavLink to="/">
        <button className="btn btn-primary rounded w-36 border-none text-white ">
          Home
        </button>
      </NavLink>
      <NavLink to="/addCoffee">
        <button className="btn btn-primary rounded w-36 border-none text-white ">
          Add Coffee
        </button>
      </NavLink>
      {user?.email ? (
        <button
          onClick={handleSignOut}
          className="btn btn-primary rounded w-36 border-none text-white "
        >
          Logout
        </button>
      ) : (
        <NavLink to="/login">
          <button className="btn btn-primary rounded w-36 border-none text-white ">
            Login
          </button>
        </NavLink>
      )}
      <NavLink to="/register">
        <button className="btn btn-primary rounded w-36 border-none text-white ">
          Register
        </button>
      </NavLink>
      <NavLink to="/users">
        <button className="btn btn-primary rounded w-36 border-none text-white ">
          User
        </button>
      </NavLink>
    </div>
  );
};

export default Navbar;
