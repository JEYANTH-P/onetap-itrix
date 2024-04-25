
import { Button } from "@/components/ui/button"; 

function Emergency() {
  return (
    <>  
        <Button onClick={() => window.open("https://rishi-kumar18.github.io/emergencyrepo/", "_blank")}>Ambulance</Button>
        <Button onClick={() => window.open("https://rishi-kumar18.github.io/emergencyrepo/", "_blank")}>Fire</Button>
        <Button onClick={() => window.open("https://rishi-kumar18.github.io/emergencyrepo/", "_blank")}>Police</Button>
    </>
  )
}

export default Emergency;