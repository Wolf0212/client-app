import { AccountCircle, Assignment, Bookmarks, CheckCircle, Email, Favorite, ModeComment, PhotoCamera } from '@mui/icons-material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Avatar, IconButton, Stack, Tab, Typography } from '@mui/material'
import { pink } from '@mui/material/colors'
import React, { useState } from 'react'
import Navbar from '../components/UI/Navbar'
import { ProfileTab } from '../components/ProfileTab';
import { PostTab } from '../components/PostTab';
import { BookmarkTab } from '../components/BookmarkTab';

function uploadAvatar(e) {
    console.log(e.target);
}

export const Profile = () => {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <div>
            <Navbar></Navbar>
            {/* Upper section */}
            <div className='p-10 mt-20 w-full lg:w-4/5 mx-auto flex gap-4 items-center mb-10'>
                <div className=' rounded-full relative'>
                    <Avatar className='border-2 border-pink-300' alt="Username" sx={{ width: '168px', height: '168px' }} />
                    <IconButton size='small' sx={{
                        backgroundColor: pink[200],
                        position: 'absolute',
                        right: '0px',
                        color: 'white',
                        bottom: '20px',
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
                    <div className="text-5xl font-bold text-neutral-600">This is username</div>
                    <Stack direction="row" spacing={2}>
                        <Stack spacing={1} direction="row" className='border-r pr-4 border-pink-300'>
                            <CheckCircle sx={{ color: pink[200] }} />
                            <Typography variant="subtitle1">Active</Typography>
                        </Stack>
                        <Stack spacing={1} direction="row" className='border-r pr-4 border-pink-300'>
                            <Email sx={{ color: pink[200] }} />
                            <Typography variant="subtitle1">dungnguyenquang221@gmail.com</Typography>
                        </Stack>
                        <Stack spacing={1} direction="row" className='border-r pr-4 border-pink-300'>
                            <ModeComment sx={{ color: pink[200] }} />
                            <Typography variant="subtitle1">0 Comments</Typography>
                        </Stack>
                        <Stack spacing={1} direction="row">
                            <Favorite sx={{ color: pink[200] }} />
                            <Typography variant="subtitle1">0 Likes</Typography>
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

        </div >
    )
}

/* <Tabs
    defaultActiveKey="profile"
    className="p-0 w-full lg:w-4/5 mx-auto font-bold text-black mt-4 mb-10 shadow-md rounded-lg "
    fill
    variant='tabs'
>
    <Tab eventKey="home" title="My posts" className="p-10 pt-0 pb-0 w-full lg:w-4/5 mx-auto " tabClassName='text-neutral-400 hover:text-black'>
        tab 1
    </Tab>
    <Tab eventKey="profile" title="Profile" className="p-10 pt-0 pb-0 w-full lg:w-4/5 mx-auto" tabClassName='text-neutral-400 hover:text-black'>
        tab 2
    </Tab>
    <Tab eventKey="contact" title="Bookmark" className="p-10 pt-0 pb-0 w-full lg:w-4/5 mx-auto" tabClassName='text-neutral-400 hover:text-black'>
        tab 4
    </Tab>
</Tabs> */
