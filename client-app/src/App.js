import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

function App() {
  const [number, setNumber] = useState(0)
  useEffect(() => alert('Page reloaded!'))

  return (
    <div>
      <ToastContainer />
      <Button onClick={() => {
        toast('Test toast');
        setNumber(number + 1);
      }} variant='outlined'>This is a MUI button</Button>
      <h1>You click {number} times</h1>
    </div>
  );
}

export default App;
