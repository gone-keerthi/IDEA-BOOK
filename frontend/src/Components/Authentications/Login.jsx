import React from "react";
import { Link } from "react-router-dom";
import './login.css'
const Login = () => {
  return (
    <div className="container">
    <div className="login-page">
      <div className="login-page-header">
        <p>QUIZZIE</p>
      </div>
      <form>
        <div className="form-header">
          <button> Sign Up </button>
          <button> Log In </button>
        </div>
        <div className="form-body">
            <label for ='email'>Email
            <input type="email" />
            </label>
            <label for ='password'>Password
            <input type="password" />
            </label>
        </div>
        <div className="form-footer">
          <Link to={ '/dashboard-page'}>

            <button> Log In </button>
          </Link>
        </div> 
      </form>
    </div>
    </div>
  );
};

export default Login;
