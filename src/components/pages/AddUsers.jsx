import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addUser, editUser } from "../../redux/features/userDetailSlice";
import { useEffect } from "react";

const AddUsers = () => {
  // Get users data from the Redux store
  const userdata = useSelector((state) => state.app.usersArray);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the user data to edit (if any)
  const userToEdit = location.state?.user;

  // Use react-hook-form for form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  // If editing, pre-fill the form with existing user data
  useEffect(() => {
    if (userToEdit) {
      setValue("name", userToEdit.name);
      setValue("email", userToEdit.email);
      setValue("phone", userToEdit.phone);
    }
  }, [userToEdit, setValue]);

  // Handle form submission
  const onSubmit = (data) => {
    const maxId = Number(userdata?.reduce((max, user) => (user.id > max ? user.id : max), 0));
    const newId = maxId + 1;  // Increment the highest ID by 1
  
    const newUserData = {
      ...data,  // User data without ID
      id: newId, // Assign the new unique ID
    };
  
    // Now, add the new user with the unique ID to the users array
    dispatch(addUser(newUserData)) // Assuming you're using dispatch to update the users list
      .unwrap()
      .then((response) => {
        console.log("User added successfully:", response);
        reset(); // Reset form after successful submission
        navigate("/"); // Redirect to users page
      })
      .catch((error) => {
        console.error("Error while adding user:", error);
      });
  };
  
  

  // Navigate back to the users page without saving
  const backHome = () => {
    navigate("/");
  };

  return (
    <div className="form mx-40 mt-8">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Name Field */}
        <div>
          <label>Name</label>
          <input
            className="border ml-4 border-black"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span style={{ color: "red" }}>This field is required</span>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label>Email</label>
          <input
            className="border ml-4 border-black"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && (
            <span style={{ color: "red" }}>Invalid email address</span>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label>Phone</label>
          <input
            type="number"
            className="border ml-4 border-black"
            {...register("phone", { required: true })}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-gray-500 p-2 text-white mt-2">
          {userToEdit ? "Update User" : "Add User"}
        </button>
      </form>

      <h4>
        Ayo! Don't want to add/edit? NP pal,{" "}
        <button
          onClick={backHome}
          className="bg-gray-500 p-2 text-white mt-2"
        >
          Click Here
        </button>{" "}
        to go back.
      </h4>
    </div>
  );
};

export default AddUsers;
