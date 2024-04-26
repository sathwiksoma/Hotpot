import { useState } from "react";
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";

function Login(){
    var [username, setUsername]=useState("");
    var [password, setPassword]=useState("");
    var [loggedIn, setLoggedIn]=useState(false);
    const [email, setEmail] = useState("");

    var user={};
    var navigate=useNavigate();

    var Login=async (e)=>{
        e.preventDefault();
        user.userId = 0;
        user.userName = username;
        user.password = password;
        user.email = email;
        user.role = "";
        user.token = "";

        console.log(user);

        var requestOptions={
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(user)
        };
try{
   const r = await axios.post("https://localhost:7157/api/Auth/login", user);
   sessionStorage.setItem("Token", r.data.key);
   sessionStorage.setItem("UserName", r.data.userName);
   sessionStorage.setItem("UserId", r.data.userId);
   sessionStorage.setItem("role",r.data.role)
   setLoggedIn(true);
   
if (r.data.role === "Admin") {
// navigate("/Admin");
navigate(`/admin-profile`);
// window.location.href = "http://localhost:3000/Admin";
// setShowLogin(false);
} else if (r.data.role === "RestaurantOwner") {
navigate(`/restaurant-profile`);
// setShowLogin(false);
} else {
window.location.href = "http://localhost:3000/";
}

}catch(e){
    console.log(e)
}
    }
    return(
        <div className="container">
            <br /><br /><br /><br /><br />
            {/* {loggedIn==true?<h2 className="alert alert-success">Login successful!. Welcome {username}</h2>:null} */}
            <form>
            <label htmlFor="exampleFormControlInput1" className="form-label">UserName</label>
            <input type="text" className="form-control" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button className="btn btn-success" onClick={Login}>Submit</button>
            <button className="btn btn-danger">Cancel</button>
            </form>
        </div>
    )

}

export default Login;