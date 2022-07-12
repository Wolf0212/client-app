import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import store from './stores/rootStore.js'

function App(props) {
  const [number, setNumber] = useState(0)

  const mapState = (state) => ({

  })

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
