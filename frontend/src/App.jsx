import Emergency from "./pages/Emergency"
import  Home from "./pages/Home"
import { Route,Routes,BrowserRouter as Router } from 'react-router-dom'

function App() {
  

  return (
    <>
      <Router>
        <Routes>
    
            <Route path="/" element={<Home/>}/>
            <Route path="/emergency" element={<Emergency/>}/>
         
        </Routes>
      </Router>
    </>
  )
}

export default App