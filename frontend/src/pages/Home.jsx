import React from 'react'
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const navigate=useNavigate();
  return (
    <div>Home
        <div>
        <Dropdown>
  <MenuButton onClick={()=>{navigate("/fsignup")}}>Signup</MenuButton>
  <MenuButton onClick={()=>{navigate("/fsignin")}}>Signin</MenuButton>
</Dropdown>
        </div>
    </div>
  )
}
