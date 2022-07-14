import { AccountBox, ArrowBack, Email, EmailOutlined, KeyOutlined, Lock, LockOpen } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Checkbox, FormControlLabel, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import logo from '../assets/images/img-01.webp';
import BadgeIcon from '@mui/icons-material/Badge';

function Login() {
    const [loading, setLoading] = useState(false);

    function handleRegister() {

    }

    function handleLogin() {
        setLoading(true);
    }

    function handleRegister(data) {
        setLoading(true);
        console.log(data);
    }

    function moveImage(location) {
        if (location === 'register') {
            document.getElementById('wrapper').style.left = '100%';
            document.getElementById('right-panel').style.opacity = '0%';
            document.getElementById('left-panel').style.opacity = '100%';
        }
        if (location === 'login') {
            document.getElementById('wrapper').style.left = '0%';
            document.getElementById('right-panel').style.opacity = '100%';
            document.getElementById('left-panel').style.opacity = '0%';
        }
    }

    return (
        <div className='bg-gradient-to-br from-pink-400 to-pink-50 w-screen h-screen flex justify-center items-center'>
            <div className='border rounded-lg ml-5 mr-5 grid lg:grid-cols-2 grid-cols-1 lg:w-7/12 w-full h-2/3 shadow shadow-pink-200'>
                <div className='bg-pink-100 overflow-visible flex flex-col items-center justify-center relative'>
                    <div className='transition-all duration-300 opacity-0 p-10 grow w-full' id='left-panel'>
                        <form onSubmit={handleRegister}>
                            <Box className=' rounded-l-none grid grid-cols-2 gap-6 h-full'>
                                <h1 className='col-span-2 text-4xl text-pink-400 font-bold pb-6 text-center' style={{ fontFamily: 'Comic Sans MS' }}>Sign up</h1>
                                <TextField variant='outlined' label='First Name' placeholder='Your first name' name='first-name' />
                                <TextField variant='outlined' label='Last Name' placeholder='Your last name' />
                                <TextField className='col-span-2' variant='outlined' label='Username' placeholder='Your username' InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountBox />
                                        </InputAdornment>
                                    ),
                                }} />
                                <TextField type="email" className='col-span-2' variant='outlined' label='Email' placeholder='Your email' InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email />
                                        </InputAdornment>
                                    ),
                                }} />
                                <TextField type="password" className='col-span-2' variant='outlined' label='Password' placeholder='Your pasword' InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOpen />
                                        </InputAdornment>
                                    ),
                                }} />
                                <TextField type="password" className='col-span-2' variant='outlined' label='Re-enter password' placeholder='Re-enter your password' InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock />
                                        </InputAdornment>
                                    ),
                                }} />
                                <LoadingButton className='col-span-2 h-min' loading={loading} variant='contained' type='submit'>Login</LoadingButton>
                                <div className='text-center col-span-2'>
                                    <small className='text-pink-400'>
                                        <span className='text-slate-500 normal-case mr-1'>
                                            Have already an account ?
                                        </span>
                                        <span className='cursor-pointer' underline='none' onClick={() => moveImage('login')}>Login here</span>
                                    </small>
                                </div>
                            </Box>
                        </form>
                    </div>
                    <div id='wrapper' className='left-0 transition-all duration-500 bg-pink-200 moving z-10 absolute w-full h-full flex justify-center items-center'>
                        <img src={logo} alt='test' />
                    </div>
                </div>
                <div className='bg-pink-100 h-full w-full flex justify-center items-center'>
                    <div className='h-full w-full opacity-100 transition-all duration-300' id='right-panel'>
                        <form className='h-full w-full' onSubmit={handleLogin}>
                            <Box className=' p-10 flex gap-2 flex-col justify-center h-full'>
                                <h1 className='text-4xl text-pink-400 font-bold pb-6 text-center' style={{ fontFamily: 'Comic Sans MS' }}>Sign in</h1>
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
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" className='pt-4 pb-3' />
                                <LoadingButton loading={loading} variant='contained' type='submit' onClick={handleLogin}>Login</LoadingButton>
                                <div className='pb-10'></div>
                                <Button color='secondary' href='#' underline='none' onClick={() => moveImage('register')}>
                                    <ArrowBack className='mr-2 text-pink-400' />
                                    <span className='text-pink-400'>Create an account</span></Button>
                            </Box>
                        </form>
                    </div>
                </div>


            </div>

        </div >
    )
}

export default Login