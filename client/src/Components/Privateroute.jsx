import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function Privateroute() {
    const {currentuser}=useSelector(state=>state.user)
  return (
    currentuser? <Outlet/>:<Navigate to='/signin'/>  )
}
