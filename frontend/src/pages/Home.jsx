import  Map from '../components/map'
import WebcamCapture from '../components/cam'
import  userLocation from '../components/userLocation'

function Home() {
  return (
    <>  
        <Map />
        <userLocation />
        <div>Home</div>
        <WebcamCapture />

    </>

  )
}

export default Home