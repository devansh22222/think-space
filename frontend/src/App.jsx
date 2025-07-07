import { Route, Routes } from 'react-router-dom'
import './App.css'
import CreatePost from './components/CreatePost'
import Login from './components/Login'

import SignUp from './components/SignUp'
import Home from './components/Home'
import Profile from './components/Profile'


function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<SignUp/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path='/createPost' element={<CreatePost/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Routes> 
    </>
  )
}

export default App
