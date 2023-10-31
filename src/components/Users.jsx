import { useLoaderData } from 'react-router-dom';
import Navbar from './Navbar';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { AiFillDelete, AiFillEdit, AiOutlineFolderView } from 'react-icons/ai';
import axios from 'axios';

const Users = () => {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);
  console.log(users);

  const handleDelete = (id) => {
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
        // Axios using
        axios
          .delete(`${import.meta.env.VITE_APP_SERVER_URL}/user/${id}`)
          .then((data) => {
            console.log(data.data);
            if (data.data.deletedCount > 0) {
              Swal.fire('Deleted!', 'User has been deleted.', 'success');
              const remainingUsers = users.filter((user) => user._id !== id);
              setUsers(remainingUsers);
            }
          });
        // fetch using
        // fetch(
        //   `${import.meta.env.VITE_APP_SERVER_URL}/user/${id}`,
        //   {
        //     method: 'DELETE',
        //   }
        // )
        //   .then((res) => res.json())
        //   .then((data) => {
        //     console.log(data);
        //     if (data.deletedCount > 0) {
        //       Swal.fire('Deleted!', 'User has been deleted.', 'success');
        //       const remainingUsers = users.filter((user) => user._id !== id);
        //       setUsers(remainingUsers);
        //     }
        //   });
      }
    });
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="overflow-x-auto max-w-6xl mx-auto">
        <h1 className="text-center text-3xl font-bold my-10">
          All Active User List
        </h1>
        <table className="table ">
          {/* head */}
          <thead className="bg-gray-300 text-base font-semibold">
            <tr>
              <th>SL</th>
              <th>Email</th>
              <th>CreatedAt</th>
              <th>Gender</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users?.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.email}</td>
                <td>{user.createdAt}</td>
                <td>{user.gender}</td>
                <td className=" flex gap-4 flex-wrap justify-end items-center  ">
                  <AiOutlineFolderView className="text-2xl text-purple-500 cursor-pointer"></AiOutlineFolderView>
                  <AiFillEdit className="text-2xl text-blue-500 cursor-pointer"></AiFillEdit>
                  <AiFillDelete
                    className="text-2xl text-red-500 cursor-pointer"
                    onClick={() => handleDelete(user._id)}
                  ></AiFillDelete>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
