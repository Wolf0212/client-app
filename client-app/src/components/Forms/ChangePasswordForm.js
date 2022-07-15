import { useRef, useState, useEffect } from "react";
import axios from "axios";

import {
  Input,
  Button,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";

const ariaLabel = { "aria-label": "description" };

function ChangePasswordForm(props) {
  const oldPassword = useRef();
  const newPassword = useRef();
  const confirmPassword = useRef();
  const [isValid, setIsValid] = useState(false);
  const [isSame, setIsSame] = useState(true);

  function ChangePasswordHandler(e) {
    e.preventDefault();
  }

  function CheckValidHandler() {
    if (
      oldPassword.current.value.trim() === "" ||
      newPassword.current.value.trim() === ""
    ) {
    } else {
      if (
        newPassword.current.value.trim() !==
        confirmPassword.current.value.trim()
      ) {
        setIsSame(false);
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    }
  }

  return (
    <form onSubmit={ChangePasswordHandler}>
      <FormControl fullWidth="true" margin="dense">
        <InputLabel htmlFor="oldpassword">Your password: </InputLabel>
        <Input
          id="oldpassword"
          inputRef={oldPassword}
          placeholder="Old Password"
          inputProps={ariaLabel}
          type="password"
          required
        />
      </FormControl>
      <FormControl fullWidth="true" margin="dense">
        <InputLabel htmlFor="newpassword">New password: </InputLabel>
        <Input
          id="newpassword"
          inputRef={newPassword}
          placeholder="New Password"
          type="password"
          inputProps={ariaLabel}
          onBlur={CheckValidHandler}
          required
        />
      </FormControl>
      <FormControl fullWidth="true" margin="dense">
        <InputLabel htmlFor="confirmpassword">
          Confirm new password:{" "}
        </InputLabel>
        <Input
          id="confirmpassword"
          inputRef={confirmPassword}
          placeholder="Confirm Password"
          inputProps={ariaLabel}
          type="password"
          onBlur={CheckValidHandler}
          required
        />
        <FormHelperText id="confirmpassword">
          {isSame === false ? "The password doesn't match." : ""}
        </FormHelperText>
      </FormControl>
      <Button
        disabled={isValid === true ? false : true}
        type="submit"
        variant="contained"
      >
        Confirm
      </Button>
    </form>
  );
}

export default ChangePasswordForm;
