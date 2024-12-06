import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUser } from "../../redux/features/userDetailSlice";
import { useNavigate } from "react-router-dom";

const Users = () => {

  
  const navigate = useNavigate();
  const userdata = useSelector((state) => state.app.usersArray);
  console.log(userdata, "state data");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    // return () => {
    //   fetchUsers();
    // };
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };
  const navToUser = () => {
    // dispatch(deleteUser(id))
    navigate("/addusers");
  };

  const handleEdit = (user) => {
    navigate("/addusers", { state: { user } });  // Navigate to Add/Edit page with user data
  };
  return (
    <>
      <button
        onClick={() => navToUser()}
        className="bg-green-600 mt-4 rounded-lg text-white p-2"
      >
        Add User
      </button>
      {userdata &&
        userdata.map((user) => {
          return <Card key={user.id} handleDelete={handleDelete} handleEdit={handleEdit} user={user}  />;
        })}
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

      <button
        onClick={() => handleDelete(id)}
        className="bg-red-600 mt-4 rounded-lg text-white p-2"
      >
        Delete User
      </button>
      <button onClick={()=>handleEdit(user)} className="bg-green-600 mt-4 rounded-lg text-white p-2">
        Edit User
      </button>
    </div>
  );
};

export default Users;
