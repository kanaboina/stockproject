import { makeStyles } from "@material-ui/core";

const SelectButton = ({ children, selected, onClick, bg }) => {
  if (!bg) bg = selected ? "gold" : "none";

  const useStyles = makeStyles({
    selectbutton: {
      border: "1px solid",
      borderColor: bg !== "gold" && bg !== 'none' ? bg : "gold",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: bg !== "gold" ? "none" : "gold",
      color: selected ? (bg !== "gold" ? "white" : "black") : "",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: bg !== "gold" && bg !== "none" ? bg : "gold",
        color: bg !== "gold" && bg !== "none" ? "white" : "black",
      },
      width: "17%",
      //   margin: 5,
    },
  });

  const classes = useStyles();

  return (
    <span
      onClick={onClick}
      className={classes.selectbutton}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </span>
  );
};

export default SelectButton;
