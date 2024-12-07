import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUser } from "../../redux/features/userDetailSlice"; // Removed unnecessary searchUser import
import { useNavigate } from "react-router-dom";

const Users = () => {

  const [searchData, setSearchData] = useState(""); // Local state for search input
  const navigate = useNavigate();
  const userdata = useSelector((state) => state.app.usersArray); // Get the users from the Redux store
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers()); // Fetch users when the component is mounted
  }, [dispatch]);

  // Filter users based on the search query
  const filteredData = userdata.filter((user) => {
    if (searchData.length === 0) {
      return true; // If searchData is empty, return all users
    } else {
      return (
        user.name.toLowerCase().includes(searchData.toLowerCase()) || 
        user.email.toLowerCase().includes(searchData.toLowerCase()) || 
        user.phone.toLowerCase().includes(searchData.toLowerCase())
      );
    }
  });

  const handleDelete = (id) => {
    dispatch(deleteUser(id)); // Dispatch action to delete the user
  };

  const navToUser = () => {
    navigate("/addusers"); // Navigate to the Add User page
  };

  const handleEdit = (user) => {
    navigate("/addusers", { state: { user } }); // Navigate to the Add/Edit page with user data
  };

  return (
    <>
      {/* Search input */}
      <input
        type="search"
        onChange={(e) => setSearchData(e.target.value)}
        value={searchData}
        placeholder="Search user here..."
        className="border p-2 rounded"
      />
      <br />
      <br />
      
      {/* Add User Button */}
      <button
        onClick={() => navToUser()}
        className="bg-green-600 mt-4 rounded-lg text-white p-2"
      >
        Add User
      </button>
      
      {/* Display filtered users */}
      {filteredData.length > 0 ? (
        filteredData.map((user) => (
          <Card key={user.id} handleDelete={handleDelete} handleEdit={handleEdit} user={user} />
        ))
      ) : (
        <p>No users found</p>
      )}
      
      {/* Add User Button (Duplicated from earlier) */}
      <button
        onClick={() => navToUser()}
        className="bg-green-600 mt-4 rounded-lg text-white p-2"
      >
        Add User
      </button>
    </>
  );
};

const Card = ({ user, handleDelete, handleEdit }) => {
  const { id, name, email, phone } = user;

  return (
    <div className="card bg-gray-700 p-4 rounded-lg text-white flex flex-col gap-1">
      <h4>
        <strong>Id:</strong> {id}
      </h4>
      <h4>
        <strong>Name:</strong> {name}
      </h4>

      <p>
        <strong>Email:</strong> {email}
      </p>

      <p>
        <strong>Phone:</strong> {phone}
      </p>

      {/* Delete User Button */}
      <button
        onClick={() => handleDelete(id)}
        className="bg-red-600 mt-4 rounded-lg text-white p-2"
      >
        Delete User
      </button>
      
      {/* Edit User Button */}
      <button
        onClick={() => handleEdit(user)}
        className="bg-green-600 mt-4 rounded-lg text-white p-2"
      >
        Edit User
      </button>
    </div>
  );
};

export default Users;
  