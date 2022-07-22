import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Avatar,
  ListItemIcon,
  Divider,
  InputBase,
  useScrollTrigger,
  Slide,
  Modal,
  TextField,
} from "@mui/material";

import { useEffect, useRef, useState } from "react";
import logo from ".././../assets/images/Logo.png";
import { Container } from "@mui/system";
import {
  AccountCircle,
  AddBox,
  AddCircle,
  Lock,
  Logout,
  Search,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { pink } from "@mui/material/colors";
import { styled, alpha } from "@mui/material/styles";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { API_URL } from "../../api/agent";

const SearchBar = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.5),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,

  flexGrow: "1",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    maxWidth: "50%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    borderRadius: theme.shape.borderRadius,
    border: "1px solid #fbcfe8",
    width: "100%",
  },
}));

// const schema = yup.object().shape({
//   currentPassword: yup.string().required(),
//   newPassword: yup.string().required(),
//   confirmPassword: yup.string().oneOf([yup.ref("newPassword", null)]),
// });

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function Navbar({ history, match }) {
  // const {
  //   register,
  //   handleSubmit,
  //   control,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(schema),
  // });
  const currentPassword = useRef();
  const newPassword = useRef();
  const confirmPassword = useRef();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    handleClose();
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUserClick = function (setting) {
    if (setting === "Profile") {
      history.push("/profile");
    } else if (setting === "Change password") {
      toast("Open modal");
    } else if (setting === "Logout") {
      localStorage.clear();
      toast("Successfully logged out");
      history.push("/login");
    }
  };

  const onSuccess = async () => {
    const payload = {
      password: confirmPassword.current.value,
    };
    axios.patch(`${API_URL}/users/${match.params.id}`, payload).then(() => {
      toast.success("Your password has been updated");
    });
  };

  return (
    <HideOnScroll>
      <AppBar
        position="sticky"
        className="text-slate-600"
        color="inherit"
        sx={{ backgroundColor: "rgb(252, 231, 243)" }}
      >
        {/* <Modal open={openModal} onClose={handleCloseModal}>
          <form onSubmit={handleSubmit(onSuccess)}>
            <div className="flex w-screen h-screen justify-center items-center">
              <div className="w-1/3 bg-white p-8">
                <h3 className="font-bold text-2xl text-center">
                  Change your password
                </h3>
                <Controller
                  control={control}
                  name="currentPassword"
                  render={() => {
                    <TextField
                      inputRef={currentPassword}
                      label="Current password"
                      placeholder="Current password"
                      fullWidth
                    />;
                  }}
                />

                <TextField
                  inputRef={newPassword}
                  label="New password"
                  placeholder="New password"
                  fullWidth
                />
                <TextField
                  inputRef={confirmPassword}
                  label="Confirm new password"
                  placeholder="Confirm new password"
                  fullWidth
                />
                <Button type="submit">Change password</Button>
              </div>
            </div>
          </form>
        </Modal> */}
        <Container maxWidth="xl">
          <Toolbar className="gap-4 justify-between" disableGutters>
            <a href="/">
              <img src={logo} alt="logo" />
            </a>
            <IconButton
              href="/post-form/create"
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <AddCircle fontSize="large" className="text-pink-300" />
            </IconButton>
            <Button
              href="/post-form/create"
              sx={{
                display: { xs: "none", md: "flex", backgroundColor: pink[200] },
              }}
              variant="contained"
              startIcon={<AddBox />}
            >
              New post
            </Button>
            <div className="flex justify-center grow">
              <SearchBar>
                <SearchIconWrapper>
                  <Search />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search & Discover"
                  inputProps={{ "aria-label": "search" }}
                />
              </SearchBar>
            </div>
            {localStorage.token ? (
              <Box className="flex gap-4 min-h">
                <div
                  onClick={handleClick}
                  className="cursor-pointer flex items-center"
                >
                  <span className="text-center mr-3 text-slate-700 font-bold text-lg hidden md:block">
                    {localStorage.username}
                  </span>
                  <Avatar
                    sx={{
                      display: "inline-flex",
                      width: "37px",
                      height: "37px",
                    }}
                    alt={localStorage.username}
                    src={localStorage.getItem("avatar")}
                  />
                </div>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      minWidth: "200px",
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={() => handleUserClick("Profile")}>
                    <ListItemIcon>
                      <AccountCircle />
                    </ListItemIcon>{" "}
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleOpenModal}>
                    <ListItemIcon>
                      <Lock />
                    </ListItemIcon>{" "}
                    Change password
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={() => handleUserClick("Logout")}>
                    <ListItemIcon>
                      <Logout />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <div className="flex gap-4 justify-center">
                <Button href="/login" variant="text">
                  Sign in
                </Button>
                <Button href="/login" variant="contained">
                  Sign up
                </Button>
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
}

export default withRouter(Navbar); /* <TabPanel value={value} index={0}>

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
      </Box> */
{
  /* <PostForm></PostForm>
</TabPanel>
<TabPanel value={value} index={1}>
<ChangePasswordForm></ChangePasswordForm>
</TabPanel>
<TabPanel value={value} index={2}>
<UserForm></UserForm>
</TabPanel> */
}
