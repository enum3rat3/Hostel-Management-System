import React, { useState,useEffect } from "react";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useDispatch,useSelector } from "react-redux";
import { register } from "../../../Store/AuthReducer";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from "react-router";

const SignupForm = ({ togglePanel }) => {
  const navigate=useNavigate();
  const {auth}=useSelector(store=>store);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // You can add custom validation here
    // For example, checking if the fields are empty or have specific patterns
    // Update the errors state accordingly
    let errorText = "";
    if (name === "fullName") {
      errorText = value === "" ? "Full Name is required" : "";
    } else if (name === "email") {
      errorText =
        value === ""
          ? "Email is required"
          : !/\S+@\S+\.\S+/.test(value)
          ? "Please enter a valid email address"
          : "";
    } else if (name === "password") {
      errorText =
        value === ""
          ? "Password is required"
          : value.length < 6
          ? "Password must be at least 6 characters"
          : "";
    }

    setErrors({ ...errors, [name]: errorText });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    // You can use the formData state to send data to your backend or perform other actions
    dispatch(register(formData));
    console.log("Form Submitted", formData);
  };

  useEffect(()=>{
    if(auth.loggedIn){
      navigate("/hostel")
    }
  },[auth.loggedIn])

  return (
    <>
    
    <ToastContainer/>
    <div className="">
      <h1 className="text-lg font-bold text-center pb-8 textStyle">Signup</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <TextField
          fullWidth
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={!!errors.fullName}
          helperText={errors.fullName}
          placeholder="Enter your full name"
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          placeholder="Enter your email"
        />
        <FormControl fullWidth>
  <InputLabel htmlFor="role">Role</InputLabel>
  <Select
    label="Role"
    name="role"
    id="role"
    value={formData.role}
    onChange={handleChange}
    error={!!errors.role}
  >
   
    <MenuItem value="ROLE_WARDEN">ROLE_WARDEN</MenuItem>
  
    {/* Add more MenuItem components for other roles */}
  </Select>
  {errors.role && <div style={{ color: 'red' }}>{errors.role}</div>}
</FormControl>
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          placeholder="Enter your password"
        />

        <div>
          <Button
            sx={{ padding: ".7rem 0rem" }}
            className="customeButton"
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
          >
            Register
          </Button>
        </div>
      </form>

      <div className="textStyle flex items-center gap-2 mt-9 justify-center">
        <span>Already Have An Account ?</span>
        <Button className="btn" onClick={togglePanel} color="primary">
          signin
        </Button>
      </div>
    </div>
    </>
  );
};

export default SignupForm;
