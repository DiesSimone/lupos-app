import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import './App.css'
import Register from './Register.jsx'
import Login from './Login.jsx'

function App() {

  return (
    <BrowserRouter>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>

      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
