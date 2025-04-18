import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BASE_URL, api, setAuthHeader } from '../Api/api'
import { Bounce, toast } from 'react-toastify'

export const gethostel = createAsyncThunk(
  'hostel/getall',
  async ({ j, n, f, a }) => {
    setAuthHeader(j, api)
    try {
      // var n="bhaskara";
      // var f=1;
      // var a=1;
      const response = await api.get(`${BASE_URL}/api/hostel/allrooms`, {
        params: {
          name: `${n}`,
          floor: f,
          all: a
        }
      })
      console.log('hostel information received', response.data)
      console.log(response.status)
      return response.data
    } catch (error) {
      console.log('catched error response statuss' + error.status)
      console.log('catch error', error)
      throw Error(error.response.data.error)
    }
  }
)

export const update = createAsyncThunk(
  'hostel/update',
  async ({ j, hostel_data }) => {
    setAuthHeader(j, api)
    try {
      const response = await api.put(
        `${BASE_URL}/api/hostel/allocate`,
        hostel_data
      )
      console.log(response.status)
      toast.success('room allocated...', {
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
      return response.data
    } catch (error) {
      console.log('catched error response statuss' + error.status)
      console.log(error.response.data.message)
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
      throw Error(error.response.data.error)
    }
  }
)

export const vacant = createAsyncThunk(
  'hostel/vacant',
  async ({ j, hostel_data }) => {
    setAuthHeader(j, api)
    try {
      const response = await api.put(
        `${BASE_URL}/api/hostel/vacant/${hostel_data.id}`,
        hostel_data
      )
      console.log(response.status)
      toast.success('room vacant ', {
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
      return response.data
    } catch (error) {
      console.log('catch error', error)
      console.log(error.response.data.message)
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
      throw Error(error.response.data.error)
    }
  }
)

export const getAllNames=createAsyncThunk(
  'hostel/getAllNames',
  async({jwt})=>{
    setAuthHeader(jwt,api);
    try{
      const response = await api.get(
        `${BASE_URL}/api/hostel/hostelname`
      )
      console.log(response);
      return response.data;

    }catch(error){
      throw Error(error.response.data.error)
    }

  }
)
export const clearErrors = createAsyncThunk(
  'hostel/clearErrors',
  async () => {}
)
const hostelSlice = createSlice({
  name: 'hostel',
  initialState: {
    hostels: [],
    hostelNames:[],

    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(gethostel.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(gethostel.fulfilled, (state, action) => {
        state.loading = false
        state.hostels = action.payload
        state.error = null
      })
      .addCase(gethostel.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
      .addCase(vacant.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(vacant.fulfilled, (state, action) => {
        const updated_hostel_info = action.payload
        state.loading = false
        state.hostels = state.hostels.map(item =>
          item.map(nested_item =>
            nested_item.map(final_item =>
              final_item.id === updated_hostel_info.id
                ? { ...final_item, ...updated_hostel_info }
                : final_item
            )
          )
        )
        state.error = null
      })
      .addCase(vacant.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
      .addCase(update.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(update.fulfilled, (state, action) => {
        const updated_hostel_info = action.payload
        state.loading = false
        state.hostels = state.hostels.map(item =>
          item.map(nested_item =>
            nested_item.map(final_item =>
              final_item.id === updated_hostel_info.id
                ? { ...final_item, ...updated_hostel_info }
                : final_item
            )
          )
        )
        state.error = null
      })
      .addCase(update.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
      .addCase(clearErrors.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(clearErrors.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
      })
      .addCase(clearErrors.rejected, (state, action) => {
        state.loading = false
        state.error = null
      })
      .addCase(getAllNames.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(getAllNames.fulfilled, (state, action) => {
        state.loading = false
        state.hostelNames=action.payload
        state.error = null
      })
      .addCase(getAllNames.rejected, (state, action) => {
        state.loading = false
        state.error = null
      })
  }
})

export default hostelSlice.reducer
