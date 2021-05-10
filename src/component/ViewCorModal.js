import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { addToInvoice, addToSelected } from "../action";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { connect } from "react-redux";
import generatePdf from "../util/downloadPdf";
import axios from "axios";

const StyledButtonHollow = withStyles({
  root: {
    border: "1px solid #14AFF1",
    borderRadius: 7,
    color: "white",
    height: "2.3vw",
    padding: "0vw 0.9vw",
    margin: "0.3vw 0.6vw",
    fontSize: "1vw",
  },
  label: {
    textTransform: "capitalize",
  },
})(Button);

const StyledSelect = withStyles({
  root: {
    borderRadius: 7,
    color: "white",
    width: "6vw",
    padding: "0.5vw 0.9vw",
    fontSize: "0.89vw",
  },
})(Select);

const StyledButtonSolid = withStyles({
  root: {
    background: "linear-gradient(45deg, #14AFF1 30%, #14AFF1 90%)",
    borderRadius: 7,
    border: 0,
    color: "white",
    height: "2.3vw",
    padding: "0vw 1.2vw",
    margin: "0.3vw 0.3vw",
    fontSize: "1vw",
  },
  label: {
    textTransform: "capitalize",
  },
})(Button);

const useStyles = makeStyles((theme) => ({
  underline: {
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    minWidth: "30vw",
    borderRadius: "8px",
  },
  paper: {
    backgroundColor: "#2A3E4C",
    border: "0px solid #000",
    boxShadow: theme.shadows[5],
    borderRadius: "8px",
    outline: "none",
  },
  head: {
    color: "white",
    borderBottom: "1px solid black",
    fontSize: "1.5vw",
    padding: "1vw 1.6vw",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  body: {
    padding: "1vw 1.6vw",
    color: "#C0C6CA",
    fontSize: "1vw",
    overflowY: "scroll",
    maxHeight: "65vh",
  },
  tail: {
    borderTop: "1px solid black",
    padding: "1vw 0.6vw",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  smallRow: {
    paddingBottom: "3vh",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  select: {
    "& ul": {
      backgroundColor: "rgb(42, 83, 104)",
    },
    "& li": {
      color: "white",
      fontSize: "1vw",
    },
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#2E4350",
    color: theme.palette.common.white,
    borderBottom: "2px solid #283A46",
    fontSize: "0.9vw",
    color: "#97A1A9",
    paddingTop: "0px",
    paddingBottom: "0px",
  },
  body: {
    fontSize: "1.1vw",
    color: "white",
    paddingTop: "0px",
    paddingBottom: "0px",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: "#283A46",
    },
    "&:nth-of-type(odd)": {
      backgroundColor: "#2F4451",
      borderTop: "2px solid #2F4451",
      borderBottom: "2px solid #2F4451",
    },
    "&:hover": {
      backgroundColor: "#2A5368",
    },
  },
}))(TableRow);

const ViewCorModal = (props) => {
  const { open, handleClose } = props;
  var corrData = props.corrData;
  console.log(corrData());
  const [teamplate, setTemplate] = React.useState({});
  const fetchTemplate = () => {
    axios
      .get("http://localhost:8080/Correspondense")
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setTemplate(response.data);
          console.log(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(() => {
    fetchTemplate();
  }, []);

  const classes = useStyles();
  const [age, setAge] = React.useState(10);
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <span>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div
            style={{ width: "90vw", maxHeight: "90vh" }}
            className={classes.paper}
          >
            <div className={classes.head}>
              View Correspondence
              <div
                style={{
                  fontSize: "0.9vw",
                  display: "flex",
                  alignItems: "center",
                }}
                className="grey"
              >
                <div style={{ marginRight: "1vw" }}>
                  View:
                  <StyledSelect
                    style={{ marginLeft: "1vw", marginRight: "1.5vw" }}
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={age}
                    onChange={handleChange}
                    label="Age"
                    InputProps={{ disableUnderline: true }}
                    MenuProps={{ classes: { paper: classes.select } }}
                  >
                    <MenuItem value={10}>Template 1</MenuItem>
                    <MenuItem value={20}>Template 2</MenuItem>
                  </StyledSelect>
                </div>
                <CloseIcon
                  style={{ cursor: "pointer" }}
                  onClick={handleClose}
                />
              </div>
            </div>
            <div className={classes.body}>
              <p>
                Subject:{" "}
                <span style={{ color: "white" }}>
                  Invoice Details{" "}
                  {Object.keys(teamplate).length > 0
                    ? teamplate.t1.accountName
                    : ""}
                </span>
              </p>
              <p>
                <div>Dear Sir/Madam</div>
                {age === 10 ? <div>Greetings!</div> : null}
              </p>
              {age === 10 ? (
                <p>
                  This is to remind you that there are one or more open invoices
                  on your account. lease provide at your earliest convenience an
                  update on the payment details or clarify the reason for the
                  delay. If you have any specific issue with the invoice(s),
                  please let us know so that we can address it to the correct
                  Department.
                </p>
              ) : (
                <p>
                  <div>
                    Gentle reminder that you have one or more open invoices on
                    your account.
                  </div>
                  <div>
                    Please get back to us with an expected date of payment. If
                    you have any specific issue with the invoice(s), please let
                    us know so that we can address it at the earliest.
                  </div>
                </p>
              )}
              <p>Please find the details of the invoices below:</p>

              <TableContainer style={{ maxHeight: "67vh" }} component={Paper}>
                <Table
                  stickyHeader
                  className={classes.table}
                  aria-label="customized table"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Invoice Number</StyledTableCell>
                      <StyledTableCell>PO Number</StyledTableCell>
                      <StyledTableCell align="right">
                        Invioce Date
                      </StyledTableCell>
                      <StyledTableCell align="right">Due Date</StyledTableCell>
                      <StyledTableCell>Currency</StyledTableCell>
                      <StyledTableCell align="right">
                        Open Amount ($)
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.rows.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                          {row.invoiceId}
                        </StyledTableCell>
                        <StyledTableCell>{row.custNumber}</StyledTableCell>
                        <StyledTableCell align="right">
                          {row.postingDate}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.dueInDate}
                        </StyledTableCell>
                        <StyledTableCell>{row.invoiceCurrency}</StyledTableCell>
                        <StyledTableCell align="right">
                          {row.totalOpenAmount}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {age === 10 ? (
                <p>
                  Total Amount to be Paid:{" "}
                  <span style={{ color: "white" }}>$124.00K</span>
                </p>
              ) : null}
              <p>
                <div>
                  In case you have already made a payment for the above items,
                  please send us the details to ensure the payment is posted.
                </div>
                <div>
                  Let us know if we can be of any further assistance. Looking
                  forward to hearing from you.
                </div>
              </p>
              <p>
                <div>Kind Regards,</div>
                <div>
                  <span style={{ color: "white" }}>
                    {Object.keys(teamplate).length > 0
                      ? teamplate.t1.accountName
                      : ""}
                    {/* [Sender’s First Name][Sender’s Last Name] */}
                  </span>
                </div>
                <div>
                  Phone :{" "}
                  <span style={{ color: "white" }}>
                    {Object.keys(teamplate).length > 0
                      ? teamplate.t1.phone
                      : ""}
                    {/* [Sender’s contact number] */}
                  </span>
                </div>
                <div>
                  Fax :{" "}
                  <span style={{ color: "white" }}>
                    {/* [If any] */}
                    {Object.keys(teamplate).length > 0
                      ? teamplate.t1.phone
                      : ""}
                  </span>
                </div>
                <div>
                  Email :{" "}
                  <span style={{ color: "white" }}>
                    {/* [Sender’s Email Address] */}
                    {Object.keys(teamplate).length > 0 ? teamplate.t1.emai : ""}
                  </span>
                </div>
                <div>
                  <span style={{ color: "white" }}>
                    {Object.keys(teamplate).length > 0
                      ? teamplate.t1.cname
                      : ""}
                    {/* Company Name[Sender’s Company Name] */}
                  </span>
                </div>
              </p>
            </div>
            <div className={classes.tail}>
              <span></span>
              <div>
                <span>
                  <StyledButtonHollow
                    onClick={handleClose}
                    style={{
                      border: "none",
                      color: "#14AFF1",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </StyledButtonHollow>
                </span>
                <span>
                  <StyledButtonSolid
                    onClick={(e) => generatePdf(teamplate, age)}
                  >
                    Download
                  </StyledButtonSolid>
                </span>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </span>
  );
};
const mapStateToProps = (state) => ({
  selected: state.invoice.selected,
  rows: state.invoice.selectedData,
});
const mapDispatchToProps = (dispatch) => ({
  addInvoice: (data) => dispatch(addToInvoice(data)),
  setSelected: (data) => dispatch(addToSelected(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ViewCorModal);
