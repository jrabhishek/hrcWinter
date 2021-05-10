import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import { connect } from "react-redux";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import { pxToRem, pxToVh, pxToVw } from "../util/theme";
import { DatePicker } from "@material-ui/pickers";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@material-ui/core/CircularProgress";

import { addToInvoice, addToSelected } from "../action";
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
    fontSize: `${pxToRem(20)}}`,
    color: "#ededed",
    paddingTop: "0px",
    paddingBottom: "0px",
    maxWidth: "160px",
    minWidth: "110px",
    paddingLeft: "10px",
    height: pxToRem(50),
  },
}))(TableCell);
const StyledTableSorted = withStyles((theme) => ({
  root: {
    backgroundColor: "#2E4350",
    color: theme.palette.common.white,
    borderBottom: "2px solid #283A46",
    fontSize: "0.9vw",
    color: "#97A1A9",
    paddingTop: "0px",
    paddingBottom: "0px",
    maxWidth: "180px",
    minWidth: "110px",
    paddingLeft: "10px",
  },
  body: {
    fontSize: `${pxToRem(20)}}`,
    color: "white",
    paddingTop: "0px",
    paddingBottom: "0px",
  },
}))(TableSortLabel);
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: "#283A46",
    },
    "&:nth-of-type(odd)": {
      backgroundColor: "#273D49CC",
      borderTop: "2px solid #283A46",
      borderBottom: "2px solid 273D49CC",
    },
    "&:hover": {
      backgroundColor: "#2A5368",
    },
    "&.Mui-selected": {
      backgroundColor: "#2A5368",
      "&:hover": {
        backgroundColor: "#2A5368",
      },
    },
  },
}))(TableRow);

function descendingComparator(a, b, orderBy) {
  console.log(orderBy);
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Customer Name",
  },
  { id: "number", numeric: false, disablePadding: false, label: "Customer #" },
  { id: "invoice", numeric: false, disablePadding: false, label: "Invoice #" },
  {
    id: "totalOpenAmount",
    numeric: true,
    disablePadding: false,
    label: "Invoice Amount",
  },
  { id: "dueInDate", numeric: false, disablePadding: false, label: "Due Date" },
  {
    id: "pd",
    numeric: false,
    disablePadding: false,
    label: "predicted payment date",
  },
  {
    id: "pb",
    numeric: false,
    disablePadding: false,
    label: "predicted aging bucket",
  },
  { id: "notes", numeric: false, disablePadding: false, label: "Notes" },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <StyledTableRow>
        <StyledTableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            className={classes.cell}
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <StyledTableSorted
              // active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </StyledTableSorted>
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: pxToRem(1860),
    height: `${pxToRem(650)}`,
    marginBottom: theme.spacing(2),
    background: "#273D49CC",
  },
  table: {
    height: pxToRem(650),
    width: pxToRem(1830),
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "scroll",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  container: {
    background: "#273D49CC",
    margin: 0,
    padding: 0,
    borderBottom: "none",
  },
  cell: {
    margin: 0,
    padding: 0,
    borderBottom: "none",
  },
}));

function InvoiceDetail(props) {
  const classes = useStyles();

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("totalOpenAmount");
  const [page, setPage] = React.useState(1);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.rows.map((n) => n.docId);
      props.setSelected(newSelecteds);
      return;
    }
    props.setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = props.selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(props.selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(props.selected.slice(1));
    } else if (selectedIndex === props.selected.length - 1) {
      newSelected = newSelected.concat(props.selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        props.selected.slice(0, selectedIndex),
        props.selected.slice(selectedIndex + 1)
      );
    }

    props.setSelected(newSelected);
  };

  const isSelected = (id) => props.selected.indexOf(id) !== -1;
  function callAddInvoice() {
    axios
      .get("http://localhost:8080/Invoicedetail", {
        params: {
          page: page,
        },
      })
      .then((resp) => {
        console.log(resp.data.invoices);
        props.addInvoice(resp.data.invoices);
        setPage(page + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  React.useEffect(() => {
    callAddInvoice();
  }, []);

  return (
    <div className={clsx(classes.root)} style={{}}>
      <Paper className={classes.paper}>
        <TableContainer
          style={{
            height: `${pxToRem(650)}`,
            overflowY: "scroll",
          }}
          id="scrollableDiv"
        >
          <InfiniteScroll
            scrollableTarget="scrollableDiv"
            dataLength={props.rows.length}
            next={callAddInvoice}
            hasMore={true}
            loader={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "50px",
                }}
              >
                LOADING.....
              </div>
            }
          >
            <Table
              stickyHeader
              className={clsx(classes.table, classes.container)}
              aria-labelledby="tableTitle"
              size="small"
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={props.selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={props.rows.length}
              />

              <TableBody>
                {stableSort(props.rows, getComparator(order, orderBy))
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.docId);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <StyledTableRow
                        className={classes.row}
                        hover
                        onClick={(event) => handleClick(event, row.docId)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.docId}
                        selected={isItemSelected}
                      >
                        <StyledTableCell
                          padding="checkbox"
                          className={classes.cell}
                        >
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </StyledTableCell>
                        <StyledTableCell
                          className={classes.cell}
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.nameCustomer}
                        </StyledTableCell>
                        <StyledTableCell
                          className={classes.cell}
                          align="center"
                        >
                          {row.custNumber}
                        </StyledTableCell>
                        <StyledTableCell className={classes.cell} align="right">
                          {row.invoiceId}
                        </StyledTableCell>
                        <StyledTableCell className={classes.cell} align="right">
                          {row.totalOpenAmount}
                        </StyledTableCell>
                        <StyledTableCell className={classes.cell} align="right">
                          {row.dueInDate}
                        </StyledTableCell>
                        <StyledTableCell
                          className={classes.cell}
                          align="center"
                        >
                          {"-"}
                        </StyledTableCell>
                        <StyledTableCell
                          className={classes.cell}
                          align="center"
                        >
                          {"-"}
                        </StyledTableCell>

                        <StyledTableCell className={classes.cell} align="left">
                          {row.notes}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </InfiniteScroll>
        </TableContainer>
      </Paper>
    </div>
  );
}
const mapStateToProps = (state) => ({
  rows: state.invoice.invoiceDetails,
  selected: state.invoice.selected,
  selectedData: state.invoice.selectedData,
});
const mapDispatchToProps = (dispatch) => ({
  addInvoice: (data) => dispatch(addToInvoice(data)),
  setSelected: (data) => dispatch(addToSelected(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDetail);
