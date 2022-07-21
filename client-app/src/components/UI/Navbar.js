import { Box, AppBar, Toolbar, IconButton, Menu, MenuItem, Button, Avatar, ListItemIcon, Divider, InputBase, useScrollTrigger, Slide } from "@mui/material";

import { useState } from "react";
import logo from ".././../assets/images/Logo.png";
import { Container } from "@mui/system";
import { AccountCircle, AddBox, AddCircle, Lock, Logout, Search } from "@mui/icons-material";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { pink } from "@mui/material/colors";
import { styled, alpha } from '@mui/material/styles';

const SearchBar = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.5)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,

  flexGrow: '1',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    maxWidth: '50%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    borderRadius: theme.shape.borderRadius,
    border: "1px solid #fbcfe8",
    width: '100%'
  },
}));

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

function Navbar({ history }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUserClick = function (setting) {
    if (setting === 'Profile') {
      history.push('/profile')
    } else if (setting === 'Change password') {
      toast('Open modal');
    }
    else if (setting === 'Logout') {
      localStorage.clear();
      toast("Successfully logged out");
      history.push('/login');
    }
  }

  return (
    <HideOnScroll>
      <AppBar position="sticky" className="text-slate-600" color="inherit" sx={{ backgroundColor: "rgb(252, 231, 243)" }}>
        <Container maxWidth="xl">
          <Toolbar className="gap-4 justify-between" disableGutters>
            <a href="/">
              <img src={logo} alt="logo" />
            </a>
            <IconButton href="/post-form/create" sx={{ display: { xs: 'flex', sm: 'none' } }}><AddCircle fontSize="large" className="text-pink-300" /></IconButton>
            <Button href="/post-form/create" sx={{ display: { xs: 'none', sm: 'flex', backgroundColor: pink[200] } }} variant="contained" startIcon={<AddBox />}>New post</Button>
            <div className="grow flex sm:flex justify-center ">
              <SearchBar>
                <SearchIconWrapper>
                  <Search />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search & Discover"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </SearchBar>
            </div>
            {localStorage.token ? <Box className="flex gap-4 min-h">
              <div onClick={handleClick} className="cursor-pointer">
                <span className="text-center mr-3 text-slate-700 font-bold text-lg truncate">{localStorage.username}</span>
                <Avatar sx={{ display: "inline-flex", width: '37px', height: '37px' }} alt={localStorage.username} src="/static/images/avatar/2.jpg" />
              </div>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    minWidth: '200px',
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={() => handleUserClick('Profile')}>
                  <ListItemIcon >
                    <AccountCircle />
                  </ListItemIcon> Profile
                </MenuItem>
                <MenuItem onClick={() => handleUserClick('Change Password')}>
                  <ListItemIcon>
                    <Lock />
                  </ListItemIcon> Change password
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => handleUserClick('Logout')}>
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box> :
              <div className="flex gap-4 justify-center">
                <Button href="/login" variant="text">Sign in</Button>
                <Button href="/login" variant="contained">Sign up</Button>
              </div>
            }
          </Toolbar>
        </Container>
      </AppBar >
    </HideOnScroll>

  );
}



export default withRouter(Navbar);




/* <Box>
        <div className={styles.navbar}>
          <div className={styles.logo}>OnlyFans</div>
          <div style={{ marginRight: 1.2 + "rem" }}>
            <Tabs value={value} onChange={handleChange} aria-label="nav tabs">
              <Tab label="Page One" href="#" />
              <Tab label="Page Two" href="#" />
              <Tab label="Page Three" href="#" />
            </Tabs>
          </div>+
          
        </div>
      </Box> */ /* <TabPanel value={value} index={0}>
<PostForm></PostForm>
</TabPanel>
<TabPanel value={value} index={1}>
<ChangePasswordForm></ChangePasswordForm>
</TabPanel>
<TabPanel value={value} index={2}>
<UserForm></UserForm>
</TabPanel> */