import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { pxToRem, pxToVh, pxToVw } from "../util/theme";
import clsx from "clsx";
import DeleteModal from "../component/DeleteModal";
import EditModal from "../component/EditModal";
import { addToInvoice, addToSelected } from "../action";
import { connect } from "react-redux";
import SearchComponent from "./SearchComponent";
import AddModal from "./AddModal";
import ViewCorModal from "./ViewCorModal";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
const styles = (theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    height: `${pxToRem(45)}`,
    width: `${pxToRem(1860)}`,
    paddingLeft: "1vw",
    paddingRight: "1vw",
    marginTop: `${pxToRem(30)}`,
    marginBottom: `${pxToRem(22)}`,
  },
  notchedOutline: { borderWidth: "1px", borderColor: "#5DAAE0 !important" },

  searchBtnStarted: {
    minHeight: pxToRem(45),
    fontSize: "0.95vw",
    border: "solid 0.75px #3B617C",
    // marginRight: '0.5rem',
    alignSelf: "center",
    color: "#5DAAE0",
    "&:hover": {
      backgroundColor: "#5daae0",
      color: "white",
    },
  },
  btnDisabled: {
    minHeight: pxToRem(45),
    fontSize: "0.95vw",
    border: "solid 0.75px #97A1A9",
    // marginRight: '0.5rem',
    alignSelf: "center",
    color: "#97A1A9",
  },
  searchBtnDisabled: {
    minWidth: "5vw",
    height: pxToRem(45),
    fontSize: "0.95vw",
    border: "solid 0.75px #3B617C",
    // marginRight: '0.5rem',
    alignSelf: "center",
    color: "white !important",
    background: "#FFFFFFa5",
    "&:hover": {
      cursor: "default",
      backgroundColor: "#FFFFFFa5",
    },
  },

  searchBtn: {
    marginTop: "2vh",
    minWidth: `${pxToRem(106)}`,
    height: `${pxToRem(45)}`,
    fontSize: pxToRem(20),
    border: "solid 0.75px #3B617C",
    font: "Ubuntu",
    alignSelf: "center",
    backgroundColor: "#97A1A9",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#5daae0",
      color: "white",
    },
    corb: {
      marginLeft: pxToRem(18),
    },
  },
}));
function TableHeader(props) {
  const isDeleteEnabled = () => {
    if (props.selected.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  const ll = false;
  const [addDialogOpen, setAddDialogOpen] = React.useState(false);
  const [dmOpen, setDmOpen] = React.useState(false);
  const [emOpen, setEmOpen] = React.useState(false);
  const [corOpen, setCorOpen] = React.useState(false);
  const classes = useStyles();
  
  const handleAddDialog = () => {
    setAddDialogOpen(!addDialogOpen);
  };
  const handleDelete = () => {
    setDmOpen(!dmOpen);
  };
  const handleEdit = () => {
    setEmOpen(!emOpen);
  };
  const handleViewCor = () => {
    console.log("EVENT FIRED" + corOpen);
    setCorOpen(!corOpen);
  };
  const isEditEnable = () => {
    if (props.selected.length === 1) {
      return true;
    } else {
      return false;
    }
  };
  const dd = () => {};
  return (
    <div
      className={classes.root}
      style={{ display: "flex", width: pxToRem(1860) }}
    >
      <div style={{ display: "flex", width: pxToRem(930) }}>
        <Button
          size="medium"
          className={classes.searchBtnDisabled}
          // onClick={handleGetStarted}
          style={{ marginLeft: pxToRem(30) }}
        >
          Predict
        </Button>
        <Button
          size="medium"
          className={clsx(classes.searchBtnStarted, classes.corb)}
          style={{ marginLeft: pxToRem(20), height: pxToRem(45) }}
          onClick={handleViewCor}
        >
          View Correspondence
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: pxToRem(900),
        }}
      >
        <Button
          size="medium"
          className={clsx(classes.searchBtnStarted, classes.corb)}
          onClick={handleAddDialog}
          style={{
            display: "flex",
            height: pxToRem(45),
            marginLeft: pxToRem(38),
          }}
        >
          Add
        </Button>
        <Button
          size="medium"
          className={clsx(
            isEditEnable() ? classes.searchBtnStarted : classes.btnDisabled,
            classes.corb
          )}
          classes={{ disabled: classes.btnDisabled }}
          disabled={!isEditEnable()}
          onClick={handleEdit}
          style={{
            display: "flex",
            marginLeft: pxToRem(18),
            height: pxToRem(45),
          }}
        >
          <EditOutlinedIcon tyle={{ color: "#97A1A9" }} />
          edit
        </Button>
        <Button
          size="medium"
          className={clsx(
            isDeleteEnabled() ? classes.searchBtnStarted : classes.btnDisabled,
            classes.corb
          )}
          style={{
            display: "flex",
            marginLeft: pxToRem(18),
            height: pxToRem(45),
          }}
          disabled={!isDeleteEnabled()}
          onClick={handleDelete}
        >
          delete
        </Button>
        <div
          style={{
            display: "flex",
            marginBottom: pxToRem(35),
            marginLeft: pxToRem(18),
            height: pxToRem(45),
          }}
        >
          <SearchComponent />
        </div>

        <AddModal open={addDialogOpen} setOpen={handleAddDialog} />
        {/* <AddInvoiceDialog  /> */}
        <DeleteModal open={dmOpen} handleClose={handleDelete} />
        <EditModal
          open={emOpen}
          handleClose={handleEdit}
          data={props.selectedData}
        />
        <ViewCorModal
          corrData={dd}
          open={corOpen}
          handleClose={handleViewCor}
        />
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  rows: state.invoice.invoiceDetails,
  selected: state.invoice.selected,
  selectedData: state.invoice.selectedData[0],
});
const mapDispatchToProps = (dispatch) => ({
  addInvoice: (data) => dispatch(addToInvoice(data)),
  setSelected: (data) => dispatch(addToSelected(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableHeader);
