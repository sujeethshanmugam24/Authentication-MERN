import { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';

export default function Signin() {
  const [form,setform]=useState({});
  const [loading,setloading]=useState(false);
  const [error,seterror]=useState(false);
  const navigate=useNavigate();

  const handlechange=(e)=>{
    setform({...form,[e.target.id]:e.target.value});
  }
  const handlesubmit=async(e)=>{
    e.preventDefault();
    try{
      seterror(false);
      setloading(true);
      const res =await fetch('/api/auth/signin',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(form),
      });
      const data=await res.json();
      setloading(false);
      seterror(false);
      if(data.success===false){
        seterror(true);
        return;
      }
    
      navigate('/'); 
    }catch(err){
      setloading(false);
      seterror(true);
    }
  }
  
  return (<div>
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handlesubmit}>
        <input type="email" placeholder='email' id='email' className="bg-slate-100 p-3 rounded-lg border-2 border-black" onChange={handlechange}/>
        <input type="password" placeholder='password' id='password' className="bg-slate-100 p-3 rounded-lg border-2 border-black" onChange={handlechange}/>
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Sign in</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don't Have an account?</p>
        <Link to={'/Signup'}>
        <span className="text-blue-500">{loading?'Loading':'Sign up'}</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5"> {error && 'Something went wrong!!'}</p>
    </div> 
    </div>
  )
}
