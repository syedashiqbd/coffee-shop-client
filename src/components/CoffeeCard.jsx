/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const CoffeeCard = ({ coffee, refetch }) => {
  const { _id, name, quantity, supplier, details, photo } = coffee;

  const handleDelete = (_id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_APP_SERVER_URL}/coffee/${_id}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire('Deleted!', 'Your coffee has been deleted.', 'success');
              refetch();
              // const remainingCoffee = coffees.filter(
              //   (coff) => coff._id !== _id
              // );
              // setCoffees(remainingCoffee);
            }
          });
      }
    });
  };

  return (
    <div className="card card-side bg-base-100 shadow-xl p-4">
      <figure className="md:w-1/3">
        <img src={photo} alt="Movie" />
      </figure>
      <div className=" md:w-full flex justify-between items-center">
        <div>
          <h2 className="card-title">{name}</h2>
          <p>{quantity}</p>
          <p>{supplier}</p>
          <p>{details}</p>
        </div>
        <div className="btn-group btn-group-vertical space-y-4">
          <button className="btn btn-sm btn-primary w-full">View</button>
          <Link to={`updateCoffee/${_id}`}>
            <button className="btn btn-sm btn-primary rounded-none w-full">
              EDIT
            </button>
          </Link>
          <button
            onClick={() => handleDelete(_id)}
            className="btn btn-sm btn-primary w-full bg-rose-600 border-none"
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCard;
