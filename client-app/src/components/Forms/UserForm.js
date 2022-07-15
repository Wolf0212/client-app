import { Box, FormControl, Input, InputLabel, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useRef } from "react";

const UserForm = (props) => {
  const username = useRef();
  const password = useRef();
  const confirmpassword = useRef();
  const email = useRef();
  const firstname = useRef();
  const lastname = useRef();

  //   useEffect(() => {
  //     if (!props.isAdd) {
  //       axios
  //         .get("https://localhost:44321/odata/Users/" + props.userId)
  //         .then((response) => {
  //           const userInfo = response.queryable[0];
  //         });
  //     }
  //   });

  function SubmitForm() {}

  return (
    <Box>
      <form onSubmit={SubmitForm}>
        <FormControl fullWidth="true" margin="dense">
          <InputLabel htmlFor="email">Email: </InputLabel>
          <Input
            required={true}
            inputRef={username}
            id="email"
            name="email"
            type="email"
            placeholder="Email"
          ></Input>
        </FormControl>
        <FormControl fullWidth="true" margin="dense">
          <InputLabel htmlFor="firstname">First Name: </InputLabel>
          <Input
            required={true}
            id="firstname"
            name="firstname"
            type="text"
            placeholder="First name"
          ></Input>
        </FormControl>
        <FormControl fullWidth="true" margin="dense">
          <InputLabel htmlFor="lastname">Last Name: </InputLabel>
          <Input
            required={true}
            id="lastname"
            name="lastname"
            type="text"
            placeholder="Last name"
          ></Input>
        </FormControl>
        <FormControl fullWidth="true" margin="dense">
          <InputLabel htmlFor="username">Username: </InputLabel>
          <Input
            required={true}
            id="username"
            name="username"
            type="text"
            placeholder="Username"
          ></Input>
        </FormControl>
        <FormControl fullWidth="true" margin="dense">
          <InputLabel htmlFor="password">Password: </InputLabel>
          <Input
            required={true}
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          ></Input>
        </FormControl>
        <FormControl fullWidth="true" margin="dense">
          <InputLabel htmlFor="passwordConfirm">Confirm Password: </InputLabel>
          <Input
            required={true}
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
          ></Input>
        </FormControl>
        <Button type="submit">Button</Button>
      </form>
    </Box>
  );
};

export default UserForm;
