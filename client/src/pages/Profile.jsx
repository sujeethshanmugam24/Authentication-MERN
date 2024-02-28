import { useSelector} from "react-redux"
import { useEffect, useRef, useState } from "react"
import {getDownloadURL, getStorage, ref} from 'firebase/storage'
import {app} from '../firebase'
import { uploadBytesResumable } from "firebase/storage"


export default function Profile() {
  const {currentuser}= useSelector(state=>state.user)
  const fileref=useRef(null)
  const [image,setimage] = useState(undefined)
  const[imagepercentage,setimagepercentage]=useState(0);
  const[imageerr,setimageerr]=useState(false);
  const[formdata,setformdata]=useState({});
  
  
  useEffect(()=>{
    if(image){
      handlefileupload(image);  
    }
  },[image]);
  const handlefileupload=async(image)=>{
    const storage=getStorage(app);
    const filename=new Date().getTime()+image.name;
    const storageref=ref(storage,filename);
    const uploadtask=uploadBytesResumable(storageref,image);
    uploadtask.on(
      'state_changed',
      (snapshot)=>{
        const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        setimagepercentage(Math.round(progress)); 
      
         }
    ,
    (error)=>{
      setimageerr(true);
    },
    ()=>{
      getDownloadURL(uploadtask.snapshot.ref).then(
        (downloadURL)=>{
          setformdata({...formdata,profilepicture:downloadURL});
        }
      )
    }
    )
  };
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
         <input type="file" ref={fileref} hidden accept='image/*' onChange={(e)=>setimage(e.target.files[0])}/>
        < img src={currentuser.profilepicture} alt="profile" className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2" onClick={()=>fileref.current.click()}/>
        <p className='text-sm self-center'>{imageerr ? (
          <span className='text-red-700'>Error uploading image</span>
        ):imagepercentage>0 && imagepercentage <100
?(
  <span className='text-slate-700'>uploading {imagepercentage}%</span>
)  :imagepercentage==100 ? (
  <span className='text-green-700'>Image uploaded successfully</span>
)   :'' }</p>

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
