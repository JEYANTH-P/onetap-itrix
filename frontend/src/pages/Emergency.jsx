import  Map from '../components/map'
import WebcamCapture from '../components/cam'
import UserLocation from '../components/userLocation'


function Emergency() {
  return (
    <>  
        <Map />
        <UserLocation />
        <div>Home</div>
        <WebcamCapture />
    </>
  )
}

export default Emergency;