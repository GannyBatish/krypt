import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme)=>({
    selectbutton: {
      textAlign:'center',
      border: "1px solid gold",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Montserrat",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "gold",
        color: "black",
      },
      width: "75px",
      marginLeft:'20px',
      [theme.breakpoints.down("xs")]:{
        width:'50px',
        textAlign:'center',
      }
      //   margin: 5,
    },
  }));
const SelectButton = ({ children, selected, onClick }) => {
  const classes = useStyles();
  const select=selected;
  return (
    <span onClick={onClick} className={classes.selectbutton}
    style={{
        backgroundColor: selected ? "gold" : "",
        color: selected ? "black" : "",
        fontWeight: selected ? 700 : 500,
    }}>
      {children}
    </span>
  );
};

export default SelectButton;