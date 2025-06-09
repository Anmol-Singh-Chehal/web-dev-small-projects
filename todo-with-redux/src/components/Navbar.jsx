import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { logOut } from '../features/authSlice';

const Navbar = () => {
  const userData = useSelector((state) => {
    return state.auth;
  });

  return (
    <nav className='flex justify-between'>
     <p className='text-white text-2xl font-semibold '>myTodo</p>
     <div className='text-white text-md font-semibold flex gap-2'>
        <NavLink className='hover:underline hover:cursor-pointer border-2 border-white rounded-md  px-2 py-1 bg-lime-600' to="/">Home</NavLink>
        <NavLink className='hover:underline hover:cursor-pointer border-2 border-white rounded-md  px-2 py-1 bg-lime-600' to="/donate-us">Donate Us</NavLink>
        {!userData.loggedIn ? <NavLink className='hover:underline hover:cursor-pointer border-2 border-white rounded-md  px-2 py-1 bg-lime-600' to="log-in">Log In</NavLink> : <NavLink className="text-white border-2 border-white rounded-full size-9 flex justify-center items-center bg-lime-950" to="log-in">{userData.email[0].toUpperCase()}</NavLink>}
     </div>
    </nav>  
  )
}

export default Navbar
