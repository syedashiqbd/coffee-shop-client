import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from './Navbar';
import axios from 'axios';

const AddCoffee = () => {
  const navigate = useNavigate();

  const handleAddCoffee = (e) => {
    e.preventDefault();
    const form = e.target;
    const newCoffee = {
      name: form.name.value || 'not-given',
      quantity: form.quantity.value || 'not-given',
      supplier: form.supplier.value || 'not-given',
      taste: form.taste.value || 'not-given',
      category: form.category.value || 'not-given',
      details: form.details.value || 'not-given',
      photo: form.photo.value || 'not-given',
    };
  

    const URL = import.meta.env.VITE_APP_SERVER_URL;
    console.log(URL);

    // Using Axios
    axios
      .post(`${import.meta.env.VITE_APP_SERVER_URL}/coffee`, newCoffee)
      .then((data) => {
        console.log(data.data);
        if (data.data.insertedId) {
          Swal.fire({
            title: 'Success!',
            text: 'Coffee added successfully',
            icon: 'success',
            confirmButtonText: 'Cool',
          });
          navigate('/');
        }
      });

    // Using fetch
    // fetch(
    //   `${import.meta.env.VITE_APP_SERVER_URL}/coffee`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'content-type': 'application/json',
    //     },
    //     body: JSON.stringify(newCoffee),
    //   }
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     if (data.insertedId) {
    //       Swal.fire({
    //         title: 'Success!',
    //         text: 'Coffee added successfully',
    //         icon: 'success',
    //         confirmButtonText: 'Cool',
    //       });
    //       navigate('/');
    //     }
    //   });
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-6xl mx-auto lg:py-16 lg:px-28 py-6 px-10 text-center ">
        <h2 className="text-5xl text-[##374151] mb-8">Add New Coffee</h2>
        <form onSubmit={handleAddCoffee}>
          {/* name and chef */}
          <div className="lg:grid lg:gap-6 ">
            <div className="form-control ">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter coffee name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control  ">
              <label className="label">
                <span className="label-text">Quantity</span>
              </label>
              <input
                type="text"
                name="quantity"
                placeholder="Enter coffee quantity"
                className="input input-bordered"
              />
            </div>
            {/* supplier and taste */}
            <div className="form-control  ">
              <label className="label">
                <span className="label-text">Supplier</span>
              </label>
              <input
                type="text"
                name="supplier"
                placeholder="Enter coffee supplier"
                className="input input-bordered"
              />
            </div>
            <div className="form-control  ">
              <label className="label">
                <span className="label-text">Taste</span>
              </label>
              <input
                type="text"
                name="taste"
                placeholder="Enter coffee taste"
                className="input input-bordered"
              />
            </div>
            {/* category and details */}
            <div className="form-control  ">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <input
                type="text"
                name="category"
                placeholder="Enter coffee category"
                className="input input-bordered"
              />
            </div>
            <div className="form-control   ">
              <label className="label">
                <span className="label-text">Details</span>
              </label>
              <input
                type="text"
                name="details"
                placeholder="Enter coffee details"
                className="input input-bordered"
              />
            </div>
            {/* photo */}
            <div className="form-control  w-full col-span-2">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Enter photo URL"
                className="input input-bordered"
              />
            </div>
          </div>
          <input
            type="submit"
            value="Add Coffee"
            className="btn w-full bg-[#D2B48C] text-[#331A15] mt-8"
          />
        </form>
      </div>
    </div>
  );
};

export default AddCoffee;
