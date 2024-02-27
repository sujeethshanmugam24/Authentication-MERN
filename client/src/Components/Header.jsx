import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Header() {
  const {currentuser}=useSelector(state=>state.user)

  return (
    <div className="bg-slate-600">
        <div className='flex justify-between p-3 items-center max-w-6xl mx-auto'>
            <Link to={'/'}><h1 className="font-bold">Authenticaion</h1></Link>
            <ul className='flex gap-4'>
                <Link to={'/'}><li>Home</li></Link>
                <Link to={'/About'}><li>About</li></Link>
                <Link to={'/profile'}> 
                {currentuser ? <img src={currentuser.profilepicture} alt='profile' className="h-7 w-7 rounded-full object-cover"/>
                : <li>Signin</li>}
                
                </Link>
              
            </ul>
        </div>

    </div>
  )
}
