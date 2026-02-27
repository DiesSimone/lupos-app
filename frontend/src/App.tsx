import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Register from './Register.js'
import Login from './Login.js'
import Dashboard from './Dashboard.js'
import Tasks from './Tasks.js'
import ErrorPage from './404.js'

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/tasks' element={<Tasks />}/>
        <Route path='*' element={<ErrorPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
