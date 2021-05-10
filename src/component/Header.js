import React from "react";
import Grid from "@material-ui/core/Grid";
import companyLogo from "../assets/kk.svg";
import hrcLogo from "../assets/hrc_logo.svg";
import { pxToRem, pxToVh, pxToVw } from "../util/theme";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import createMuiTheme from "../util/theme";

const myStyle = makeStyles({
  main: {
    display: "flex",
    width: "100vw",
    marginTop: pxToVh(20),

    // justifyContent:"center"
  },
  companyLogo: {
    height: `${pxToVh(46)}`,
    width: `${pxToVw(255)}`,
  },
  companyText: {
    height: `${pxToRem(50)}`,
    width: `${pxToRem(255)}`,
    fontSize: pxToRem(50),
    color: createMuiTheme.main.text,
    fontWeight: "800",
    letterSpacing: 0,
    margin: 0,
    // fontFamily: "Futura PT",
  },
  hrcLogo: {
    height: pxToRem(50),
    width: "60vw",
    display: "flex",
    justifyContent: "center",
    // alignItems: "center",
    textAlign: "center",
    alignSelf: "center",
    // marginLeft: pxToRem(490),
  },
});

function Header() {
  const classes = myStyle();
  return (
    <div className={classes.main}>
      <img className={classes.companyLogo} src={companyLogo} />
      {/* <h1 className={classes.companyText}>ABC Products</h1> */}
      <img className={classes.hrcLogo} src={hrcLogo} />
    </div>
  );
}

export default Header;
