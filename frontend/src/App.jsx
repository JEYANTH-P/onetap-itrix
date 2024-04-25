import Emergency from "./pages/Emergency"
import  Home from "./pages/Home"
import { Route,Routes,BrowserRouter as Router } from 'react-router-dom'
import Nonemergency from "./pages/Nonemergency"
function App() {
  

  return (
    <>
      <Router>
        <Routes>
    
            <Route path="/" element={<Home/>}/>
            <Route path="/emergency" element={<Emergency/>}/>
            <Route path="/Nonemergency" element={<Nonemergency/>}/>
         
        </Routes>
      </Router>
    </>
  )
}

export default App