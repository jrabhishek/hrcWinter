import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import { pxToRem, pxToVh, pxToVw } from "../util/theme";
import Snackbar from "@material-ui/core/Snackbar";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";
import Icon from "@material-ui/core/Icon";
import { connect } from "react-redux";
import { addNewInvoice } from "../action";

// import { DatePicker } from "@material-ui/pickers";
import InputBase from "@material-ui/core/InputBase";
import axios from "axios";
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: "#2A3F4D",
    color: "white",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const inputStyles = makeStyles((theme) => ({
  noteBox: {
    marginTop: "10px",
    backgroundColor: "#283A46",
    borderRadius: "0.5rem",
    outline: "none",
    outlineColor: "#14AFF1",
    border: "1px solid #356680",
    "&:hover": {
      border: "1px solid #14AFF1",
    },
    color: "white",
    padding: "0.5rem",
    width: "25vw",
    maxWidth: "600vw",
  },
  label: {},
  main: {
    width: pxToRem(1106),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    backgroundColor: "#283A46",
    borderRadius: pxToRem(10),
    outline: "none",
    outlineColor: "#14AFF1",
    border: `${pxToRem(1)} solid #356680`,
    marginLeft: "2rem",
    "&:hover": {
      border: "1px solid #14AFF1",
    },
    color: "white",
    padding: "0.5rem",
    width: "17vw",
    maxWidth: "600vw",
    "&.Mui-disabled": {
      color: "white",
    },
  },
  datecontainer: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "#283A46",
    borderRadius: "0.5rem",
    outline: "none",
    outlineColor: "#14AFF1",
    border: "2px solid #356680",
    marginLeft: "2rem",
    marginBottom: "0.5rem",
    "&:hover": {
      border: "2px solid #14AFF1",
    },
    color: "#97A1A9",
    padding: "0.5rem",
    width: "17vw",
    maxWidth: "600vw",
    "&.MuiInputBase-root": {
      color: "#97A1A9",
    },
  },
  dateField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    color: "#97A1A9",
  },
}));
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    borderLeft: "5px",
  },
  icon: {
    color: "red",
    fontSize: "10",
    paddingRight: "15px",
  },
  snacktext: {
    fontFamily: "ubuntu",
    paddingRight: "50px",
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: "#2A3F4D",
    color: "#97A1A9",
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const AddModal = (props) => {
  //   const [open, setOpen] = React.useState(false);
  const { open, setOpen } = props;
  const snackBarStyle = useStyles();
  const inputStyle = inputStyles();
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const [input, setInput] = React.useState({
    name: "",
    amount: NaN,
    custNo: NaN,
    date: "",
    invoiceNo: NaN,
    notes: "",
  });
  const handleSnackBar = () => {
    setSnackBarOpen(!snackBarOpen);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    console.log(input);
  });
  const handleDate = (e) => {
    let date = e.target.value;
    setInput({ ...input, date: date });
  };
  const formateDate = (date) => {
    let newDate = new Date(date).toDateString();
    let rr = newDate.substring(4);
    let ff = rr.substring(0, 6) + "," + rr.substring(6);
    return ff;
  };
  const getCurrentDate = () => {
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10);
    {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    today = mm + "-" + dd + "-" + yyyy;
    return today;
  };
  const handleClear = (e) => {
    setInput({
      name: "",
      amount: NaN,
      custNo: NaN,
      date: "",
      invoiceNo: NaN,
      notes: "",
    });
  };
  const handleSave = (e) => {
    if (
      input.name === "" ||
      input.date === "" ||
      isNaN(input.amount) ||
      isNaN(input.invoiceNo) ||
      isNaN(input.custNo)
    ) {
      handleSnackBar();
    } else {
      const body = {
        dueInDate: formateDate(input.date),
        nameCustomer: input.custNo,
        notes: input.notes,
        totalOpenAmount: input.amount,
        invoiceId: input.invoiceNo,
      };
      console.log(body);
      axios
        .post("http://localhost:8080/Invoicedetail", body)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            const invoice = {
              businessCode: "U001",
              custNumber: input.custNo,
              nameCustomer: input.name,
              clearDate: "",
              businessYear: 2021,
              docId: response.data.id,
              invoiceId: input.invoiceNo,
              invoiceCurrency: "USD",
              documentType: "RV",
              postingId: 1,
              areaBusiness: "",
              totalOpenAmount: input.amount,
              baselineCreateDate: formateDate(input.date),
              custPaymentTerms: "NAA8",
              isOpen: 0,
              postingDate: getCurrentDate(),
              documentCreateDate: getCurrentDate(),
              dueInDate: formateDate(input.date),
            };
            props.addInvoice(invoice);
            handleClose();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="xl"
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          style={{ backgroundColor: "#2A3F4D", color: "#97A1A9" }}
        >
          <span style={{ paddingLeft: "4px", fontFamily: "ubuntu" }}>
            Add Invoice
          </span>
        </DialogTitle>
        <DialogContent dividers>
          <table>
            <tr>
              <td>
                <span style={{ fontFamily: " ubuntu", lineHeight: 3 }}>
                  Customer Name <span style={{ color: "#FF5B5B" }}>*</span>
                </span>
              </td>
              <td>
                <InputBase
                  className={inputStyle.textField}
                  inputProps={{ "aria-label": "naked" }}
                  name="test5"
                  value={input.name}
                  onChange={(e) => setInput({ ...input, name: e.target.value })}
                />
              </td>
              <td>
                <span
                  style={{
                    fontFamily: " ubuntu",
                    marginLeft: "2rem",
                    lineHeight: 3,
                  }}
                >
                  Due Date <span style={{ color: "#FF5B5B" }}>*</span>
                </span>
              </td>
              <td>
                <form className={inputStyle.datecontainer}>
                  <TextField
                    id="text"
                    type="date"
                    className={inputStyle.dateField}
                    value={input.date}
                    onChange={handleDate}
                  />
                </form>
              </td>
            </tr>
            <tr>
              <td>
                <span style={{ fontFamily: " ubuntu", lineHeight: 3 }}>
                  Customer No. <span style={{ color: "#FF5B5B" }}>*</span>
                </span>
              </td>
              <td>
                <InputBase
                  className={inputStyle.textField}
                  inputProps={{ "aria-label": "naked" }}
                  name="test5"
                  type="number"
                  value={input.custNo}
                  onChange={(e) =>
                    setInput({ ...input, custNo: e.target.value })
                  }
                />
              </td>
              <td>
                <span
                  style={{
                    fontFamily: " ubuntu",
                    marginLeft: "2rem",
                    lineHeight: 3,
                  }}
                >
                  Notes
                </span>
              </td>
              <td rowSpan="2">
                <InputBase
                  className={inputStyle.noteBox}
                  multiline
                  rows={7}
                  value={input.notes}
                  placeholder=""
                  onChange={(e) =>
                    setInput({ ...input, notes: e.target.value })
                  }
                  inputProps={{ "aria-label": "naked" }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <span style={{ fontFamily: " ubuntu", lineHeight: 3 }}>
                  Invoice No. <span style={{ color: "#FF5B5B" }}>&nbsp;*</span>
                </span>
              </td>
              <td>
                <InputBase
                  className={inputStyle.textField}
                  inputProps={{ "aria-label": "naked" }}
                  name="test5"
                  type="number"
                  value={input.invoiceNo}
                  onChange={(e) =>
                    setInput({ ...input, invoiceNo: e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <span style={{ fontFamily: " ubuntu", lineHeight: 3 }}>
                  Invoice Amount <span style={{ color: "#FF5B5B" }}>*</span>
                </span>
              </td>
              <td>
                <InputBase
                  className={inputStyle.textField}
                  inputProps={{ "aria-label": "naked" }}
                  name="test5"
                  type="number"
                  value={input.amount}
                  onChange={(e) =>
                    setInput({ ...input, amount: e.target.value })
                  }
                />
              </td>
            </tr>
          </table>
        </DialogContent>

        <DialogActions
          style={{
            justifyContent: "space-between",
            backgroundColor: "#2A3E4C",
          }}
        >
          <div style={{ justifyContent: "flex-start" }}>
            <Button
              autoFocus
              onClick={handleClose}
              style={{ color: "#14AFF1" }}
            >
              Cancel
            </Button>
          </div>
          <div style={{ justifyContent: "flex-end" }}>
            <Button
              autoFocus
              variant="outlined"
              onClick={handleClear}
              style={{
                color: "#FFFFFF",
                fontFamily: "ubuntu",
                fontSize: pxToRem(18),
                borderRadius: "10px",
                border: "1.5px solid #14AFF1",
                textTransform: "none",
                width: pxToVw(90),
                marginRight: "2rem",
                "&:disabled": {
                  color: "#97A1A9",
                  fontSize: pxToRem(18),
                  borderRadius: "10px",
                  border: "1.5px solid #97A1A9",
                },
              }}
            >
              Clear
            </Button>
            <Button
              autoFocus
              variant="contained"
              onClick={handleSave}
              style={{
                color: "#FFFFFF",
                borderRadius: "10px",
                background: "#14AFF1 0% 0% no-repeat padding-box",
                fontFamily: "ubuntu",
                fontSize: pxToRem(18),
                fontWeight: "600",
                textTransform: "none",
                marginRight: "1rem",
                "&:disabled": {
                  color: "#FFFFFF",
                  background: "#97A1A9 0% 0% no-repeat padding-box",
                  fontFamily: "ubuntu",
                  fontSize: pxToRem(18),
                },
              }}
            >
              Save
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={handleSnackBar}
        message={
          <div className={snackBarStyle.container}>
            <Icon className={snackBarStyle.icon}>
              <ReportProblemOutlinedIcon />
            </Icon>
            <span className={snackBarStyle.snacktext}>
              Mandatory Fields can't be empty
            </span>
          </div>
        }
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackBar}
            >
              <CloseIcon fontSize="small" style={{ paddingLeft: "60px" }} />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  rows: state.invoice.invoiceDetails,
  selected: state.invoice.selected,
  selectedData: state.invoice.selectedData,
});
const mapDispatchToProps = (dispatch) => ({
  addInvoice: (data) => dispatch(addNewInvoice(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddModal);
