import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../Store/AuthReducer";
import { useNavigate } from "react-router";


const LoginForm = ({ togglePanel }) => {
  const navigate=useNavigate();
  const {auth}=useSelector(store=>store);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // You can add custom validation here
    // For example, checking if the fields are empty or have specific patterns
    // Update the errors state accordingly
    let errorText = "";
    if (name === "email") {
      errorText =
        value === ""
          ? "Email is required"
          : !/\S+@\S+\.\S+/.test(value)
          ? "Please enter a valid email address"
          : "";
    } else if (name === "password") {
      errorText = value === "" ? "Password is required" : "";
    }

    setErrors({ ...errors, [name]: errorText });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData))
    console.log("Login Form Submitted ", formData);
    setFormData({
      email: "",
      password: "",
    })
  };

  useEffect(()=>{
    if(auth.loggedIn){
      navigate("/hostel")
    }
  },[auth.loggedIn])

  return (
    <>
    <div className="">
      <h1 className="text-lg font-bold text-center pb-8 textStyle">Login</h1>
      <form className="space-y-3" onSubmit={handleSubmit}>
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
            Login
          </Button>
        </div>
      </form>

      <div className="textStyle mt-5 flex items-center gap-2 py-5 justify-center">
        <span>New User? Create An Account</span>
        <Button className="" onClick={togglePanel} color="primary">
          signup
        </Button>
      </div>
    </div>
    </>
  );
};

export default LoginForm;
