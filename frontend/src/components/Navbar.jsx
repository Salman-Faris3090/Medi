import React from 'react'
import { useContext, useState } from 'react';
import { Context } from '../main'
import { Link , useNavigate} from 'react-router-dom'
import axios from "axios"
import { toast } from "react-toastify"

const Navbar = () => {
  const [show, setShow] = useState(false)
  const { isAuthenticated, setIsAuthenticated } = useContext(Context)
 
  const navigateTo = useNavigate();

  const handleLogout = async()=>{
    await axios.get("", { 
        withCredentials: true,
    })
    .then(res=>{
        toast.success(res.data.message);
        setIsAuthenticated(false);
    }).catch(err=>{
        toast.error(err.response.data.message)
    });
  }
  const gotoLogin = () => {
    navigateTo("/login");
  };

  return (
    <nav className='container'>
        <div className="logo">MediConnect</div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
            <div className="links">
                <Link to={"/"}>HOME</Link>
                <Link to={"/appointment"}>BOOK APPOINTMENT</Link>
                <Link to={"/online"}>ONLINE CONSULTATION</Link>
            </div>
            {isAuthenticated ? (
                <button className="logoutBtn btn" onClick={(handleLogout)}>
                    LOGOUT
                </button>
            ) : (
                <button className="logoutBtn btn" onClick={(gotoLogin)}>
                    LOGIN
                </button>
            )}
        </div>
    </nav>
  )
}

export default Navbar;
