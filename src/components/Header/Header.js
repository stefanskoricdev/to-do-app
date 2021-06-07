import styles from "./Header.module.scss";
const header = (props) => {
  return (
    <header
      className={
        props.theme ? styles.Header : [styles.Header, styles["Light"]].join(" ")
      }
    ></header>
  );
};
export default header;
