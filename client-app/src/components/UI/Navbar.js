import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.logo}>OnlyFans</div>
        <div className={styles.navList}>
          <ul>
            <li>
              <a href="#">Donate</a>
            </li>
            <li>
              <a href="#">Profile</a>
            </li>
            <li>
              <a href="#">Info</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
