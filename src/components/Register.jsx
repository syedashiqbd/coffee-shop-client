import { useContext, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import Navbar from './Navbar';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [gender, setGender] = useState(null);

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;
    const user = { email, password, gender };

    console.log(user);

    createUser(email, password)
      .then((result) => {
        console.log(result.user);

        // to insert this user to mongoDB database
        const createdAt = result.user?.metadata?.creationTime;
        const user = { email, createdAt, gender };
        // Axios use
        axios
          .post(`${import.meta.env.VITE_APP_SERVER_URL}/user`, user)
          .then((data) => {
            console.log(data);
            if (data.data.insertedId) {
              Swal.fire({
                title: 'Success!',
                text: 'User added successfully',
                icon: 'success',
                confirmButtonText: 'Cool',
              });
              navigate('/users');
            }
          });

        //fetch use

        // fetch(
        //   `${import.meta.env.VITE_APP_SERVER_URL}/user`,
        //   {
        //     method: 'POST',
        //     headers: {
        //       'content-type': 'application/json',
        //     },
        //     body: JSON.stringify(user),
        //   }
        // )
        //   .then((res) => res.json())
        //   .then((data) => {
        //     console.log(data);
        //     if (data.insertedId) {
        //       Swal.fire({
        //         title: 'Success!',
        //         text: 'User added successfully',
        //         icon: 'success',
        //         confirmButtonText: 'Cool',
        //       });
        //       navigate('/users');
        //     }
        //   });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="hero min-h-screen ">
        <div className="hero-content flex-col ">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register Please!</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
            <form onSubmit={handleRegister} className="card-body">
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
              </div>
              <div className="form-control">
                <label className="label">
                  <p className="flex items-center">
                    <input
                      onChange={() => setGender('Male')}
                      type="radio"
                      name="gender"
                      value="male"
                      className="mr-2"
                    />
                    <span>Male</span>
                  </p>
                </label>
                <label className="label">
                  <p className="flex items-center">
                    <input
                      onChange={() => setGender('Female')}
                      type="radio"
                      name="gender"
                      value="female"
                      className="mr-2"
                    />
                    <span>Female</span>
                  </p>
                </label>
              </div>

              <div className="form-control">
                <label className="label">
                  <p className="flex items-center">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      className="mr-2"
                    />
                    <span>Accept our Terms & Conditions</span>
                  </p>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
