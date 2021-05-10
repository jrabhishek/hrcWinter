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
import RemoveIcon from "@material-ui/icons/Remove";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { addToInvoice, addToSelected, deleteInvoice } from "../action";
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

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, open, handleClose, ...other } = props;
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
    color: "white",
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    backgroundColor: "#2A3F4D",
  },
}))(MuiDialogActions);

const useStyles = makeStyles((theme) => ({
  buttonCancelColor: {
    color: "white",
    backgroundColor: "transparent",
    border: "1px solid #14AFF1",
  },
  buttonSaveColor: {
    color: "white",
    backgroundColor: "#14AFF1",
  },
  changeDialog: {
    maxWidth: "47%",
    maxHeight: "47%",
    display: "flex",
    justifyContent: "center",
    margin: "auto",
  },
  spanEdit: {
    color: "#FF5E5E",
  },
  delete: {
    variant: "outlined",
    disableRipple: "true",
    marginLeft: "1.05vw",
    height: "4.7vh",
    width: "6.4vw",
    paddingLeft: "1px",
    fontSize: "1.056vw",
    fontFamily: "Ubuntu",
    color: "#97A1A9",
    borderRadius: "0.5rem",
    border: "0.04rem solid #97A1A9",
    letterSpacing: "0px",
    textTransform: "none",
  },
}));

const DeleteModal = (props) => {
  const { open, handleClose } = props;
  const classes = useStyles();
  const deleteInvoice = () => {
    axios
      .delete("http://localhost:8080/Invoicedetail", {
        data: {
          id: props.selected,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          props.deleteInvoiceSelected();
        }
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        handleClose();
      });
  };
  return (
    <div>
      {/* dialog box body starts here */}

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className={classes.changeDialog}
      >
        {/* Dialog box title starts here   */}
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <span style={{ paddingLeft: "4px" }}>Delete record(s)?</span>
        </DialogTitle>

        {/* Dialog box content starts here */}

        <DialogContent dividers>
          <Typography gutterBottom>
            You'll lose your record(s) after this action. We can't recover them
            once you delete.
          </Typography>
          <Typography gutterBottom>
            Are you sure you want to{" "}
            <span className={classes.spanEdit}>permanently delete</span> them?
          </Typography>
        </DialogContent>

        {/* Dialog box action buttons starts here */}

        <DialogActions>
          <div>
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  autoFocus
                  onClick={handleClose}
                  color="primary"
                  className={classes.buttonCancelColor}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.buttonSaveColor}
                  onClick={deleteInvoice}
                >
                  Save
                </Button>
              </Grid>
            </Grid>

            {/* main grid ending */}
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};
const mapStateToProps = (state) => ({
  rows: state.invoice.invoiceDetails,
  selected: state.invoice.selected,
});
const mapDispatchToProps = (dispatch) => ({
  addInvoice: (data) => dispatch(addToInvoice(data)),
  setSelected: (data) => dispatch(addToSelected(data)),
  deleteInvoiceSelected: () => dispatch(deleteInvoice()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal);
