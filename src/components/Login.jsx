import { useContext } from 'react';
import Navbar from './Navbar';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { userLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  // to login
  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const user = { email, password };
    console.log(user);

    userLogin(email, password)
      .then((result) => {
        console.log(result.user);

        // getting data from firebase update to mongoDB database
        const user = {
          email,
          lastLoggedAt: result.user?.metadata?.lastSignInTime,
        };
        fetch(`${import.meta.env.VITE_APP_SERVER_URL}/user`, {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            Swal.fire({
              title: 'Success!',
              text: 'You successfully loggedIn',
              icon: 'success',
              confirmButtonText: 'Cool',
            });
            navigate('/');
          });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col ">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold px-10">Login now!</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-2xl shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>{' '}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
