import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../Api/apiInstance";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkApi) => {
    try {
      const response = await api.get("/users");
      //   console.log(response.data,"rerererere")
      return response.data;
    } catch (error) {
      console.error(error, "fetch api error");
      throw thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const addUser = createAsyncThunk(
  "users/addUser",
  async (data, thunkApi) => {
    try {
      const response = await api.post("/users", data);
      if (response.status === 201) {
        return response.data;
      }
    } catch (error) {
      console.error(error, "post api error");
      throw thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users.deleteUser",
  async (id, thunkApi) => {
    try {
      const response = await api.delete(`/users/${id}`);
      if (response.status === 200) {
        return id;
      }
    } catch (error) {
      console.error(error, "error in delete api");
      throw thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const editUser = createAsyncThunk(
  "users/editUser",
  async (updatedUserData, thunkAPI) => {
    try {
      // Make sure the updatedUserData is correctly passed to the PUT request
      const response = await api.put(`/users/${updatedUserData.id}`, updatedUserData);
      
      // Check if the response status is OK
      if (response.status === 200) {
        return response.data; // Return updated user data
      }
    } catch (error) {
      console.error("Error in editUser:", error);
      throw thunkAPI.rejectWithValue(error.response?.data || error.message); // Handle error gracefully
    }
  }
);



export const userDetailSlice = createSlice({
  name: "userDetail",
  initialState: {
    usersArray: [],
    isLoading: false,
    error: null,
    searchData:[]
  },
  reducers: {
    searchUser: (state, action)=>{
      state.searchData = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.usersArray = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.usersArray.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.usersArray = state.usersArray.filter((user) => {
          return user.id !== action.payload;
        });
        state.isLoading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(editUser.pending, (state) => {
        state.isLoading = true;
      })
      // .addCase(editUser.fulfilled, (state, action) => {
      // state.usersArray = state.usersArray.map((user)=>{
      //   user.id === action.payload.id? action.payload:user
      // })
      //  state.isLoading = false;
      // })
      .addCase(editUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const index = state.usersArray.findIndex((user) => user.id === updatedUser.id);
        if (index !== -1) {
          state.usersArray[index] = updatedUser; // Replace the old user with the updated one
        }
      })
      .addCase(editUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export const {searchUser} = userDetailSlice.actions
export default userDetailSlice.reducer;
