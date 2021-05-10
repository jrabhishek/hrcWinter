import logo from "./logo.svg";
import "./App.css";
import Header from "../src/component/Header";
import DashBoard from "../src/component/DashBoard";
import { pxToRem, pxToVh, pxToVw } from "./util/theme";
import { makeStyles } from "@material-ui/core";
import { Router, Route, Switch } from "react-router";
const useStyles = makeStyles({
  invoice: {
    marginTop: pxToRem(25),
    marginBottom: pxToRem(25),
    height: pxToRem(31),
    width: pxToRem(141),
    fontFamily: "Ubuntu",
    fontSize: pxToRem(32),
    color: "rgb(255, 255, 255)",
  },
  root: {
    paddingLeft: pxToVw(30),
    paddingRight: pxToRem(30),
    display: "flex",
    flexDirection: "column",
  },
  dashboard: {
    marginBottom: pxToRem(30),
  },
});

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <div className={classes.root}>
        
          <Header />
          <DashBoard className={classes.dashboard} />
        
      </div>
    </div>
  );
}

export default App;
