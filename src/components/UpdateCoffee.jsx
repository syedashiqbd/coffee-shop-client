import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateCoffee = () => {
  const navigate = useNavigate();
  const coffee = useLoaderData();
  const { _id, name, quantity, supplier, details, photo, taste, category } =
    coffee;

  const handleUpdateCoffee = (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const quantity = form.quantity.value;
    const supplier = form.supplier.value;
    const taste = form.taste.value;
    const category = form.category.value;
    const details = form.details.value;
    const photo = form.photo.value;
    const updateCoffee = {
      name,
      quantity,
      supplier,
      taste,
      category,
      details,
      photo,
    };

    fetch(
      `https://coffee-shop-server-j3034p3ti-syed-ashiqs-projects.vercel.app/coffee/${_id}`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(updateCoffee),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: 'Success!',
            text: 'Coffee updated successfully',
            icon: 'success',
            confirmButtonText: 'Cool',
          });
          navigate('/');
        }
      });
  };

  return (
    <div className="max-w-6xl mx-auto lg:py-16 lg:px-28 py-6 px-10 text-center bg-[#F4F3F0]">
      <h2 className="text-5xl text-[##374151] mb-8">Update Coffee</h2>
      <form onSubmit={handleUpdateCoffee}>
        {/* name and chef */}
        <div className="lg:grid lg:gap-6 ">
          <div className="form-control ">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              defaultValue={name}
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
              defaultValue={quantity}
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
              defaultValue={supplier}
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
              defaultValue={taste}
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
              defaultValue={category}
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
              defaultValue={details}
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
              defaultValue={photo}
              placeholder="Enter photo URL"
              className="input input-bordered"
            />
          </div>
        </div>

        <input
          type="submit"
          value="Update Coffee"
          className="btn w-full bg-[#D2B48C] text-[#331A15] mt-8"
        />
      </form>
    </div>
  );
};

export default UpdateCoffee;
