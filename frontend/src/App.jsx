import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Register from './Register.jsx'
import Login from './Login.jsx'

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
