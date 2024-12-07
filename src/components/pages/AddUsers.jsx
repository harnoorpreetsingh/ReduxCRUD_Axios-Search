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
    // Validate uniqueness of email for adding new users or updating an existing user
    const emailExists = userdata.some((user) => user.email === data.email && user.id !== userToEdit?.id);
    if (emailExists) {
      return alert("Email already exists!");
    }
  
    // Handle ID generation when adding a new user
    let newUserData = { ...data };
    if (!userToEdit) {
      const maxId = Math.max(...userdata.map(user => parseInt(user.id, 10)), 0);
      newUserData.id = (maxId + 1).toString(); // New ID should be max + 1 and converted to string
    } else {
      newUserData.id = userToEdit.id; // Keep the same ID when updating
    }
  
    // Dispatch action to add or edit user
    if (userToEdit) {
      // Editing an existing user
      dispatch(editUser(newUserData));
    } else {
      // Adding a new user
      dispatch(addUser(newUserData));
    }
  
    // After dispatch, reset form and navigate back
    reset();
    navigate("/");
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
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <span style={{ color: "red" }}>{errors.name.message}</span>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label>Email</label>
          <input
            className="border ml-4 border-black"
            {...register("email", { 
              required: "Email is required", 
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address"
              }
            })}
          />
          {errors.email && (
            <span style={{ color: "red" }}>{errors.email.message}</span>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label>Phone</label>
          <input
            type="number"
            className="border ml-4 border-black"
            {...register("phone", { required: "Phone number is required" })}
          />
          {errors.phone && (
            <span style={{ color: "red" }}>{errors.phone.message}</span>
          )}
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
