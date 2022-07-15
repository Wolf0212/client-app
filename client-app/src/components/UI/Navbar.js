import { Tabs, Tab, Box, Typography } from "@mui/material";

import { useState } from "react";

import PostForm from "../Forms/PostForm";
import UserForm from "../Forms/UserForm";
import ChangePasswordForm from "../Forms/ChangePasswordForm";
import styles from "./Navbar.module.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function Navbar() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box>
        <div className={styles.navbar}>
          <div className={styles.logo}>OnlyFans</div>
          <div style={{ marginRight: 1.2 + "rem" }}>
            <Tabs value={value} onChange={handleChange} aria-label="nav tabs">
              <Tab label="Page One" href="#" />
              <Tab label="Page Two" href="#" />
              <Tab label="Page Three" href="#" />
            </Tabs>
          </div>
        </div>
      </Box>
      <TabPanel value={value} index={0}>
        <PostForm></PostForm>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ChangePasswordForm></ChangePasswordForm>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <UserForm></UserForm>
      </TabPanel>
    </>
  );
}

export default Navbar;
