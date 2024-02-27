import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Signin from './pages/Signin';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Header from './Components/Header';
import Privateroute from './Components/Privateroute';


export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/About' element={<About/>}/>
      <Route path='/Signin' element={<Signin/>}/>
      <Route path='/Signup' element={<Signup/>}/>
      <Route  element={<Privateroute/>}>
      <Route path='/Profile' element={<Profile/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}
