import React from "react";
import './signup.css';
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(name)
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try{
      const response = await fetch('http://localhost:5000/signup',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
        // formData
      });
      if (!response.ok) {
        alert("Sign up failed")
        return;
      }
      console.log("signUp successful")
      Navigate("/login")
    }
    catch (err){
      console.error('Error during signUp:', err);
    }
    console.log(formData)

  };

  return (
  <div className="container">
    <div className="signUp-page">
      <div className="signUp-page-header">
        <p> QUIZZIE </p>
      </div>

      <form onSubmit={handleSignUp}>
        <div className="form-header">
          <button> Sign Up </button>
          <Link to={"/login"}>
            <button> Log In </button>
          </Link>
        </div>

        <div className="form-body">
          <label for="Name">Name
          <input
            type="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            
          />
          </label>
          <label for="email">Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
           />
          </label>
          <label for="password">Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
           />
          </label>
          <label for="Confirm Password">Confirm Password
          <input
            type="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            // checked={formData.password === formData.confirmPassword}
          />
          </label>
        </div>

        <div className="form-footer">
          {/* <Link to={"/login"}> */}
            <button type="submit"> Sign Up </button>
          {/* </Link> */}
        </div>
      </form>
    </div>
    </div>
  );
};

export default SignUp;
