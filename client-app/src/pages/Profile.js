import { AccountCircle, Assignment, Bookmarks, CheckCircle, Email, Favorite, ModeComment, PhotoCamera } from '@mui/icons-material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Avatar, Backdrop, CircularProgress, IconButton, Stack, Tab, Typography } from '@mui/material'
import { pink } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/UI/Navbar'
import { ProfileTab } from '../components/ProfileTab';
import { PostTab } from '../components/PostTab';
import { BookmarkTab } from '../components/BookmarkTab';
import { connect } from 'react-redux'
import { UploadFile } from '../assets//misc/fileUploader'
import { toast } from 'react-toastify'

const Profile = ({ user, getUser, getPostLikes, likes, updateUser }) => {
    const [value, setValue] = useState('1');
    const [loading, setLoading] = useState(true)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const uploadAvatar = (e) => {
        setLoading(true);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(e.target.files[0]);
        fileReader.onload = async function () {
            if (!e.target.files[0].type.includes("image")) {
                toast.error("This type of file is not supported!");
            }
            else {
                const url = await UploadFile(e.target.files[0])
                const payload = { AvatarUrl: url }
                updateUser(payload).then(() => {
                    setLoading(false)
                    localStorage.setItem('avatar', url);
                }, () => () => setLoading(false));
            }
        }
    }

    useEffect(() => {
        console.log("here")
        getUser().then(() => {
            getPostLikes(`/$count?$filter=UserID eq ${localStorage.getItem('uid')}`).then(() => {
                setLoading(false);
            })
        })
    }, [getUser, getPostLikes, setLoading])

    return (
        <div>
            <Navbar></Navbar>
            {loading === true ? <Backdrop
                sx={{ color: '#d1d1d1', zIndex: "9999" }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop> : <div>
                {/* Upper section */}
                <div className='p-10 mt-20 w-full lg:w-4/5 mx-auto flex gap-4 items-center mb-10'>
                    <div className=' rounded-full relative'>
                        <Avatar src={user.AvatarUrl} className='border-2 border-white' alt="Username" sx={{ width: '168px', height: '168px' }} />
                        <IconButton size='small' sx={{
                            backgroundColor: pink[200],
                            position: 'absolute',
                            right: '0px',
                            color: 'white',
                            bottom: '20px',
                            border: '2px solid white',
                            '&:hover': {
                                backgroundColor: pink[200],
                            }
                        }}
                            color="primary" aria-label="upload picture" component="label">
                            <input hidden accept="image/*" type="file" onChange={uploadAvatar} />
                            <PhotoCamera />
                        </IconButton>
                    </div>

                    <Stack spacing={2}>
                        <div className="text-5xl font-bold text-neutral-600">{user.Username}</div>
                        <Stack direction="row" spacing={2}>
                            <Stack spacing={1} direction="row" className='border-r pr-4 border-pink-300'>
                                <CheckCircle sx={{ color: pink[200] }} />
                                <Typography variant="subtitle1">Active</Typography>
                            </Stack>
                            <Stack spacing={1} direction="row" className='border-r pr-4 border-pink-300'>
                                <Email sx={{ color: pink[200] }} />
                                <Typography variant="subtitle1">{user.Email}</Typography>
                            </Stack>
                            <Stack spacing={1} direction="row" className='border-r pr-4 border-pink-300'>
                                <ModeComment sx={{ color: pink[200] }} />
                                <Typography variant="subtitle1">0 Comments</Typography>
                            </Stack>
                            <Stack spacing={1} direction="row">
                                <Favorite sx={{ color: pink[200] }} />
                                <Typography variant="subtitle1">{likes} Likes</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </div>
                {/* Tab section */}
                <TabContext value={value}>
                    <TabList
                        sx={{ '& .MuiTabs-indicator': { backgroundColor: pink[200] }, boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;" }}
                        onChange={handleChange}
                        textColor="inherit"
                        className='w-full lg:w-4/5 mx-auto mb-6'
                        variant='fullWidth'
                    >
                        <Tab label="Profile" iconPosition='start' icon={<AccountCircle />} value="1" />
                        <Tab label="Posts" iconPosition='start' icon={<Assignment />} value="2" />
                        <Tab label="Favorite" iconPosition='start' icon={<Favorite />} value="3" />
                        <Tab label="Bookmarks" iconPosition='start' icon={<Bookmarks />} value="4" />
                    </TabList>
                    <TabPanel className='w-full lg:w-4/5 mx-auto' value="1"><ProfileTab /></TabPanel>
                    <TabPanel className='w-full lg:w-4/5 mx-auto' value="2"><PostTab /></TabPanel>
                    <TabPanel className='w-full lg:w-4/5 mx-auto' value="3">Favorite</TabPanel>
                    <TabPanel className='w-full lg:w-4/5 mx-auto' value="4"><BookmarkTab /></TabPanel>
                </TabContext>
            </div>}



        </div >
    )
}

const mapStateToProps = (state) => ({
    user: state.userModel.user,
    likes: state.postModel.postLike,
})

const mapDispatchToProps = (dispatch) => ({
    getUser: dispatch.userModel.getUser,
    getPostLikes: dispatch.postModel.getPostLikes,
    updateUser: dispatch.userModel.updateUser,
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
