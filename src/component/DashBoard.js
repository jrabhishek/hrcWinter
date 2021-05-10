import React from "react";
import { pxToRem, pxToVh, pxToVw } from "../util/theme";
import { makeStyles } from "@material-ui/core";
import createMuiTheme from "../util/theme";
import InvoiceDetail from "../component/InvoiceDetail";
import TableHeader from "../component/TableHeader";
const myStyle = makeStyles({
  root: {
    height: pxToRem(739),
    width: pxToRem(1860),
    background: "#273D49CC",
    marginTop: pxToRem(30),
    borderRadius: pxToRem(10),    
    display: "flex",
    justifyContent: "center",
    flexDirection:"column"
  },
});
function DashBoard() {
  const classes = myStyle();
  return (
    <div className={classes.root}>
      <TableHeader />
      <InvoiceDetail />
    </div>
  );
}

export default DashBoard;
