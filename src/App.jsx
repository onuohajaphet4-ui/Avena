
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Page/Home'
import Like from './Page/Like'
import Chat from './Page/Chat'
import Chatroom from './Page/Chatroom'
import Profile from './Page/Profile'
import Likepro from './Page/Likepro'
import Profileedit from './Page/Profileedit'
import Setting from './Page/Setting'
import Prefrenceedit from './Page/Prefrenceedit'
import Login from './Profile/Login'
import Register from './Profile/Register'
import Intro from './Profile/Intro'
import Name from './Profile/Name'
import Age from './Profile/Age'
import Welcome from './Profile/Welcome'
import Gender from './Profile/Gender'
import Phone from './Profile/Phone'
import Prompt from './Profile/Prompt'
import Bio from './Profile/Bio'
import Photo from './Profile/Photo'
import Looking from './Preferencee/Lookingfor'
import Relation from './Preferencee/Relation'
import Interest from './Preferencee/Interest'
import Personality from './Preferencee/Personality'
import Agerange from './Preferencee/Agerange'
import Interests from './Component/Interest'
import Personalitys from './Component/Personality'
import User from './Page/Userpro'
import Forgot from './Profile/Forgot'
import Reset from './Profile/Reset'

function App() {

  return (
    <>
    <Routes>
               <Route path='/home' element={<Home/>} />
               <Route path='/' element={<Intro/>} />
               <Route path='/personality' element={<Personality/>} />
               <Route path='/relation' element={<Relation/>} />
               <Route path='/interest' element={<Interest/>} />
               <Route path='/looking' element={<Looking/>} />
               <Route path='/photo' element={<Photo/>} />
               <Route path='/prompts' element={<Prompt/>} />
               <Route path='/bio' element={<Bio/>} />
               <Route path='/gender' element={<Gender/>} />
               <Route path='/phone' element={<Phone/>} />
               <Route path='/age' element={<Age/>} />
               <Route path='/agerange' element={<Agerange/>} />
               <Route path='/welcome' element={<Welcome/>} />
               <Route path='/name' element={<Name/>} />
               <Route path='/login' element={<Login/>} />
               <Route path='/register' element={<Register/>} />
               <Route path='/like' element={<Like/>} />
               <Route path='/chat' element={<Chat/>} />
               <Route path='/chatroom/:id' element={<Chatroom/>} />
               <Route path='/profile' element={<Profile/>} />
               <Route path='/profileedit' element={<Profileedit/>} />
               <Route path='/prefrenceedit' element={<Prefrenceedit/>} />
               <Route path='/setting' element={<Setting/>} />
               <Route path='/edit-interest' element={<Interests/>} />
               <Route path='/edit-personality' element={<Personalitys/>} />
               <Route path='/likeprofile/:id' element={<Likepro/>} />
               <Route path='/userprofile/:id' element={<User/>} />
               <Route path='/forgot' element = {<Forgot/>}/>
               <Route path='/reset-password/:token' element = {<Reset/>}/> 
               
    </Routes>
    </>
  )
}

export default App
