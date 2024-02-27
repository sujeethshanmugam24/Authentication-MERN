import { useSelector} from "react-redux"

export default function Profile() {
  const {currentuser}= useSelector(state=>state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        < img src={currentuser.profilepicture} alt="profile" className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"/>
        <input defaultValue={currentuser.username} type="text" id="username" placeholder="username" className='bg-slate-100 rounded-lg p-3 border-2 border-black'/>
        <input defaultValue={currentuser.email} type="email" id="email" placeholder="email" className='bg-slate-100 rounded-lg p-3 border-2 border-black'/>
        <input type="password" id="password" placeholder="password" className='bg-slate-100 rounded-lg p-3 border-2 border-black'/>
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">update</button>
      </form>
      <div className=' flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}
