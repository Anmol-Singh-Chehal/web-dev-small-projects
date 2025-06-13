import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {shiftToPremium} from '../slices/planSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const planType = useSelector((state)=>state.planSlice.type);
  
  return (
    <nav className='flex justify-between'>
     <p className='text-amber-500 font-semibold text-2xl hover:underline hover:cursor-pointer'>PokéCards</p>

     <button className='text-amber-500 font-semibold text-lg hover:cursor-pointer border-2 rounded-md px-2 py-0.5 bg-amber-950 hover:bg-amber-500 hover:text-amber-950 hover:border-amber-950' onClick={()=>dispatch(shiftToPremium(499))}>{planType}</button>
    </nav>
  )
}

export default Navbar
