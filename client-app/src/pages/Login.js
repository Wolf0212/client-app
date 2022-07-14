import { EmailOutlined, KeyOutlined } from '@mui/icons-material';
import { Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, Link, Paper, TextField } from '@mui/material';
import { useState } from 'react';
import logo from '../assets/images/img-01.webp';

function Login() {
    const [loading, setLoading] = useState(false);

    function handleLogin() {
        alert('Successfully logged in!');
    }

    return (
        <div className='bg-gradient-to-br from-pink-400 to-pink-50 w-screen h-screen flex justify-center items-center'>
            <div className='border rounded-lg ml-5 mr-5 grid lg:grid-cols-2 grid-cols-1 lg:w-7/12 w-full h-2/3 shadow shadow-pink-200'>
                <div className='bg-pink-100 flex flex-col items-center justify-center '>
                    <img className='' src={logo} alt='test' />

                </div>
                <div className='h-full bg-pink-100 pr-20'>
                    <Box className=' roundd-l-none p-10 flex gap-2 flex-col justify-center h-full'>
                        <h1 className='text-4xl text-pink-400 font-bold pb-6 text-center' style={{ fontFamily: 'Comic Sans MS' }}>OnlyFunds</h1>
                        <label htmlFor="email">Email</label>
                        <Box className='flex items-end'>
                            <EmailOutlined sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="email" placeholder='Type your email' variant="standard" fullWidth />
                        </Box>

                        <label htmlFor="password" className='pt-4'>Password</label>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <KeyOutlined sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="password" variant="standard" fullWidth placeholder='Type your password' />
                        </Box>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" className='pt-4' />
                        <Button variant='contained' fullWidth type='submit' onClick={handleLogin}>Login</Button>
                        <Link href="/register" textAlign='center' className='pt-11' >Register an account</Link>
                    </Box>
                </div>

            </div>

        </div>
    )
}

export default Login