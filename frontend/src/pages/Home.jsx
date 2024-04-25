import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';


function Home() {
  const navigate = useNavigate(); // Move useNavigate inside the component function

  return (
    <> 
      <div>Home</div>
      <Button onClick={() => navigate('/Emergency')} >Emergency</Button>
      <Button onClick={() => navigate('/Nonemergency')} >Non-Emergency</Button> 
    </>
  );
}

export default Home;
