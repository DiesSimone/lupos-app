import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Register from './Register.jsx'
import Login from './Login.jsx'
import Dashboard from './Dashboard.jsx'

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
