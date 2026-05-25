import { useState } from "react";
import "../styles/form.scss";
import { Link } from "react-router";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";


const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const {user,handleLogin,loading} = useAuth();
  // const navigate = useNavigate();

  if(loading){
    return (
      <h1>Loading...</h1>
    )
  }



   async function handleSubmit(e) {
    e.preventDefault();
    await handleLogin(userName,password)

    console.log("User Logged in")
    // .then(res=>{
    //   navigate("/")
    
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='button primary-button'>Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link className="toggleAuthForm" to="/register">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
