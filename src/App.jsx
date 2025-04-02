import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Silo from './pages/Silo'

import Footer from './components/Footer'
import Pagenotfound from './pages/Pagenotfound'
import Allrecipe from './pages/Allrecipe'
import MyRecipe from './pages/MyRecipe'
import { useContext } from 'react'
import { loginResponseContext } from './context/ContextShare'
function App() {
 const {loginResponse} = useContext(loginResponseContext)

  return (
    <>
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Silo />} />
        <Route path='/Register' element={<Silo signup={true} />} />
        <Route path='*' element={<Pagenotfound/>}/>
        <Route path='/All-Recipe' element={loginResponse ? <Allrecipe/>  : <Pagenotfound/>}/>
        <Route path='/My-Recipe' element={loginResponse ? <MyRecipe/>  : <Pagenotfound/>}/>
        
      </Routes>
      <Footer />
    </>
  )
}

export default App
