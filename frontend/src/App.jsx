import  Home from "./pages/Home"
import { Route,Routes,BrowserRouter as Router } from 'react-router-dom'
import LeafletMap from "./pages/Nearptpg"

function App() {
  

  return (
    <>
      <Router>
        <Routes>
    
            <Route path="/" element={<Home/>}/>
            <Route path="/emergency" element={<LeafletMap/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App