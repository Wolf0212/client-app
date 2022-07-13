import { useRef } from "react";

import Input from "../Input";
import styles from "./Forms.module.css";

function ChangePasswordForm() {
  const oldPassword = useRef();
  const newPassword = useRef();
  const confirmPassword = useRef();

  function ChangePasswordHandler(e) {
    e.preventDefault();
    console.log(oldPassword);
    console.log(newPassword);
    console.log(confirmPassword);
    debugger;
  }

  return (
    <form onSubmit={ChangePasswordHandler}>
      <div className={styles.formGroup}>
        <Input
          ref={oldPassword}
          id="oldPassword"
          label="Old Password"
          placeholder="Old Password"
          type="password"
        ></Input>
      </div>
      <div className={styles.formGroup}>
        <Input
          ref={newPassword}
          id="newPassword"
          label="New Password"
          placeholder="New Password"
          type="password"
        ></Input>
      </div>
      <div className={styles.formGroup}>
        <Input
          ref={confirmPassword}
          id="confirmPassword"
          label="Confirm New Password"
          placeholder="Confirm New Password"
          type="password"
        ></Input>
      </div>
      <button>Confirm</button>
    </form>
  );
}

export default ChangePasswordForm;
