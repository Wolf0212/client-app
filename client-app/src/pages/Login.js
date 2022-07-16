import { AccountCircle, ArrowBack, Email, KeyOutlined, Lock, LockOpen } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Checkbox, FormControlLabel, InputAdornment, TextField } from '@mui/material';
import { useRef, useState } from 'react';
import logo from '../assets/images/img-01.webp';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import { API_URL } from '../api/agent.js';
import { toast } from 'react-toastify';
import { moveImage } from '../assets/misc/animation';
import { decodeJwt } from '../assets/misc/utilities';

const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required(),
    username: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
})

function Login({ history }) {
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const username_login = useRef();
    const password_login = useRef();
    const firstName = useRef();
    const lastName = useRef();
    const email = useRef();
    const username_reg = useRef();
    const password_reg = useRef();
    const rememberMe = useRef();

    const [loading, setLoading] = useState(false);



    const onSuccess = async () => {
        setLoading(true);
        const payload = {
            username: username_reg.current.value,
            password: password_reg.current.value,
            email: email.current.value,
            firstName: firstName.current.value,
            lastName: lastName.current.value,
        }
        await axios.post(API_URL + "/Users", payload).then(() => {
            toast.success("Register successfully");
            moveImage('login');
            setLoading(false);
        }, (error) => {
            toast.error("Error: " + error.response.data.value);
            setLoading(false);
        })
    }

    async function handleLogin(e) {
        setLoading(true);
        e.preventDefault();
        const payload = {
            username: username_login.current.value,
            password: password_login.current.value,
            rememberMe: rememberMe.current.checked,
        }
        await axios.post(API_URL + "/authentication", payload).then((data) => {
            localStorage.setItem("token", data.data);
            var decoded = decodeJwt(data.data);
            localStorage.setItem("email", decoded.Email);
            localStorage.setItem("username", decoded.Username);
            localStorage.setItem("uid", decoded.UserId);
            setLoading(false);
            history.push("/");
        }, (error) => {
            if (error.response.status === 401) {
                toast.error("Invalid credentials");
            }
            setLoading(false);
        })
    }

    return (
        <div className='bg-gradient-to-br from-pink-400 to-pink-50 min-w-screen min-h-screen flex justify-center items-center pt-4 pb-4'>
            <div className='rounded-lg ml-5 mr-5 grid lg:grid-cols-2 grid-cols-1 lg:w-7/12 w-full h-2/3 shadow shadow-pink-200'>
                <div className='bg-pink-100 overflow-visible flex flex-col items-center justify-center relative border rounded-l-md'>
                    <div className='transition-all duration-300 opacity-0 p-10 grow w-full' id='left-panel'>
                        <form onSubmit={handleSubmit(onSuccess)}>
                            <Box className=' rounded-l-none grid grid-cols-2 gap-6 h-full'>
                                <h1 className='col-span-2 text-4xl text-pink-400 font-bold pb-6 text-center' style={{ fontFamily: 'Comic Sans MS' }}>Sign up</h1>
                                <Controller
                                    control={control}
                                    name="firstName"
                                    render={() => <TextField inputRef={firstName} className='col-span-1' helperText={errors.firstName && "First name is required"} error={errors.firstName && true} variant='outlined' label='First Name' placeholder='Your first name' {...register("firstName")} />}
                                />
                                <Controller
                                    control={control}
                                    name="lastName"
                                    render={() => <TextField inputRef={lastName} className='col-span-1' helperText={errors.lastName && "Last name is required"} error={errors.lastName && true} variant='outlined' label='Last Name' placeholder='Your last name' {...register("lastName")} />}
                                />
                                <Controller control={control}
                                    name="username"
                                    render={() => <TextField inputRef={username_reg} {...register("username")} helperText={errors.username && "Username is required"} error={errors.username && true} name="username" type="text" className='col-span-2' variant='outlined' label='Username' placeholder='Your username' InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }} />}
                                />
                                <Controller control={control}
                                    name="email"
                                    render={() => <TextField inputRef={email} helperText={errors.email && "Email is required"} error={errors.email && true} {...register("email")} name="email" type="email" className='col-span-2' variant='outlined' label='Email' placeholder='Your email' InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email />
                                            </InputAdornment>
                                        ),
                                    }} />}
                                />
                                <Controller control={control}
                                    name="password"
                                    render={() => <TextField inputRef={password_reg} helperText={errors.password && "Password is required"} error={errors.password && true} {...register("password")} name="password" type="password" className='col-span-2' variant='outlined' label='Password' placeholder='Your password' InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOpen />
                                            </InputAdornment>
                                        ),
                                    }} />}
                                />
                                <Controller control={control}
                                    name="confrimPassword"
                                    render={() => <TextField helperText={errors.confirmPassword && "Password do not match!"} error={errors.confirmPassword && true} {...register("confirmPassword")} name="confirmPassword" type="password" className='col-span-2' variant='outlined' label='Re-enter password' placeholder='Re-enter your password' InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock />
                                            </InputAdornment>
                                        ),
                                    }} />}
                                />
                                <LoadingButton className='col-span-2 h-min' loading={loading} variant='contained' type='submit'>Register</LoadingButton>
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
                <div className='bg-pink-100 h-full w-full flex justify-center items-center border rounded-r-md'>
                    <div className='h-full w-full opacity-100 transition-all duration-300' id='right-panel'>
                        <form className='h-full w-full' onSubmit={handleLogin}>
                            <Box className=' p-10 flex gap-2 flex-col justify-center h-full'>
                                <h1 className='text-4xl text-pink-400 font-bold pb-6 text-center' style={{ fontFamily: 'Comic Sans MS' }}>Sign in</h1>
                                <label htmlFor="email">Username</label>
                                <Box className='flex items-end'>
                                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField inputRef={username_login} id="email" placeholder='Type your email' variant="standard" fullWidth />
                                </Box>
                                <label htmlFor="password" className='pt-4'>Password</label>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <KeyOutlined sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField inputRef={password_login} id="password" type="password" variant="standard" fullWidth placeholder='Type your password' />
                                </Box>
                                <FormControlLabel control={<Checkbox defaultChecked inputRef={rememberMe} />} label="Remember me" className='pt-4 pb-3' />
                                <LoadingButton loading={loading} variant='contained' type='submit'>Login</LoadingButton>
                                <div className='pb-10'></div>
                                <Button color='secondary' underline='none' onClick={() => moveImage('register')}>
                                    <ArrowBack className='mr-2 text-pink-400' />
                                    <span className='text-pink-400'>Create an account</span>
                                </Button>
                            </Box>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Login