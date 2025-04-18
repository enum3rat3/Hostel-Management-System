// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, api, setAuthHeader } from '../Api/api';
import { toast ,Bounce} from 'react-toastify';

export const login = createAsyncThunk('auth/login', async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signin`, userData);
    localStorage.setItem("jwt",response.data.jwt)
    console.log("login success ",response.data)
    toast.success('login sucessfully ', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });
    return response.data;
  } catch (error) {
    console.log("catch error  ",error)
    toast.error(error.response.data.message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Bounce
    })
    throw Error(error.response.data.error);
  }
});

export const register = createAsyncThunk('auth/register', async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signup`, userData); 
    localStorage.setItem("jwt",response.data.jwt)
    console.log("register success ",response.data)
    toast.success('user registered.. ', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });
    return response.data;
  } catch (error) {
    console.log("catch error  ",error)
    toast.error(error.response.data.message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Bounce
    })
    throw Error(error.response.data.error);
  }
});



export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    localStorage.clear()
    toast.success('logout..', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });
  } catch (error) {
    toast.error('Internal Server Error', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Bounce
    })
    throw Error(error.response.data.error);
  }
});

export const getUserProfile = createAsyncThunk('auth/getUserProfile', async (jwt) => {
  setAuthHeader(jwt,api)
  try {
      
    const response = await api.get('/api/users/profile'); 
    
    console.log("get profile success ",response.data)
    return response.data;
  } catch (error) {
    console.log("catch error  ",error)
    throw Error(error.response.data.error);
  }
});

export const getUserList = createAsyncThunk('auth/getUserList', async (jwt) => {
  setAuthHeader(jwt,api)
  try {
      
    const response = await api.get('/api/users'); 
    
    console.log("user list ",response.data)
    return response.data;
  } catch (error) {
    console.log("catch error  ",error)
    throw Error(error.response.data.error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loggedIn: false,
    loading: false,
    error: null,
    jwt:null,
    users:[]
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        
        state.loading = false;
        state.jwt = action.payload;
        state.loggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.loggedIn = true;
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload;
        state.loggedIn = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.loggedIn = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// export { login, register, logout };
export default authSlice.reducer;
