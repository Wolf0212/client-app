import styles from "./Input.module.css";

function Input(props) {
  return (
    <div className={styles.inlineInput}>
      <label className={styles.label} htmlFor={props.id}>
        {props.label}
      </label>
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        className={styles.input}
      ></input>
    </div>
  );
}

export default Input;
