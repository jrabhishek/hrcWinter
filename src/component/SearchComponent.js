import React, { useState } from "react";
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import { connect } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { green } from "@material-ui/core/colors";
import SearchIcon from "@material-ui/icons/Search";
import { pxToRem, pxToVh, pxToVw } from "../util/theme";
import { setSearchText, addToInvoice, searchInvoice } from "../action";
import axios from "axios";

const CssTextField = withStyles({
  root: {
    width: pxToRem(340),
    height: pxToRem(45),
    borderRadius: pxToRem(10),
    backgroundColor: "#283A46",
    "& label.Mui-focused": {
      borderColor: "#356680",
      borderWidth: pxToRem(2),
      borderRadius: pxToRem(30),
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#356680",
        borderWidth: pxToRem(2),
        borderRadius: pxToRem(10),
      },
      "&:hover fieldset": {
        borderColor: "#14AFF1",
        borderWidth: pxToRem(2),
        borderRadius: pxToRem(10),
      },
      "&.Mui-focused fieldset": {
        borderColor: "#14AFF1",
        borderWidth: pxToRem(2),
        borderRadius: pxToRem(10),
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "#273D49CC",
    height: pxToRem(10),
  },
  margin: {
    margin: theme.spacing(1),
    height: pxToRem(45),
  },
  text: {
    color: "#97A1A9",
    fontSize: pxToRem(18),
    textAlign: "center",
    height: pxToRem(50),
    "&.Mui-focused": {
      color: "#FFFFFF",
      fontSize: pxToRem(18),
      textAlign: "center",
    },
  },
}));
let debounceTimer = null;
const SearchComponent = (props) => {
  const classes = useStyles();
  const [searchtext, setSearchText] = useState("");

  const getSearchResult = (searchTerm) => {
    axios
      .get("http://localhost:8080/SearchInvoice", {
        params: {
          id: searchTerm,
        },
      })
      .then((response) => {
        console.log(response.data.invoices);
        props.searchInvoice(response.data.invoices);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSearchValueChange = (e) => {
    const newSearchTerm = e.target.value;
    props.setSearchText(newSearchTerm);
    if (newSearchTerm.trim().length >= 3) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        getSearchResult(newSearchTerm);
      }, 2500);
    }
  };

  return (
    <>
      <CssTextField
        // className={classes.margin}

        label=""
        autoComplete="off"
        placeholder="Search by Invoice Number"
        variant="outlined"
        id="custom-css-outlined-input"
        onChange={handleSearchValueChange}
        value={props.searchText}
        InputProps={{
          endAdornment: <SearchIcon style={{ color: "#97A1A9" }} />,
          className: classes.text,
        }}
      />
      <p>{searchtext}</p>
    </>
  );
};
const mapStateToProps = (state) => ({
  rows: state.invoice.invoiceDetails,
  selected: state.invoice.selected,
  searchtext: state.invoice.searchText,
});
const mapDispatchToProps = (dispatch) => ({
  addInvoice: (data) => dispatch(addToInvoice(data)),
  searchInvoice: (data) => dispatch(searchInvoice(data)),
  setSearchText: (data) => dispatch(setSearchText(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
